"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CodexContent, { CodexContentProps } from "./CodexContent";
import CodexFrame from "../codex/frame/CodexFrame";

// Calculated from the visual thickness of the frame pieces to avoid overlap
const contentInsetTop = 87;
const contentInsetBottom = 87;
const contentInsetLeft = 151;
const contentInsetRight = 151;

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
  const runeIgnition = useTransform(revealProgress, [0, 0.18, 0.72, 1], [0, 0.78, 0.22, 0]);

  return (
    <motion.div
      className="codex-artifact-wrap fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 51 }}
      aria-hidden={progress.get() < 0.45}
    >
      <motion.div
        className="relative"
        style={{
          width: "min(1000px, 85vw)",
          height: "min(800px, 85vh)",
          clipPath: artifactClip,
          scale: artifactScale,
          filter: artifactFilter,
          willChange: "clip-path, transform, filter",
          pointerEvents: interactionEnabled ? "auto" : "none",
        }}
      >
        <div className="codex-tablet relative flex flex-col w-full h-full">
          {interactionEnabled && (
            <button
              onClick={onClose}
              aria-label="Close codex"
              className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-[#0d0e10] border border-[#444] flex items-center justify-center cursor-pointer hover:border-rune-glow/60 hover:shadow-[0_0_8px_rgba(72,202,228,0.4)] transition-all duration-200 hover:rotate-90 hover:scale-105"
            >
              <span className="text-white text-sm leading-none">×</span>
            </button>
          )}

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: runeIgnition,
              background:
                "radial-gradient(circle at 22% 16%, rgba(72,202,228,0.22), transparent 24%), radial-gradient(circle at 78% 84%, rgba(176,141,87,0.18), transparent 26%)",
              boxShadow: "inset 0 0 48px rgba(72,202,228,0.18)",
            }}
          />

          <CodexFrame />

          <div 
            className="absolute z-40"
            style={{
              top: contentInsetTop,
              bottom: contentInsetBottom,
              left: contentInsetLeft,
              right: contentInsetRight
            }}
          >
            <CodexContent {...contentProps} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
