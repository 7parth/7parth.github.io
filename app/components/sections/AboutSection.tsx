// AboutSection — Warrior's Chronicle
// Matches the Stitch "About Me" panel exactly: bio, stats, core focus, CTA
import EntryMarker from "../ui/EntryMarker";

export default function AboutSection() {
  return (
    <div className="flex flex-col gap-6 text-center section-fade">
      {/* Bio */}
      <div className="flex flex-col gap-3 text-left relative px-1">
        <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-muted-gold/50 via-icy-cyan/20 to-transparent rounded-full" aria-hidden="true"></div>
        <p className="font-[family-name:var(--font-ibm-plex)] text-[14px] lg:text-[15px] text-[#ECE7DD] font-normal engraved-text leading-[1.6] pl-4">
          Currently a final year Computer Engineering student at JSPM's Rajarshi Shahu College of Engineering, Pune with hands-on experience building production-grade Agentic AI systems, RAG pipelines, and scalable backend APIs. Focused on the intersection of Machine Learning, Generative AI, and full-stack implementation.
        </p>
        <p className="font-[family-name:var(--font-ibm-plex)] text-[14px] lg:text-[15px] text-[#ECE7DD] font-normal engraved-text leading-[1.6] pl-4">
          Hailing from Sindhudurg, beyond the screen I am a professional Table Tennis player, a massive fan of video games, and deeply passionate about competitive problem-solving.
        </p>
      </div>
      
      {/* Availability Status */}
      <div className="flex justify-center mt-1 mb-2">
        <span className="font-[family-name:var(--font-cinzel)] text-[10px] uppercase tracking-[0.2em] text-icy-cyan/80 bg-icy-cyan/5 border border-icy-cyan/20 px-3 py-1.5 rounded-sm shadow-[inset_0_0_8px_rgba(72,202,228,0.1)] engraved-text flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-icy-cyan animate-pulse"></span>
          Open for Remote / On-Site / Hybrid
        </span>
      </div>

      {/* Core Focus */}
      <div className="mt-2">
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-muted-gold/40" />
          <h3 className="font-[family-name:var(--font-cinzel)] text-[11px] lg:text-[12px] text-muted-gold uppercase tracking-[0.3em] font-medium engraved-text">
            Core Focus
          </h3>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-muted-gold/40" />
        </div>
        <ul className="flex flex-col gap-3.5 px-4 text-left">
          {[
            { icon: "code", label: "Full Stack Development" },
            { icon: "memory", label: "System Design & Optimization" },
            { icon: "schema", label: "AI, ML & Data Engineering" },
            { icon: "extension", label: "Problem Solving & DSA" },
          ].map(({ label }) => (
            <li key={label} className="flex items-center gap-2">
              <EntryMarker />
              <span className="font-[family-name:var(--font-cinzel)] text-[12px] lg:text-[13px] uppercase tracking-[0.15em] text-[#ECE7DD] font-medium engraved-text">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}