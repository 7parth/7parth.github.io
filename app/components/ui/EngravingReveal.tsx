"use client";

/**
 * EngravingReveal
 * ─────────────────────────────────────────────────────────────
 * Wraps the ENTIRE Codex (header + body) in a single Norse rune
 * scan reveal. The content is rendered fully, then a mask
 * sweeps left→right to reveal it — exactly like an LLM
 * streaming a page into existence.
 *
 * Nothing inside animates individually.
 * The ONLY animation is the reveal mask + the beam overlay.
 *
 * Technique: CSS mask-image with a gradient that transitions
 * from fully-hidden (black=hidden in mask) to fully-revealed.
 * The mask position is driven by a CSS custom property updated
 * via Framer Motion's useMotionValue + useEffect.
 * This is 100% GPU-composited — no layout reflow.
 *
 * Timing:
 *   0ms    old content opacity→0      (150ms)
 *   150ms  beam appears               (100ms flash)
 *   250ms  beam traversal L→R         (700–900ms)
 *   ~1100ms particles settle          (300ms)
 *   ~1200ms beam glow fades           (400ms)
 *   Total  ~1.5s
 * ─────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";

// Norse rune glyphs for the beam decoration
const RUNE_CHARS = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛞᛟ";

interface EngravingRevealProps {
  sectionKey: string;
  children: React.ReactNode;
  className?: string;
}

// ── Animated rune stream inside the beam ──────────────────────
function RuneStream() {
  const [runes, setRunes] = useState("");
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    function tick(ts: number) {
      if (ts - lastRef.current > 60) {
        lastRef.current = ts;
        let s = "";
        for (let i = 0; i < 32; i++) {
          s += RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)];
          s += " ";
        }
        setRunes(s);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "9px",
        letterSpacing: "0.15em",
        color: "rgba(200, 160, 60, 0.7)",
        fontFamily: "monospace",
        userSelect: "none",
        pointerEvents: "none",
        paddingLeft: "4px",
      }}
    >
      {runes}
    </span>
  );
}

// ── Spark particle emitted from beam leading edge ─────────────
interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

function SparkCanvas({
  beamX,
  containerHeight,
  active,
}: {
  beamX: number;
  containerHeight: number;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) {
      sparksRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function emit() {
      // emit 2-4 sparks per frame at the beam leading edge
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        sparksRef.current.push({
          id: idRef.current++,
          x: beamX,
          y: Math.random() * containerHeight,
          vx: (Math.random() - 0.3) * 1.8,
          vy: (Math.random() - 0.5) * 2.5,
          life: 0,
          maxLife: 18 + Math.floor(Math.random() * 22),
          size: 1 + Math.random() * 1.5,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      emit();

      sparksRef.current = sparksRef.current.filter((s) => s.life < s.maxLife);
      for (const s of sparksRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.life++;
        const alpha = (1 - s.life / s.maxLife) * 0.85;
        // amber/gold sparks — ancient, not electric
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 160, 50, ${alpha})`;
        ctx.shadowColor = `rgba(210, 160, 50, ${alpha * 0.6})`;
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, beamX, containerHeight]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 30,
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────
export default function EngravingReveal({
  sectionKey,
  children,
  className = "",
}: EngravingRevealProps) {
  // We keep a display key — switches when sectionKey changes
  const [displayKey, setDisplayKey] = useState(sectionKey);
  const [pendingChildren, setPendingChildren] = useState(children);

  // Reveal progress: 0 = fully masked, 1 = fully revealed
  const progress = useMotionValue(0);

  // Beam state
  const [phase, setPhase] = useState<"idle" | "exit" | "scanning" | "done">("done");
  const [beamX, setBeamX] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const [containerH, setContainerH] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animCtrlRef = useRef<{ stop: () => void } | null>(null);

  // Track previous key to detect changes
  const prevKeyRef = useRef(sectionKey);

  const runScan = useCallback(
    (newChildren: React.ReactNode, newKey: string) => {
      const el = containerRef.current;
      if (!el) {
        setPendingChildren(newChildren);
        setDisplayKey(newKey);
        progress.set(1);
        setPhase("done");
        return;
      }

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setContainerW(w);
      setContainerH(h);

      // Stop any running animation
      animCtrlRef.current?.stop();
      progress.set(0);

      // Phase 1: exit old content (opacity handled by AnimatePresence below)
      setPhase("exit");

      setTimeout(() => {
        // Swap content
        setPendingChildren(newChildren);
        setDisplayKey(newKey);
        progress.set(0);
        setPhase("scanning");

        // Animate progress 0→1 over 800ms with slight ease
        const ctrl = animate(progress, 1, {
          duration: 0.8,
          ease: [0.25, 0.1, 0.35, 1.0],
          onUpdate: (v) => {
            setBeamX(v * w);
          },
          onComplete: () => {
            setPhase("done");
          },
        });
        animCtrlRef.current = ctrl;
      }, 200); // wait for exit fade
    },
    [progress]
  );

  useEffect(() => {
    if (sectionKey !== prevKeyRef.current) {
      prevKeyRef.current = sectionKey;
      runScan(children, sectionKey);
    }
  }, [sectionKey, children, runScan]);

  // Initial mount — instant reveal
  useEffect(() => {
    progress.set(1);
    setPhase("done");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CSS mask: reveals left portion, hides right portion
  // mask-image: linear-gradient → black (visible) on left, transparent on right
  // We use a 4px soft edge at the reveal boundary
  const maskStyle =
    phase === "scanning"
      ? {
          WebkitMaskImage: `linear-gradient(to right, black ${beamX - 2}px, transparent ${beamX + 4}px)`,
          maskImage: `linear-gradient(to right, black ${beamX - 2}px, transparent ${beamX + 4}px)`,
        }
      : phase === "exit"
      ? { opacity: 0 }
      : {};

  const isScanning = phase === "scanning";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ── Revealed content (masked) ── */}
      <div
        style={{
          ...maskStyle,
          transition: phase === "exit" ? "opacity 0.18s ease" : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayKey}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {pendingChildren}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Beam overlay (only during scan) ── */}
      {isScanning && (
        <>
          {/* Spark canvas — full container */}
          <SparkCanvas
            beamX={beamX}
            containerHeight={containerH}
            active={isScanning}
          />

          {/* Beam line + glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${beamX}px`,
              width: "3px",
              zIndex: 25,
              pointerEvents: "none",
              // Outer glow
              boxShadow: [
                `0 0 12px 4px rgba(180, 130, 40, 0.55)`,
                `0 0 28px 8px rgba(160, 110, 30, 0.25)`,
                `0 0 2px 1px rgba(220, 180, 80, 0.9)`,
              ].join(", "),
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(220,180,60,0.4) 10%, rgba(220,180,60,0.95) 40%, rgba(240,200,80,1) 50%, rgba(220,180,60,0.95) 60%, rgba(220,180,60,0.4) 90%, transparent 100%)",
            }}
          >
            {/* Rune stream inside beam */}
            <RuneStream />
          </div>

          {/* Left-side soft glow trail */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: Math.max(0, beamX - 40),
              width: "40px",
              zIndex: 24,
              pointerEvents: "none",
              background:
                "linear-gradient(to right, transparent, rgba(160, 110, 30, 0.08))",
            }}
          />
        </>
      )}
    </div>
  );
}
