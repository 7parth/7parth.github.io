"use client";

import React from "react";

export interface CodexContentProps {
  sectionKey: string;
  codexLabel: string;
  codexTitle: string;
  runeSymbol: string;
  runes: readonly string[];
  children: React.ReactNode;
}

export default function CodexContent({
  sectionKey,
  codexLabel,
  codexTitle,
  runeSymbol,
  runes,
  children,
}: CodexContentProps) {
  return (
    <div
      key={sectionKey}
      className="p-5 lg:p-8 flex flex-col h-full overflow-hidden"
    >
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-faded-bronze/60 bg-surface-container-highest flex items-center justify-center z-10">
          <span className="material-symbols-outlined text-muted-gold text-lg icon-engraved">
            {runeSymbol}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 relative z-10 pb-12 pt-4">
        {children}
      </div>

      <div className="absolute bottom-4 left-0 w-full h-12 bg-gradient-to-t from-surface-container-low to-transparent z-20 pointer-events-none" />
    </div>
  );
}
