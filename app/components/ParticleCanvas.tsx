"use client";
import { useEffect, useRef } from "react";

export interface ParticleCanvasProps {
  worldMode?: string;
}

export default function ParticleCanvas({ worldMode = "" }: ParticleCanvasProps) {
  const bgRef  = useRef<HTMLCanvasElement>(null); // z-5  — deep background
  const midRef = useRef<HTMLCanvasElement>(null); // z-15 — mid layer
  const fgRef  = useRef<HTMLCanvasElement>(null); // z-25 — foreground
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const worldRef = useRef(worldMode);

  // Keep worldRef in sync without re-running the heavy effect
  useEffect(() => { worldRef.current = worldMode; }, [worldMode]);

  useEffect(() => {
    const bgCanvas  = bgRef.current;
    const midCanvas = midRef.current;
    const fgCanvas  = fgRef.current;
    if (!bgCanvas || !midCanvas || !fgCanvas) return;

    const bgCtx  = bgCanvas.getContext("2d");
    const midCtx = midCanvas.getContext("2d");
    const fgCtx  = fgCanvas.getContext("2d");
    if (!bgCtx || !midCtx || !fgCtx) return;

    let W = 0, H = 0, animId: number;

    function resize() {
      W = bgCanvas!.width  = midCanvas!.width  = fgCanvas!.width  = window.innerWidth;
      H = bgCanvas!.height = midCanvas!.height = fgCanvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / W, y: e.clientY / H };
    };
    window.addEventListener("mousemove", onMove);

    type PType = "ash" | "ember" | "snow" | "fog" | "dust" | "ice";

    interface P {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number; maxOp: number;
      type: PType;
      layerZ: number; // 0 = deep bg, 1 = foreground
      life: number; maxLife: number;
      wobble: number; wobbleSpeed: number;
    }

    function getTypeWeights(): Record<PType, number> {
      const mode = worldRef.current;
      if (mode === "world-lightning") return { ash: 0.50, ember: 0.08, snow: 0.18, fog: 0.12, dust: 0.06, ice: 0.06 };
      if (mode === "world-cold")      return { ash: 0.15, ember: 0.02, snow: 0.38, fog: 0.15, dust: 0.05, ice: 0.25 };
      if (mode === "world-gold")      return { ash: 0.15, ember: 0.35, snow: 0.08, fog: 0.15, dust: 0.22, ice: 0.05 };
      if (mode === "world-dust")      return { ash: 0.20, ember: 0.10, snow: 0.10, fog: 0.20, dust: 0.35, ice: 0.05 };
      if (mode === "world-rune")      return { ash: 0.30, ember: 0.08, snow: 0.20, fog: 0.12, dust: 0.08, ice: 0.22 };
      // default balanced mix
      return                                 { ash: 0.35, ember: 0.12, snow: 0.20, fog: 0.15, dust: 0.10, ice: 0.08 };
    }

    function pickType(): PType {
      const w = getTypeWeights();
      const r = Math.random();
      let acc = 0;
      for (const [type, weight] of Object.entries(w) as [PType, number][]) {
        acc += weight;
        if (r < acc) return type;
      }
      return "ash";
    }

    function mkParticle(scatter = false): P {
      const type = pickType();
      const layerZ = Math.random();
      const maxLife = 200 + Math.random() * 350;

      const p: P = {
        x: Math.random() * W,
        y: scatter ? Math.random() * H : H + 10,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -(0.12 + Math.random() * 0.50) * (0.35 + layerZ * 0.65),
        size: 0, opacity: 0, maxOp: 0,
        type, layerZ,
        life: scatter ? Math.random() * maxLife : 0,
        maxLife,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.007 + Math.random() * 0.010,
      };

      switch (type) {
        case "ash":   p.size = 0.6 + Math.random() * 1.2;  p.maxOp = 0.12 + Math.random() * 0.22; break;
        case "ember": p.size = 0.8 + Math.random() * 1.0;  p.maxOp = 0.22 + Math.random() * 0.32; break;
        case "snow":  p.size = 0.5 + Math.random() * 1.6;  p.maxOp = 0.14 + Math.random() * 0.28; break;
        case "fog":   p.size = 20  + Math.random() * 45;   p.maxOp = 0.025 + Math.random() * 0.05; p.vy *= 0.22; break;
        case "dust":  p.size = 0.4 + Math.random() * 0.8;  p.maxOp = 0.08 + Math.random() * 0.16; break;
        case "ice":   p.size = 0.4 + Math.random() * 0.9;  p.maxOp = 0.18 + Math.random() * 0.28; break;
      }
      return p;
    }

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 150;
    const pool: P[] = Array.from({ length: COUNT }, () => mkParticle(true));

    function colorOf(p: P, op: number): string {
      switch (p.type) {
        case "ember": return `rgba(205,118,38,${op})`;
        case "snow":  return `rgba(195,232,255,${op})`;
        case "fog":   return `rgba(75,138,198,${op * 0.55})`;
        case "dust":  return `rgba(175,160,135,${op})`;
        case "ice":   return `rgba(140,235,255,${op})`;
        default:      return `rgba(165,243,252,${op})`; // ash — icy-cyan
      }
    }

    function ctxForLayer(layerZ: number): CanvasRenderingContext2D {
      if (layerZ < 0.33) return bgCtx!;
      if (layerZ < 0.66) return midCtx!;
      return fgCtx!;
    }

    function drawParticle(ctx: CanvasRenderingContext2D, p: P) {
      const t    = p.life / p.maxLife;
      const fade = t < 0.15 ? t / 0.15 : t > 0.80 ? (1 - t) / 0.20 : 1;
      p.opacity  = p.maxOp * fade;

      // Mouse-proximity ambient brightening
      const dx   = (p.x / W) - mouseRef.current.x;
      const dy   = (p.y / H) - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = Math.max(0, 1 - dist / 0.25) * 0.15;
      const op   = Math.min(1, p.opacity + boost);

      if (p.type === "fog") {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, colorOf(p, op));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = colorOf(p, op);
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    function updateParticle(p: P) {
      p.life++;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.16;
      p.y += p.vy;
      if (p.life >= p.maxLife || p.y < -p.size * 2 || p.x < -10 || p.x > W + 10) {
        Object.assign(p, mkParticle(false));
      }
    }

    function animate() {
      bgCtx!.clearRect(0, 0, W, H);
      midCtx!.clearRect(0, 0, W, H);
      fgCtx!.clearRect(0, 0, W, H);
      for (const p of pool) {
        updateParticle(p);
        drawParticle(ctxForLayer(p.layerZ), p);
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const canvasStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };

  return (
    <>
      <canvas ref={bgRef}  style={{ ...canvasStyle, zIndex: 5  }} aria-hidden="true" />
      <canvas ref={midRef} style={{ ...canvasStyle, zIndex: 15 }} aria-hidden="true" />
      <canvas ref={fgRef}  style={{ ...canvasStyle, zIndex: 25 }} aria-hidden="true" />
    </>
  );
}
