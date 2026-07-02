"use client";

// ResumeSection — The Ancient Scroll
// Download CTA + quick-stat grid
import EntryMarker from "../ui/EntryMarker";

export default function ResumeSection() {
  return (
    <div className="flex flex-col gap-6 items-center section-fade">
      {/* Main card */}
      <div className="w-full text-center pb-6 border-b border-faded-bronze/10">
        <h3 className="font-[family-name:var(--font-cinzel)] text-[18px] lg:text-[20px] uppercase tracking-[0.1em] text-muted-gold font-medium engraved-text mb-2 flex items-center justify-center gap-1.5">
          <EntryMarker />
          The Ancient Scroll
        </h3>
        <p className="font-[family-name:var(--font-ibm-plex)] text-[14px] lg:text-[15px] text-[#ECE7DD] font-normal engraved-text leading-[1.6] mb-6 px-4">
          A comprehensive record of battles fought, knowledge gained, and relics
          forged across the realms of technology — formatted for mortal
          recruiters.
        </p>

        {/* Download button */}
        <a
          href="https://docs.google.com/document/d/1_jtkesZB1QhaAhvOG2yiuZ9L2zWOG7b8EqqwROGqGow/edit?usp=sharing"
          download
          className="shimmer-btn inline-flex items-center justify-center gap-3 w-full py-3 bg-[#1a1c1e] border border-muted-gold/30 rounded hover:border-muted-gold/60 transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          <span className="font-[family-name:var(--font-cinzel)] text-muted-gold/90 text-[12px] uppercase tracking-[0.2em] font-semibold engraved-text">
            Download Resume
          </span>
        </a>

        {/* View online */}
        <a
          href="https://docs.google.com/document/d/1_jtkesZB1QhaAhvOG2yiuZ9L2zWOG7b8EqqwROGqGow/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-btn inline-flex items-center justify-center gap-3 w-full py-3 mt-2 bg-[#111] border border-[#2a2a2a] rounded hover:border-[#444] transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          <span className="font-[family-name:var(--font-cinzel)] text-on-surface-variant/70 text-[12px] uppercase tracking-[0.2em] font-semibold engraved-text">
            View Online
          </span>
        </a>
      </div>

      {/* Core Stack */}
      <div className="w-full pb-6 border-b border-faded-bronze/10">
        <h4 className="font-[family-name:var(--font-cinzel)] text-[12px] uppercase tracking-[0.2em] text-muted-gold font-medium engraved-text mb-3 text-center flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-muted-gold/40"></span>
          Primary Arsenal
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-muted-gold/40"></span>
        </h4>
        <div className="flex flex-wrap justify-center gap-2 px-2">
          {[
            "Python",
            "LangChain",
            "LangGraph",
            "FastAPI",
            "Next.js",
            "MERN Stack",
            "PostgreSQL",
            "Scikit-Learn"
          ].map((tech) => (
            <span
              key={tech}
              className="font-[family-name:var(--font-ibm-plex)] text-[12px] text-icy-cyan/80 bg-[rgba(72,202,228,0.03)] border border-icy-cyan/10 px-3 py-1 rounded-[2px] tracking-[0.05em] transition-colors hover:bg-[rgba(72,202,228,0.08)] hover:border-icy-cyan/30 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="font-[family-name:var(--font-ibm-plex)] text-[10px] text-on-surface-variant/40 tracking-[0.1em] uppercase text-center engraved-text mt-2">
        Last Updated: June 2026 · Midgard Standard Time
      </p>
    </div>
  );
}
