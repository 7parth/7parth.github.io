  "use client";

import { useEffect, useRef } from "react";

// Layer depths — particles with layerZ < 0.5 render BEHIND relics (z-index 5),
// those with layerZ >= 0.5 render in front (z-index 25). We use two canvases.
export default function ParticleCanvas() {
  const bgRef  = useRef<HTMLCanvasElement>(null); // behind relics   z-5
  const fgRef  = useRef<HTMLCanvasElement>(null); // in front        z-25
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const bgCanvas = bgRef.current;
    const fgCanvas = fgRef.current;
    if (!bgCanvas || !fgCanvas) return;

    const bgCtx = bgCanvas.getContext("2d");
    const fgCtx = fgCanvas.getContext("2d");
    if (!bgCtx || !fgCtx) return;

    let W = 0, H = 0, animId: number;

    function resize() {
      W = bgCanvas!.width  = fgCanvas!.width  = window.innerWidth;
      H = bgCanvas!.height = fgCanvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / W, y: e.clientY / H };
    };
    window.addEventListener("mousemove", onMove);

    /* ── Particle types ── */
    type PType = "ash" | "ember" | "snow" | "fog" | "dust";

    interface P {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      maxOp: number;
      type: PType;
      layerZ: number;   // 0 = deep bg, 1 = foreground
      life: number; maxLife: number;
      wobble: number; wobbleSpeed: number;
    }

    function mkParticle(scatter = false): P {
      const r = Math.random();
      let type: PType;
      if      (r < 0.35) type = "ash";
      else if (r < 0.50) type = "snow";
      else if (r < 0.65) type = "fog";
      else if (r < 0.78) type = "dust";
      else               type = "ember";

      const layerZ = Math.random();
      const maxLife = 180 + Math.random() * 320;

      const p: P = {
        x: Math.random() * W,
        y: scatter ? Math.random() * H : H + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.15 + Math.random() * 0.55) * (0.4 + layerZ * 0.6),
        size: 0, opacity: 0, maxOp: 0,
        type, layerZ,
        life: scatter ? Math.random() * maxLife : 0,
        maxLife,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.012,
      };

      switch (type) {
        case "ash":   p.size = 0.6 + Math.random() * 1.2;  p.maxOp = 0.12 + Math.random() * 0.25; break;
        case "ember": p.size = 0.8 + Math.random() * 1.0;  p.maxOp = 0.25 + Math.random() * 0.35; break;
        case "snow":  p.size = 0.5 + Math.random() * 1.5;  p.maxOp = 0.15 + Math.random() * 0.30; break;
        case "fog":   p.size = 18  + Math.random() * 40;   p.maxOp = 0.03 + Math.random() * 0.06; p.vy *= 0.25; break;
        case "dust":  p.size = 0.4 + Math.random() * 0.8;  p.maxOp = 0.08 + Math.random() * 0.18; break;
      }
      return p;
    }

    const COUNT = 280;
    const pool: P[] = Array.from({ length: COUNT }, () => mkParticle(true));

    function colorOf(p: P, op: number): string {
      switch (p.type) {
        case "ember": return `rgba(200,120,40,${op})`;
        case "snow":  return `rgba(200,235,255,${op})`;
        case "fog":   return `rgba(80,140,200,${op * 0.6})`;
        case "dust":  return `rgba(180,165,140,${op})`;
        default:      return `rgba(165,243,252,${op})`;  // ash / icy-cyan
      }
    }

    function drawParticle(ctx: CanvasRenderingContext2D, p: P) {
      const t = p.life / p.maxLife;
      const fade = t < 0.15 ? t / 0.15 : t > 0.80 ? (1 - t) / 0.20 : 1;
      p.opacity = p.maxOp * fade;

      // Mouse-proximity ambient brightening
      const dx = (p.x / W) - mouseRef.current.x;
      const dy = (p.y / H) - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = Math.max(0, 1 - dist / 0.25) * 0.15;
      const op = Math.min(1, p.opacity + boost);

      ctx.fillStyle = colorOf(p, op);

      if (p.type === "fog") {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, colorOf(p, op));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function updateParticle(p: P) {
      p.life++;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.18;
      p.y += p.vy;
      if (p.life >= p.maxLife || p.y < -p.size * 2 || p.x < -10 || p.x > W + 10) {
        Object.assign(p, mkParticle(false));
      }
    }

    function animate() {
      bgCtx!.clearRect(0, 0, W, H);
      fgCtx!.clearRect(0, 0, W, H);

      for (const p of pool) {
        updateParticle(p);
        const ctx = p.layerZ < 0.5 ? bgCtx! : fgCtx!;
        drawParticle(ctx, p);
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

  return (
    <>
      {/* Behind relics */}
      <canvas ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5  }} aria-hidden="true" />
      {/* In front of relics */}
      <canvas ref={fgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 25 }} aria-hidden="true" />
    </>
  );
}
