import React from "react";

export interface CodexHeroProps {
  label: string;
  title: string;
  loreSummary: string;
  runes: readonly string[];
  iconImg?: string;
  icon?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function CodexHero({ label, title, loreSummary, runes, iconImg, icon, style, className }: CodexHeroProps) {
  return (
    <div className={`text-left pt-0 mb-1 relative flex-shrink-0 flex flex-col items-start ${className || ""}`} style={style}>
      <p className="font-label-caps text-muted-gold tracking-[0.3em] uppercase text-[10px] lg:text-xs mb-0.5 engraved-text">
        {label}
      </p>

      <h2 className="font-headline-lg text-xl lg:text-3xl text-rune-glow codex-title-animate uppercase tracking-widest mb-1 lg:mb-1.5">
        {title}
      </h2>

      <p className="text-on-surface-variant/70 text-xs lg:text-sm text-left leading-snug mb-2 italic max-w-xl">
        {loreSummary}
      </p>

      <div className="w-full flex items-center justify-start gap-3 text-icy-cyan/55 text-xs tracking-[0.5em] relative">
        <div className="flex items-center gap-2">
          {runes.map((r, i) => (
            <span key={i} className="text-icy-cyan/60">{r}</span>
          ))}
          <span className="material-symbols-outlined text-sm text-icy-cyan/35">remove</span>
        </div>

        <div className="h-[1px] flex-1 bg-gradient-to-r from-faded-bronze/40 to-transparent"></div>
      </div>

      <div className="absolute top-0 right-2 lg:right-4 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center opacity-70 pointer-events-none animate-pulse" style={{ filter: "drop-shadow(0 0 12px rgba(72,202,228,0.6)) drop-shadow(0 0 24px rgba(72,202,228,0.4))" }}>
        {iconImg ? (
          <img src={iconImg} alt="" aria-hidden="true" className="w-full h-full object-contain" />
        ) : icon ? (
          <span className="material-symbols-outlined text-[40px] lg:text-[52px] text-icy-cyan" style={{ textShadow: "0 0 8px rgba(72,202,228,0.8)" }}>
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  );
}
