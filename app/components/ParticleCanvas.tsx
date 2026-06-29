"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x = 0;
      y = 0;
      size = 0;
      speedX = 0;
      speedY = 0;
      opacity = 0;
      color = "";

      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        this.x = Math.random() * width;
        this.y = scatter ? Math.random() * height : height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = Math.random() * 0.9 + 0.4;
        this.opacity = Math.random() * 0.45 + 0.08;
        this.color =
          Math.random() > 0.88
            ? `rgba(176, 141, 87, ${this.opacity})`   // gold ember
            : `rgba(165, 243, 252, ${this.opacity})`; // icy-cyan ash
      }

      update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > width) {
          this.reset();
        }
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 160; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
    />
  );
}
