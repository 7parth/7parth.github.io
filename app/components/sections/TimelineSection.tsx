// TimelineSection — Path of the Ghost
// Ancient chronicle layout — carved artifact entries

const events = [
  {
    year: "2019",
    title: "The Spark",
    desc: "Wrote first lines of C. Compiled 'Hello World' — the cosmos trembled.",
    rune: "ᛋ",
    accent: "gold" as const,
  },
  {
    year: "2020",
    title: "The Trials Begin",
    desc: "Discovered competitive programming on HackerRank, then Codeforces. Solved first 100 problems.",
    rune: "ᛏ",
    accent: "cyan" as const,
  },
  {
    year: "2022 · Mar",
    title: "The Academy",
    desc: "Entered the undergraduate CE programme. JEE Advanced qualified. A new chapter begins.",
    rune: "ᛗ",
    accent: "gold" as const,
  },
  {
    year: "2022 · Oct",
    title: "First Quest",
    desc: "First open source contribution merged. A small bug fix — but it felt like slaying a dragon.",
    rune: "ᚢ",
    accent: "cyan" as const,
  },
  {
    year: "2023 · Feb",
    title: "First Battle",
    desc: "Competed in the college ICPC mock round and placed 3rd. The forge had begun shaping a warrior.",
    rune: "ᛚ",
    accent: "gold" as const,
  },
  {
    year: "2023 · Aug",
    title: "HackMIT Victory",
    desc: "Won 'Best Systems Hack' at HackMIT — a distributed filesystem built in 24 hours.",
    rune: "ᛟ",
    accent: "cyan" as const,
  },
  {
    year: "2023 · Dec",
    title: "Into the Machine",
    desc: "ML Research Intern at AsgardAI Labs. Fine-tuned LLMs, built RAG pipelines. The path of the sage.",
    rune: "ᛋ",
    accent: "gold" as const,
  },
  {
    year: "2024 · May",
    title: "Google Summer of Code",
    desc: "Accepted into GSoC. Contributed a high-performance parser to a major open-source compiler.",
    rune: "ᛏ",
    accent: "cyan" as const,
  },
  {
    year: "2024 · Jul",
    title: "SWE Internship",
    desc: "Software Engineering Intern at Midgard Tech Corp. Shipped pipelines, redesigned APIs.",
    rune: "ᛗ",
    accent: "gold" as const,
  },
  {
    year: "2024 · Nov",
    title: "ICPC Regionals",
    desc: "Qualified and competed in ICPC Asia Regionals. Top 15 / 280+. The warrior proved worthy.",
    rune: "ᚢ",
    accent: "cyan" as const,
  },
  {
    year: "2025 — Now",
    title: "The Codex Begins",
    desc: "Building the final year project. Writing blogs. Crafting this very codex. The chronicle continues…",
    rune: "ᛚ",
    accent: "gold" as const,
  },
] as const;

export default function TimelineSection() {
  return (
    <div className="section-fade">
      {events.map((evt, idx) => (
        <div key={idx}>
          {/* ── Chronicle Entry ── */}
          <div className="py-3 px-1">

            {/* Year */}
            <p
              className={`font-label-caps text-[9px] uppercase tracking-[0.25em] mb-2 engraved-text ${
                evt.accent === "cyan" ? "text-rune-glow/55" : "text-muted-gold/55"
              }`}
            >
              {evt.year}
            </p>

            {/* Rune bullet + Title */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <span
                className={`text-sm leading-none flex-shrink-0 ${
                  evt.accent === "cyan" ? "text-rune-glow/50" : "text-muted-gold/50"
                }`}
                aria-hidden="true"
              >
                {evt.rune}
              </span>
              <h3 className="font-headline-md text-[11px] text-frost-white/90 engraved-text tracking-wider uppercase leading-tight">
                {evt.title}
              </h3>
            </div>

            {/* Description */}
            <p className="font-body-md text-[10px] text-on-surface-variant/55 leading-relaxed engraved-text pl-[22px]">
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
