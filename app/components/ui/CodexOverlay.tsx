"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EngravingReveal from "./EngravingReveal";

const CHAIN_SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1NSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48L3N2Zz4=";

export interface CodexOverlayProps {
  isOpen: boolean;
  sectionKey: string;
  codexLabel: string;
  codexTitle: string;
  runeSymbol: string;
  runes: readonly string[];
  onClose: () => void;
  children: React.ReactNode;
}

export default function CodexOverlay({
  isOpen,
  sectionKey,
  codexLabel,
  codexTitle,
  runeSymbol,
  runes,
  onClose,
  children,
}: CodexOverlayProps) {
  // ESC key support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop */}
          <motion.div
            key="codex-backdrop"
            className="fixed inset-0 bg-black/30"
            style={{ zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* 2. Codex container — pointer-events-none so backdrop click works */}
          <motion.div
            key="codex-positioner"
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 50 }}
          >
            {/* Codex panel — no entrance animation, beam is the reveal */}
            <div
              className="codex-tablet relative flex flex-col pointer-events-auto"
              style={{
                width: "min(1000px, 85vw)",
                height: "min(800px, 85vh)",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-[#0d0e10] border border-[#444] flex items-center justify-center cursor-pointer hover:border-rune-glow/60 hover:shadow-[0_0_8px_rgba(72,202,228,0.4)] transition-all duration-200 hover:rotate-90 hover:scale-105"
              >
                <span className="text-white text-sm leading-none">×</span>
              </button>

              {/* Chains */}
              <div
                className="absolute -top-[60px] left-8 w-3 h-[80px] opacity-80"
                style={{ backgroundImage: `url('${CHAIN_SVG}')` }}
              />
              <div
                className="absolute -top-[60px] right-8 w-3 h-[80px] opacity-80"
                style={{ backgroundImage: `url('${CHAIN_SVG}')` }}
              />

              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#555] rounded-tl" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#555] rounded-tr" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#555] rounded-bl" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#555] rounded-br" />

              {/* EngravingReveal wraps all inner content */}
              <EngravingReveal
                sectionKey={sectionKey}
                className="m-4 h-[calc(100%-2rem)]"
                innerClassName="p-5 lg:p-8 flex flex-col h-full overflow-hidden codex-inner-border bg-surface-container-low/80 backdrop-blur-md"
              >
                {/* Header */}
                <div className="text-center mb-6 lg:mb-8 relative flex-shrink-0 border-b border-faded-bronze/30 pb-6">
                  <p className="font-label-caps text-muted-gold tracking-[0.3em] uppercase text-xs mb-2 lg:mb-3 engraved-text">
                    {codexLabel}
                  </p>
                  <h2 className="font-headline-lg text-2xl lg:text-[40px] text-rune-glow codex-title-animate uppercase tracking-widest mb-3 lg:mb-4">
                    {codexTitle}
                  </h2>
                  <div className="norse-divider justify-center mb-3 lg:mb-4 text-icy-cyan/55 text-xs tracking-[0.5em]">
                    <span className="material-symbols-outlined text-sm text-icy-cyan/35">remove</span>
                    {runes.map((r, i) => (
                      <span key={i} className="text-icy-cyan/60">{r}</span>
                    ))}
                    <span className="material-symbols-outlined text-sm text-icy-cyan/35">remove</span>
                  </div>
                  {/* Ornament diamond */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-faded-bronze/60 bg-surface-container-highest flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-muted-gold text-lg icon-engraved">
                      {runeSymbol}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 relative z-10 pb-12 pt-4">
                  {children}
                </div>

                {/* Bottom fade edge */}
                <div className="absolute bottom-4 left-0 w-full h-12 bg-gradient-to-t from-surface-container-low to-transparent z-20 pointer-events-none" />
              </EngravingReveal>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
