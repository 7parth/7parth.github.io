import React from "react";

export interface CodexHeroProps {
  label: string;
  title: string;
  runeSymbol: string;
  loreSummary: string;
  runes: readonly string[];
  style?: React.CSSProperties;
  className?: string;
}

export default function CodexHero({ label, title, runeSymbol, loreSummary, runes, style, className }: CodexHeroProps) {
  return (
    <div className={`text-center pt-2 lg:pt-4 mb-4 lg:mb-6 relative flex-shrink-0 flex flex-col items-center ${className || ""}`} style={style}>
      <p className="font-label-caps text-muted-gold tracking-[0.3em] uppercase text-xs lg:text-sm mb-1 lg:mb-2 engraved-text">
        {label}
      </p>
      
      <h2 className="font-headline-lg text-3xl lg:text-5xl text-rune-glow codex-title-animate uppercase tracking-widest mb-3 lg:mb-4">
        {title}
      </h2>
      
      <p className="text-on-surface-variant/70 text-sm lg:text-base text-center leading-relaxed mb-4 lg:mb-6 italic">
        {loreSummary}
      </p>

      <div className="w-full flex items-center justify-center gap-4 text-icy-cyan/55 text-xs tracking-[0.5em] relative">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-faded-bronze/30"></div>
        
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-sm text-icy-cyan/35">remove</span>
          {runes.map((r, i) => (
            <span key={i} className="text-icy-cyan/60">{r}</span>
          ))}
          <span className="material-symbols-outlined text-sm text-icy-cyan/35">remove</span>
        </div>
        
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-faded-bronze/30"></div>
      </div>
    </div>
  );
}
