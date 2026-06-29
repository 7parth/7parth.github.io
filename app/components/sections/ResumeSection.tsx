"use client";

// ResumeSection — The Ancient Scroll
// Download CTA + quick-stat grid

export default function ResumeSection() {
  return (
    <div className="flex flex-col gap-6 items-center section-fade">
      {/* Main card */}
      <div className="w-full relic-stone p-6 text-center">
        <span
          className="material-symbols-outlined text-5xl text-muted-gold/70 icon-engraved mb-4 block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          history_edu
        </span>
        <h3 className="font-headline-md text-base text-white engraved-text tracking-widest uppercase mb-2">
          The Ancient Scroll
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant/65 engraved-text leading-relaxed mb-6 px-4">
          A comprehensive record of battles fought, knowledge gained, and relics
          forged across the realms of technology — formatted for mortal
          recruiters.
        </p>

        {/* Download button */}
        <a
          href="/resume.pdf"
          download
          className="shimmer-btn inline-flex items-center justify-center gap-3 w-full py-3 bg-[#1a1c1e] border border-muted-gold/30 rounded hover:border-muted-gold/60 transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          <span className="material-symbols-outlined text-muted-gold/80 text-sm icon-engraved">
            download
          </span>
          <span className="font-label-caps text-muted-gold/80 text-[10px] uppercase tracking-[0.3em] engraved-text">
            Download Resume
          </span>
        </a>

        {/* View online */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-btn inline-flex items-center justify-center gap-3 w-full py-3 mt-2 bg-[#111] border border-[#2a2a2a] rounded hover:border-[#444] transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          <span className="material-symbols-outlined text-on-surface-variant/50 text-sm icon-engraved">
            open_in_new
          </span>
          <span className="font-label-caps text-on-surface-variant/50 text-[10px] uppercase tracking-[0.3em] engraved-text">
            View Online
          </span>
        </a>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {[
          { icon: "work", label: "Internships", value: "2" },
          { icon: "hardware", label: "Projects", value: "25+" },
          { icon: "star", label: "LeetCode", value: "250+" },
          { icon: "emoji_events", label: "Achievements", value: "6+" },
        ].map((stat) => (
          <div key={stat.label} className="relic-stone p-3 text-center">
            <span
              className="material-symbols-outlined text-2xl text-icy-cyan/55 icon-engraved block mb-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
            <span className="font-stat-num text-xl text-white engraved-text">
              {stat.value}
            </span>
            <p className="font-label-caps text-[8px] text-on-surface-variant/45 uppercase tracking-[0.2em] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="font-label-caps text-[9px] text-on-surface-variant/25 tracking-[0.2em] uppercase text-center engraved-text">
        Last Updated: June 2026 · Midgard Standard Time
      </p>
    </div>
  );
}
