"use client";

import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import CodexArtifact from "./CodexArtifact";
import type { CinematicPhase } from "@/app/lib/codexTiming";
import { CODEX_DURATION, phaseFromProgress } from "@/app/lib/codexTiming";

export interface CodexCinematicProps {
  phase: CinematicPhase;
  sectionKey: string;
  codexLabel: string;
  codexTitle: string;
  runeSymbol: string;
  runes: readonly string[];
  onPhaseChange: (phase: CinematicPhase) => void;
  onCommitContent: () => void;
  onCloseRequest: () => void;
  onClosed: () => void;
  children: React.ReactNode;
}

const EASE_SUMMON = [0.2, 0.02, 0.18, 1] as const;
const EASE_RETURN = [0.55, 0, 0.85, 0.35] as const;

export default function CodexCinematic({
  phase,
  sectionKey,
  codexLabel,
  codexTitle,
  runeSymbol,
  runes,
  onPhaseChange,
  onCommitContent,
  onCloseRequest,
  onClosed,
  children,
}: CodexCinematicProps) {
  const progress = useMotionValue(0);
  const directionRef = useRef<"open" | "close">("open");
  const committedRef = useRef(false);
  const lastPhaseRef = useRef<CinematicPhase>("IDLE");
  const openStartedRef = useRef(false);
  const closeStartedRef = useRef(false);
  const activeAnimationRef = useRef<{ stop: () => void } | null>(null);
  const interactionEnabled = phase === "READY";

  const backdropOpacity = useTransform(progress, [0, 0.4, 0.65, 1], [0, 0, 0.18, 0.28]);
  const beamOpacity = useTransform(progress, [0, 0.1, 0.15, 0.95, 1], [0, 0, 1, 1, 0]);
  const beamLeft = useTransform(progress, (value) => {
    if (value < 0.4) return `${28 + (value / 0.4) * 16}%`;
    const reveal = Math.max(0, Math.min(1, (value - 0.45) / 0.55));
    return `calc(50% - min(500px, 42.5vw) + ${reveal * 85}vw)`;
  });
  const beamLength = useTransform(progress, (value) => {
    if (value < 0.45) return `${Math.max(0, value - 0.15) * 180}vw`;
    const reveal = Math.max(0, Math.min(1, (value - 0.45) / 0.55));
    return `${reveal * 85}vw`;
  });
  const beamRight = useMotionTemplate`calc(100% - ${beamLeft})`;
  const runePulse = useTransform(progress, [0.05, 0.1, 0.15], [0, 1, 0]);

  useMotionValueEvent(progress, "change", (value) => {
    const nextPhase = phaseFromProgress(value, directionRef.current);
    if (nextPhase !== lastPhaseRef.current) {
      lastPhaseRef.current = nextPhase;
      onPhaseChange(nextPhase);
    }

    if (!committedRef.current && value >= 0.45) {
      committedRef.current = true;
      onCommitContent();
    }
  });

  useEffect(() => {
    if (openStartedRef.current) return;

    openStartedRef.current = true;
    directionRef.current = "open";
    committedRef.current = false;
    lastPhaseRef.current = "IDLE";

    const controls = animate(progress, 1, {
      duration: CODEX_DURATION / 1000,
      ease: EASE_SUMMON,
      onComplete: () => {
        lastPhaseRef.current = "READY";
        onPhaseChange("READY");
      },
    });
    activeAnimationRef.current = controls;
  }, [onPhaseChange, progress]);

  useEffect(() => {
    if (phase !== "ERASE" || closeStartedRef.current) return;

    closeStartedRef.current = true;
    directionRef.current = "close";

    const controls = animate(progress, 0, {
      duration: CODEX_DURATION / 1000,
      ease: EASE_RETURN,
      onComplete: onClosed,
    });
    activeAnimationRef.current = controls;
  }, [onClosed, phase, progress]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && interactionEnabled) onCloseRequest();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [interactionEnabled, onCloseRequest]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: 50,
          background: "black",
          opacity: backdropOpacity,
          pointerEvents: interactionEnabled ? "auto" : "none",
        }}
        onClick={interactionEnabled ? onCloseRequest : undefined}
      />

      <motion.div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 52 }}
      >
        <motion.div
          className="absolute top-1/2 h-px origin-right"
          style={{
            right: beamRight,
            width: beamLength,
            opacity: beamOpacity,
            background:
              "linear-gradient(90deg, transparent, rgba(72,202,228,0.45), rgba(165,243,252,0.9), rgba(230,185,70,0.95))",
            boxShadow:
              "0 0 10px rgba(72,202,228,0.7), 0 0 24px rgba(72,202,228,0.38), 0 0 38px rgba(176,141,87,0.2)",
          }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[min(800px,85vh)]"
          style={{
            left: beamLeft,
            opacity: beamOpacity,
            background:
              "linear-gradient(to bottom, transparent, rgba(72,202,228,0.5) 12%, rgba(240,195,70,1) 50%, rgba(72,202,228,0.5) 88%, transparent)",
            boxShadow:
              "0 0 12px 4px rgba(72,202,228,0.55), 0 0 28px 8px rgba(176,141,87,0.26), 0 0 2px 1px rgba(240,195,70,0.9)",
          }}
        >
          <span className="codex-rune-stream">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛋ</span>
        </motion.div>

        <motion.div
          className="absolute left-[28%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            opacity: runePulse,
            background: "radial-gradient(circle, rgba(165,243,252,0.5), rgba(72,202,228,0.16) 42%, transparent 70%)",
            boxShadow: "0 0 24px rgba(72,202,228,0.6)",
          }}
        />
      </motion.div>

      <CodexArtifact
        progress={progress}
        interactionEnabled={interactionEnabled}
        onClose={onCloseRequest}
        sectionKey={sectionKey}
        codexLabel={codexLabel}
        codexTitle={codexTitle}
        runeSymbol={runeSymbol}
        runes={runes}
      >
        {children}
      </CodexArtifact>
    </>
  );
}
