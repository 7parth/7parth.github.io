// TimelineSection — Path of the Ghost
// Ancient chronicle layout — carved artifact entries
import EntryMarker from "../ui/EntryMarker";

const events = [
  {
    year: "2023",
    title: "The Spark",
    desc: "Wrote my first lines of code. The journey of crafting logic and forging intelligent systems began.",
    rune: "ᛋ",
    accent: "gold" as const,
  },
  {
    year: "2024",
    title: "First Hackathon Win (Sinhagad)",
    desc: "Secured 2nd place among 600+ participants for building an AI-powered, Blockchain-driven solution.",
    rune: "ᛟ",
    accent: "cyan" as const,
  },
  {
    year: "2024",
    title: "Table Tennis Runner Up",
    desc: "Demonstrated agility and strategy, securing the Runner Up position at the Intercollegiate Table Tennis Tournament in PCMC.",
    rune: "ᛏ",
    accent: "gold" as const,
  },
  {
    year: "2024",
    title: "Bajaj Finserv HackRx 6.0",
    desc: "Ranked 67th out of 4800+ teams nationwide, building an advanced document intelligence backend system.",
    rune: "ᚢ",
    accent: "cyan" as const,
  },
  {
    year: "2025",
    title: "Smart India Hackathon",
    desc: "National Top 5 Finalist. Built a production RAG system for government policy retrieval.",
    rune: "ᛏ",
    accent: "gold" as const,
  },
  {
    year: "2025",
    title: "Table Tennis 2nd Runner Up",
    desc: "Secured another podium finish as the Second Runner Up in the Intercollegiate Table Tennis Tournament.",
    rune: "ᛋ",
    accent: "cyan" as const,
  },
  {
    year: "2026",
    title: "HackMatrix 4.0 (Artimas)",
    desc: "Secured Runner Up at PCCOE. Built an AI-powered financial platform for credit health management and loan guidance.",
    rune: "ᛗ",
    accent: "gold" as const,
  },
  {
    year: "2026",
    title: "Avinya 4.0 Hackathon Winner",
    desc: "Secured 1st place winning a final prize of ₹30,000 for our innovative solution at RSCOE.",
    rune: "ᛚ",
    accent: "cyan" as const,
  },
] as const;

export default function TimelineSection() {
  return (
    <div className="section-fade">
      {events.map((evt, idx) => (
        <div key={idx}>
          {/* ── Chronicle Entry ── */}
          <div className="py-4 px-1">
            {/* Year */}
            <p
              className={`font-[family-name:var(--font-cinzel)] text-[10px] lg:text-[11px] uppercase tracking-[0.2em] mb-1.5 font-semibold engraved-text ${
                evt.accent === "cyan" ? "text-icy-cyan/70" : "text-muted-gold/70"
              }`}
            >
              {evt.year}
            </p>

            {/* Title */}
            <div className="flex items-center mb-1.5">
              <h3 className={`font-[family-name:var(--font-cinzel)] text-[14px] lg:text-[15px] font-medium engraved-text tracking-[0.1em] uppercase leading-tight flex items-center ${
                evt.accent === "cyan" ? "text-frost-white/90" : "text-muted-gold/90"
              }`}>
                <EntryMarker />
                {evt.title}
              </h3>
            </div>

            {/* Description */}
            <p className="font-[family-name:var(--font-ibm-plex)] text-[13px] lg:text-[14px] text-[#ECE7DD] font-normal engraved-text leading-[1.6] tracking-[0.2px] pl-[22px]">
              {evt.desc}
            </p>
          </div>

          {/* ── Thin separator — gold/bronze gradient ── */}
          {idx < events.length - 1 && (
            <div
              className="mx-auto"
              style={{
                width: "80%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(125,107,74,0.30) 30%, rgba(72,202,228,0.15) 60%, transparent)",
              }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}
