"use client";

/**
 * EngravingReveal
 * ─────────────────────────────────────────────────────────────
 * Reveals content with a Norse rune-scan beam sweeping L→R.
 * Uses clip-path on an absolutely-positioned mask overlay —
 * the content itself is never clipped so scroll works freely.
 *
 * On section change:
 *   1. Old content fades to opacity 0 (150ms CSS transition)
 *   2. Content swaps (no re-mount flicker — single div, style swap)
 *   3. Clip-path overlay resets to cover everything
 *   4. Beam + overlay animate L→R, revealing content underneath
 *   5. Overlay removed, beam removed — static final state
 * ─────────────────────────────────────────────────────────────
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { useMotionValue, animate } from "framer-motion";

const RUNE_CHARS = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛞᛟ";

export interface EngravingRevealProps {
  sectionKey: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

// ── Rune stream inside beam ───────────────────────────────────
function RuneStream() {
  const [runes, setRunes] = useState("");
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);
  useEffect(() => {
    const tick = (ts: number) => {
      if (ts - lastRef.current > 80) {
        lastRef.current = ts;
        let s = "";
        for (let i = 0; i < 24; i++) {
          s += RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)] + " ";
        }
        setRunes(s);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return (
    <span aria-hidden="true" style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center",
      overflow: "hidden", whiteSpace: "nowrap",
      fontSize: "8px", letterSpacing: "0.12em",
      color: "rgba(200,155,50,0.65)",
      fontFamily: "monospace",
      userSelect: "none", pointerEvents: "none",
      paddingLeft: "4px",
    }}>{runes}</span>
  );
}

// ── Spark canvas ──────────────────────────────────────────────
interface Spark { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; }

function SparkCanvas({ beamX, h, active }: { beamX: number; h: number; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const idRef  = useRef(0);

  useEffect(() => {
    if (!active) { sparks.current = []; return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        sparks.current.push({
          x: beamX, y: Math.random() * h,
          vx: (Math.random() - 0.3) * 2,
          vy: (Math.random() - 0.5) * 2.5,
          life: 0, maxLife: 20 + Math.floor(Math.random() * 20),
          size: 0.8 + Math.random() * 1.4,
        });
        idRef.current++;
      }
      sparks.current = sparks.current.filter(s => s.life < s.maxLife);
      for (const s of sparks.current) {
        s.x += s.vx; s.y += s.vy; s.vy += 0.04; s.life++;
        const a = (1 - s.life / s.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,155,45,${a})`;
        ctx.shadowColor = `rgba(210,155,45,${a * 0.5})`;
        ctx.shadowBlur = 3;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ctx.clearRect(0, 0, canvas.width, canvas.height); };
  }, [active, beamX, h]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{
    position: "absolute", inset: 0, width: "100%", height: "100%",
    pointerEvents: "none", zIndex: 32,
  }} />;
}

// ── Main ──────────────────────────────────────────────────────
export default function EngravingReveal({
  sectionKey,
  children,
  className = "",
  innerClassName = "",
}: EngravingRevealProps) {
  // The content div — single stable DOM node, never re-mounted
  const contentRef = useRef<HTMLDivElement>(null);
  // Outer wrapper — beam overlays anchor here
  const outerRef   = useRef<HTMLDivElement>(null);

  // Current rendered children
  const [displayed, setDisplayed] = useState(children);

  const progress  = useMotionValue(0);
  const [scanning, setScanning]  = useState(false);
  const [beamX,    setBeamX]     = useState(0);
  const [panelH,   setPanelH]    = useState(0);
  const [clipX,    setClipX]     = useState(0); // px covered so far
  const [everScanned, setEverScanned] = useState(false);

  const animRef  = useRef<{ stop: () => void } | null>(null);
  const prevKey  = useRef(sectionKey);

  const runScan = useCallback((newChildren: React.ReactNode, skipSwap = false) => {
    const outer = outerRef.current;
    if (!outer) {
      if (!skipSwap) setDisplayed(newChildren);
      return;
    }

    animRef.current?.stop();

    const h = outer.offsetHeight;
    const w = outer.offsetWidth;
    setPanelH(h);

    // Step 1 — ensure content is hidden before we start
    if (contentRef.current) {
      contentRef.current.style.transition = skipSwap ? "none" : "opacity 0.15s ease";
      contentRef.current.style.opacity    = "0";
    }

    const doScan = (w: number, h: number) => {
      setClipX(0);
      setBeamX(0);
      progress.set(0);
      setScanning(true);

      if (contentRef.current) {
        contentRef.current.style.transition = "none";
        contentRef.current.style.opacity    = "1";
      }

      const ctrl = animate(progress, 1, {
        duration: 0.85,
        ease: [0.2, 0.05, 0.3, 1.0],
        onUpdate: (v) => {
          const x = v * w;
          setBeamX(x);
          setClipX(x);
        },
        onComplete: () => {
          setScanning(false);
          setEverScanned(true);
        },
      });
      animRef.current = ctrl;
    };

    if (skipSwap) {
      // Initial mount — no content swap, just scan immediately
      doScan(w, h);
    } else {
      // Reset everScanned so the full cover shows during content swap
      setEverScanned(false);
      setTimeout(() => {
        setDisplayed(newChildren);
        setPanelH(outer.offsetHeight);
        doScan(outer.offsetWidth, outer.offsetHeight);
      }, 160);
    }
  }, [progress]);

  useEffect(() => {
    if (sectionKey !== prevKey.current) {
      prevKey.current = sectionKey;
      runScan(children);
    }
  }, [sectionKey, children, runScan]);

  // On mount — run the scan once to engrave initial content
  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
    }
    // Short delay so the DOM is fully laid out before we measure
    const t = setTimeout(() => {
      runScan(children, true);
    }, 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={outerRef} className={`relative ${className}`} style={{ overflow: "visible" }}>

      {/* ── Beam overlays (above everything, pointer-events none) ── */}
      {scanning && (
        <>
          <SparkCanvas beamX={beamX} h={panelH} active />
          {/* Beam line */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 0, height: `${panelH}px`, left: `${beamX}px`,
            width: "3px", zIndex: 31, pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent, rgba(215,170,55,0.4) 10%, rgba(215,170,55,0.95) 40%, rgba(240,195,70,1) 50%, rgba(215,170,55,0.95) 60%, rgba(215,170,55,0.4) 90%, transparent)",
            boxShadow: "0 0 10px 3px rgba(175,125,35,0.5), 0 0 22px 6px rgba(155,105,25,0.22), 0 0 2px 1px rgba(240,195,70,0.9)",
          }}>
            <RuneStream />
          </div>
          {/* Trailing amber wash */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 0, height: `${panelH}px`,
            left: Math.max(0, beamX - 48), width: "48px",
            zIndex: 30, pointerEvents: "none",
            background: "linear-gradient(to right, transparent, rgba(155,105,25,0.07))",
          }} />
        </>
      )}

      {/* ── Clip mask overlay ──
           Before first scan: covers everything (hides panel until beam)
           During scan: right portion still covered
           After scan: gone entirely
      ── */}
      {!everScanned && !scanning && (
        // Pre-scan full cover — hides panel before beam starts
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "rgba(8,6,4,0.97)",
          zIndex: 28, pointerEvents: "none",
        }} />
      )}
      {scanning && (
        // During scan: right portion still black
        <div aria-hidden="true" style={{
          position: "absolute",
          top: 0, left: `${clipX}px`,
          right: 0, height: `${panelH}px`,
          background: "rgba(8,6,4,0.97)",
          zIndex: 28, pointerEvents: "none",
        }} />
      )}

      {/* ── Content — single stable node, never unmounted ── */}
      <div
        ref={contentRef}
        className={`w-full h-full ${innerClassName}`}
        style={{ opacity: 1 }}
      >
        {displayed}
      </div>
    </div>
  );
}
