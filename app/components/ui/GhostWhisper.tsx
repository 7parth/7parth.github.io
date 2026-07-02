"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import s from "./GhostWhisper.module.css";

// ── Rune alphabet for decorative side columns ──
const LEFT_RUNES = ["ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ"];
const RIGHT_RUNES = ["ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ"];

// ── Stanza content matching the specification ──
const STANZAS = [
  "Knowledge is not collected.\nIt is forged.",

  "Every project.\nEvery competition.\nEvery lesson.\nA relic preserved.",

  "These chronicles contain\nmore than achievements.\nThey record the journey.",

  "May the reader find\nsomething worth carrying\ninto their own battles.",
];

// ── Timing constants (ms) ──
const REVEAL_START = 600;        // After loading, when container fades in
const HEADING_DELAY = 800;       // Heading engraves after container fade
const STANZA_BASE_DELAY = 1600;  // First stanza starts engraving
const STANZA_INTERVAL = 600;     // Spacing between stanzas
const SIGNATURE_EXTRA = 400;     // Extra delay after last stanza
const IDLE_DELAY = 5500;         // When idle breathing kicks in

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  dur: number;
  delay: number;
  hue: string;
}

export default function GhostWhisper() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [idle, setIdle] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // ── Reveal sequence & particle generation on client ──
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), REVEAL_START);
    const t2 = setTimeout(() => setIdle(true), IDLE_DELAY);

    // Generate stable particle coordinates on client to prevent hydration mismatch
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${8 + Math.random() * 84}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 1.5 + Math.random() * 2.5,
      dur: 7 + Math.random() * 7,
      delay: Math.random() * 6,
      hue: Math.random() > 0.7 ? "rgba(165,243,252,0.6)" : "rgba(200,220,235,0.5)",
    }));
    setParticles(generated);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Mouse parallax (3-5px shift, RAF-driven, no re-renders) ──
  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx * 4;  // max ±4px
      targetY = ny * 3;  // max ±3px
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      if (ghostRef.current) {
        ghostRef.current.style.transform =
          `translateY(-50%) translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Compute animation delays for stanzas ──
  const stanzaDelay = (i: number) =>
    STANZA_BASE_DELAY + i * STANZA_INTERVAL;
  const signatureDelay =
    STANZA_BASE_DELAY + STANZAS.length * STANZA_INTERVAL + SIGNATURE_EXTRA;

  return (
    <div
      ref={ghostRef}
      className={`${s.ghost} ${revealed ? s.fadeIn : ""} ${idle ? s.idleBreathe : ""}`}
      aria-hidden="true"
    >
      {/* ── Localized particles ── */}
      <div className={s.particleField}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={`${s.mote} ${s.moteFloat}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.hue,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 4px ${p.hue}`,
            }}
          />
        ))}
      </div>

      {/* ── Left rune column ── */}
      <div className={`${s.sideRunes} ${s.sideRunesLeft} ${s.runeDrift}`}>
        {LEFT_RUNES.map((r, i) => <span key={i}>{r}</span>)}
      </div>

      {/* ── Right rune column ── */}
      <div className={`${s.sideRunes} ${s.sideRunesRight} ${s.runeDriftAlt}`}>
        {RIGHT_RUNES.map((r, i) => <span key={i}>{r}</span>)}
      </div>

      {/* ── Heading ── */}
      <div
        className={`${s.engrave} ${revealed ? s.engraveReveal : ""}`}
        style={{ animationDelay: `${HEADING_DELAY}ms` }}
      >
        <h2 className={s.heading}>The Chronicles</h2>
      </div>

      {/* ── Decorative divider ── */}
      <div
        className={`${s.headingDivider} ${s.engrave} ${revealed ? s.engraveReveal : ""}`}
        style={{ animationDelay: `${HEADING_DELAY + 300}ms` }}
      >
        <span className={s.headingRune}>ᛟ</span>
      </div>

      {/* ── Body stanzas ── */}
      {STANZAS.map((text, i) => (
        <div
          key={i}
          className={`${s.stanza} ${s.engrave} ${revealed ? s.engraveReveal : ""}`}
          style={{ animationDelay: `${stanzaDelay(i)}ms` }}
        >
          <span className={s.stanzaRune}>ᚱ</span>
          <p className={s.stanzaText}>
            {text.split("\n").map((line, li) => (
              <span key={li}>
                {line}
                {li < text.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      ))}

      {/* ── Signature divider ── */}
      <div
        className={`${s.signatureDivider} ${s.engrave} ${revealed ? s.engraveReveal : ""}`}
        style={{ animationDelay: `${signatureDelay - 200}ms` }}
      >
        <span className={s.signatureRune}>ᛟ</span>
      </div>

      {/* ── Signature ── */}
      <div
        className={`${s.engrave} ${revealed ? s.engraveReveal : ""}`}
        style={{ animationDelay: `${signatureDelay}ms` }}
      >
        <p className={s.signature}>— Parth</p>
      </div>
    </div>
  );
}
