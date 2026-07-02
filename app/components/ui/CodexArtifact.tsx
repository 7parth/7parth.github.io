"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CodexHero from "./CodexHero";
import CodexFrame from "../codex/frame/CodexFrame";

// Calculated from the physical bounds of the frame pieces
const innerInsetTop = 80;
const innerInsetBottom = 80;
const innerInsetLeft = 142;
const innerInsetRight = 142;
export interface CodexContentProps {
  sectionKey: string;
  codexLabel: string;
  codexTitle: string;
  runeSymbol: string;
  loreSummary: string;
  runes: readonly string[];
  children: React.ReactNode;
}

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
        {/* The Frame Overlay - pointer events none so tablet can scroll underneath */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <CodexFrame />
        </div>



        {/* The stone tablet background - inset slightly so it hides perfectly behind the outer frame corners, removing the visible box! */}
        <div 
          className="codex-tablet absolute z-10 pointer-events-none"
          style={{
            top: 15,
            bottom: 15,
            left: 20,
            right: 20,
            borderRadius: 10
          }}
        />

        {/* The Scrollable Content Area - constrained exactly to the frame's solid inner edge */}
        <div 
          className="absolute z-20 flex flex-col"
          style={{
            top: innerInsetTop,
            bottom: innerInsetBottom,
            left: innerInsetLeft,
            right: innerInsetRight,
            width: `calc(100% - ${innerInsetLeft + innerInsetRight}px)`
          }}
        >
          <CodexHero 
            label={contentProps.codexLabel}
            title={contentProps.codexTitle}
            runeSymbol={contentProps.runeSymbol}
            loreSummary={contentProps.loreSummary}
            runes={contentProps.runes}
            style={{ paddingTop: 12 }}
          />

          <main 
            className="flex-1 w-full pb-12 overflow-y-auto hide-scrollbar"
            style={{
              paddingTop: 16 // Add a bit of space below the divider before content starts
            }}
          >
            {contentProps.children}
          </main>
        </div>

        {/* Effects Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: runeIgnition,
            background:
              "radial-gradient(circle at 22% 16%, rgba(72,202,228,0.22), transparent 24%), radial-gradient(circle at 78% 84%, rgba(176,141,87,0.18), transparent 26%)",
            boxShadow: "inset 0 0 48px rgba(72,202,228,0.18)",
          }}
        />

        {interactionEnabled && (
          <button
            onClick={onClose}
            aria-label="Close codex"
            className="absolute top-3 left-3 z-50 w-8 h-8 rounded-full bg-[#0d0e10] border border-[#444] flex items-center justify-center cursor-pointer hover:border-rune-glow/60 hover:shadow-[0_0_8px_rgba(72,202,228,0.4)] transition-all duration-200 hover:rotate-90 hover:scale-105 pointer-events-auto"
          >
            <span className="text-white text-sm leading-none">×</span>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
