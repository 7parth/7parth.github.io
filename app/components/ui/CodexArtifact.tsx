"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import CodexHero from "./CodexHero";
import CodexFrame from "../codex/frame/CodexFrame";

// Calculated from the physical solid bounds of the frame pieces (ignoring transparent drop shadow bounding boxes)
const innerInsetTop = 60;
const innerInsetBottom = 45;
const innerInsetLeft = 75;
const innerInsetRight = 65;
export interface CodexContentProps {
  sectionKey: string;
  codexLabel: string;
  codexTitle: string;
  loreSummary: string;
  runes: readonly string[];
  iconImg?: string;
  icon?: string;
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
            loreSummary={contentProps.loreSummary}
            runes={contentProps.runes}
            iconImg={contentProps.iconImg}
            icon={contentProps.icon}
          />

          <main 
            className="flex-1 w-full pb-12 overflow-y-auto hide-scrollbar"
            style={{
              paddingTop: 8 // Tighter gap to the divider for cohesiveness
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
          <motion.button
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.2, 0.02, 0.18, 1] }}
            onClick={onClose}
            aria-label="Close codex"
            className="absolute top-6 left-6 z-50 w-10 h-10 flex items-center justify-center cursor-pointer group pointer-events-auto"
          >
            {/* The stone diamond background */}
            <div className="absolute inset-0 bg-[#121316] border border-faded-bronze/40 rounded-sm rotate-45 shadow-[inset_0_0_10px_rgba(0,0,0,0.8),_0_2px_10px_rgba(0,0,0,0.6)] group-hover:border-icy-cyan/60 group-hover:bg-icy-cyan/5 group-hover:shadow-[0_0_15px_rgba(72,202,228,0.5),_inset_0_0_10px_rgba(72,202,228,0.2)] transition-all duration-300 group-hover:scale-105"></div>
            {/* The Gebo rune (X) */}
            <span className="relative text-muted-gold/80 text-[18px] group-hover:text-icy-cyan group-hover:drop-shadow-[0_0_10px_rgba(72,202,228,0.9)] transition-all duration-300 engraved-text font-bold z-10 -ml-0.5 mt-0.5">
              ᚷ
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
