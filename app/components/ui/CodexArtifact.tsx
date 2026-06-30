"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CodexContent, { CodexContentProps } from "./CodexContent";

const CHAIN_SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1NSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48L3N2Zz4=";

export interface CodexArtifactProps extends CodexContentProps {
  progress: MotionValue<number>;
  interactionEnabled: boolean;
  onClose: () => void;
}

export default function CodexArtifact({
  progress,
  interactionEnabled,
  onClose,
  ...contentProps
}: CodexArtifactProps) {
  const artifactClip = useTransform(progress, (value) => {
    const reveal = Math.max(0, Math.min(1, (value - 0.45) / 0.55));
    return `inset(0 ${100 - reveal * 100}% 0 0)`;
  });

  const artifactScale = useTransform(progress, [0.4, 0.52, 1], [0.975, 1.008, 1]);
  const artifactFilter = useTransform(progress, [0.45, 0.62, 1], ["blur(5px)", "blur(1px)", "blur(0px)"]);
  const runeIgnition = useTransform(progress, [0.45, 0.55, 0.8, 1], [0, 0.85, 0.25, 0]);

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

          <div
            className="absolute -top-[60px] left-8 w-3 h-[80px] opacity-80"
            style={{ backgroundImage: `url('${CHAIN_SVG}')` }}
          />
          <div
            className="absolute -top-[60px] right-8 w-3 h-[80px] opacity-80"
            style={{ backgroundImage: `url('${CHAIN_SVG}')` }}
          />

          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#555] rounded-tl" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#555] rounded-tr" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#555] rounded-bl" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#555] rounded-br" />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: runeIgnition,
              background:
                "radial-gradient(circle at 22% 16%, rgba(72,202,228,0.22), transparent 24%), radial-gradient(circle at 78% 84%, rgba(176,141,87,0.18), transparent 26%)",
              boxShadow: "inset 0 0 48px rgba(72,202,228,0.18)",
            }}
          />

          <div className="m-4 h-[calc(100%-2rem)] relative">
            <CodexContent {...contentProps} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
