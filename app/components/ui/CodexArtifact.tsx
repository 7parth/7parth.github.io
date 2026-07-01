"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CodexContent, { CodexContentProps } from "./CodexContent";
import FrameLayer from "../codex/FrameLayer";
import StoneLayer from "../codex/StoneLayer";
import WatermarkLayer from "../codex/WatermarkLayer";
import FrostLayer from "../codex/FrostLayer";

export interface CodexArtifactProps extends CodexContentProps {
  progress: MotionValue<number>;
  revealProgress: MotionValue<number>;
  interactionEnabled: boolean;
  onClose: () => void;
}

export default function CodexArtifact({
  progress,
  revealProgress,
  interactionEnabled,
  onClose,
  ...contentProps
}: CodexArtifactProps) {
  const artifactClip = useTransform(revealProgress, (value) => `inset(0 ${100 - value * 100}% 0 0)`);
  const artifactScale = useTransform(revealProgress, [0, 0.14, 1], [0.975, 1.006, 1]);
  const artifactFilter = useTransform(revealProgress, [0, 0.28, 1], ["blur(5px)", "blur(1px)", "blur(0px)"]);
  const runeIgnition = useTransform(revealProgress, [0, 0.05, 0.6, 1], [0, 1, 0.15, 0]);

  return (
    <motion.div
      className="codex-artifact-wrap fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 51 }}
      aria-hidden={progress.get() < 0.45}
    >
      <motion.div
        className="relative"
        style={{
          width: "min(100vw - 2rem, 1200px)",
          maxWidth: "calc((100vh - 2rem) * 1.5)",
          aspectRatio: "1536 / 1024",
          clipPath: artifactClip,
          scale: artifactScale,
          filter: artifactFilter,
          willChange: "clip-path, transform, filter",
          pointerEvents: interactionEnabled ? "auto" : "none",
        }}
      >
        {/* ISSUE 1 & 2: Stone, frost, and watermark are all inset to match the
            frame's inner transparent window. The iron borders of frame.png
            naturally mask the stone edges — everything reads as one slab.
            No separate inner tablet. No rounded container. */}
        <StoneLayer />
        <WatermarkLayer />
        <FrostLayer />

        {/* Rune ignition — instantaneous blinding flash to mask frame load */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            zIndex: 10,
            top: '14%', bottom: '14%', left: '13%', right: '13%',
            opacity: runeIgnition,
            background:
              "radial-gradient(circle at 22% 16%, rgba(72,202,228,0.45), transparent 35%), radial-gradient(circle at 78% 84%, rgba(176,141,87,0.35), transparent 40%)",
          }}
        />

        {/* ISSUE 1 & 3: Frame sits at z-30, above stone.
            Its opaque iron borders are the only visible outer edge.
            No separate background, no shadow box around it. */}
        <FrameLayer />

        {/* Close button above everything */}
        {interactionEnabled && (
          <button
            onClick={onClose}
            aria-label="Close codex"
            className="absolute top-8 right-8 z-50 w-10 h-10 rounded-full bg-[#0d0e10]/80 border border-[#555] flex items-center justify-center cursor-pointer hover:border-rune-glow/80 hover:shadow-[0_0_12px_rgba(72,202,228,0.5)] transition-all duration-200 hover:rotate-90 hover:scale-105"
          >
            <span className="text-white text-lg leading-none">×</span>
          </button>
        )}

        {/* ISSUE 4: Content area expanded to ~78% of tablet.
            Insets pulled in to ensure it perfectly sits inside the iron borders.
            ISSUE 7: Vignette only — no hard container, no border, no background. */}
        <div className="absolute" style={{ top: '15.5%', bottom: '15.5%', left: '14.5%', right: '14.5%', zIndex: 40 }}>
          {/* Soft central vignette for readability — fades to transparent, no hard edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,0.38) 0%, transparent 100%)",
            }}
          />
          <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ zIndex: 1 }}>
            <CodexContent {...contentProps} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
