"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIMIR_QUOTES = [
  "Patience, Brother... He's still forging the relics.",
  "You'd think he'd build a normal portfolio. Apparently not.",
  "The lad insists every animation matters. Can't argue with the results.",
  "Hold a moment... These runes take time to awaken.",
  "Almost ready... Wouldn't want to rush ancient magic.",
  "One last relic... There we are.",
  "You know, Brother... Most engineers build portfolios. This one built an entire realm.",
];

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [quote] = useState(() => MIMIR_QUOTES[Math.floor(Math.random() * MIMIR_QUOTES.length)]);
  const [phase, setPhase] = useState<"loading" | "complete">("loading");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finishLoading = useCallback(() => {
    setPhase((prev) => {
      if (prev === "loading") {
        setTimeout(() => {
          onCompleteRef.current();
        }, 300);
        return "complete";
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 3600);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      finishLoading();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onClick={finishLoading}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/gow-bg2.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-surface-container-lowest" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <img
                src="/icons/omega-blue.png"
                alt="Omega Logo"
                className="w-24 h-24 mb-8 opacity-80 drop-shadow-[0_0_15px_rgba(72,202,228,0.3)]"
              />
              <h1 className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl tracking-[0.3em] text-muted-gold uppercase engraved-text mb-6">
                Forging the Codex
              </h1>
              <p suppressHydrationWarning className="font-[family-name:var(--font-ibm-plex)] text-sm md:text-base text-faded-bronze italic mb-8 min-h-[3rem]">
                "{quote}"
              </p>

              {/* Subtle engraved loading line */}
              <div className="w-48 h-[2px] bg-black/40 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] relative mb-8">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-icy-cyan/40 shadow-[0_0_8px_rgba(72,202,228,0.4)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.6, ease: "linear" }}
                />
              </div>

              <motion.p
                className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.3em] text-faded-bronze/50 uppercase engraved-text mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Press any button to skip
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl tracking-[0.2em] text-icy-cyan uppercase engraved-text drop-shadow-[0_0_12px_rgba(72,202,228,0.6)]">
                The Relics await.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
