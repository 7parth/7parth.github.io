// AboutSection — Warrior's Chronicle
// Matches the Stitch "About Me" panel exactly: bio, stats, core focus, CTA

export default function AboutSection() {
  return (
    <div className="flex flex-col gap-6 text-center section-fade">
      {/* Bio */}
      <p className="font-body-md text-on-surface-variant/90 leading-relaxed tracking-wide text-sm engraved-text px-2">
        I am a final year Computer Engineering student and a passionate developer
        who loves building efficient, scalable and impactful digital solutions.
      </p>
      <p className="font-body-md text-on-surface-variant/90 leading-relaxed tracking-wide text-sm engraved-text px-2">
        From solving complex problems to creating immersive experiences, I enjoy
        turning ideas into products that make a difference.
      </p>

      {/* Stats Row */}
      <div className="flex justify-between items-center py-7 mt-2 border-y border-[#2e2e2e]">
        <div className="text-center flex flex-col items-center flex-1">
          <span
            className="material-symbols-outlined text-muted-gold text-3xl mb-2 icon-engraved"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            change_history
          </span>
          <span className="font-stat-num text-3xl text-white tracking-widest engraved-text">
            3+
          </span>
          <span className="font-label-caps text-[9px] text-on-surface-variant/60 mt-2 uppercase text-center tracking-[0.2em]">
            Years of
            <br />
            Learning
          </span>
        </div>
        <div className="w-px h-16 bg-[#2e2e2e]" />
        <div className="text-center flex flex-col items-center flex-1">
          <span
            className="material-symbols-outlined text-muted-gold text-3xl mb-2 icon-engraved"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            explore
          </span>
          <span className="font-stat-num text-3xl text-white tracking-widest engraved-text">
            25+
          </span>
          <span className="font-label-caps text-[9px] text-on-surface-variant/60 mt-2 uppercase text-center tracking-[0.2em]">
            Projects
            <br />
            Built
          </span>
        </div>
        <div className="w-px h-16 bg-[#2e2e2e]" />
        <div className="text-center flex flex-col items-center flex-1">
          <span
            className="material-symbols-outlined text-muted-gold text-3xl mb-2 icon-engraved"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            architecture
          </span>
          <span className="font-stat-num text-3xl text-white tracking-widest engraved-text">
            250+
          </span>
          <span className="font-label-caps text-[9px] text-on-surface-variant/60 mt-2 uppercase text-center tracking-[0.2em]">
            Problems
            <br />
            Solved
          </span>
        </div>
      </div>

      {/* Core Focus */}
      <div className="mt-2">
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-10 bg-muted-gold/30" />
          <h3 className="font-label-caps text-[10px] text-muted-gold uppercase tracking-[0.35em] engraved-text">
            Core Focus
          </h3>
          <div className="h-px w-10 bg-muted-gold/30" />
        </div>
        <ul className="flex flex-col gap-3.5 font-body-md text-xs text-on-surface-variant/80 tracking-wide px-4 text-left">
          {[
            { icon: "code", label: "Full Stack Development" },
            { icon: "memory", label: "System Design & Optimization" },
            { icon: "schema", label: "AI, ML & Data Engineering" },
            { icon: "extension", label: "Problem Solving & DSA" },
          ].map(({ icon, label }) => (
            <li key={icon} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-icy-cyan/70 text-xl icon-engraved flex-shrink-0">
                {icon}
              </span>
              <span className="engraved-text">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-6 pt-4 border-t border-outline-variant/20">
        <button className="w-full py-4 bg-[#1a1c1e] border border-[#333] rounded flex items-center justify-center gap-3 hover:border-muted-gold/50 transition-colors group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Stitch shimmer: translate-x sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          <span className="font-label-caps text-muted-gold/80 text-[10px] uppercase tracking-[0.3em] group-hover:text-muted-gold transition-colors engraved-text">
            More About My Journey
          </span>
          <span className="material-symbols-outlined text-muted-gold/80 text-sm icon-engraved group-hover:text-muted-gold group-hover:translate-x-2 transition-all duration-300">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}