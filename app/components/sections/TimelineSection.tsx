// TimelineSection — Path of the Ghost
// Chronological life events with alternating cyan/gold nodes

const events = [
  {
    year: "2019",
    title: "The Spark",
    desc: "Wrote first lines of C. Compiled 'Hello World' — the cosmos trembled.",
    icon: "wb_sunny",
    accent: "gold",
  },
  {
    year: "2020",
    title: "The Trials Begin",
    desc: "Discovered competitive programming on HackerRank, then Codeforces. Solved first 100 problems.",
    icon: "bolt",
    accent: "cyan",
  },
  {
    year: "2022 Mar",
    title: "The Academy",
    desc: "Entered the undergraduate CE programme. JEE Advanced qualified. A new chapter begins.",
    icon: "school",
    accent: "gold",
  },
  {
    year: "2022 Oct",
    title: "First Quest",
    desc: "First open source contribution merged. A small bug fix — but it felt like slaying a dragon.",
    icon: "code",
    accent: "cyan",
  },
  {
    year: "2023 Feb",
    title: "First Battle",
    desc: "Competed in the college ICPC mock round and placed 3rd. The forge had begun shaping a warrior.",
    icon: "swords",
    accent: "gold",
  },
  {
    year: "2023 Aug",
    title: "HackMIT Victory",
    desc: "Won 'Best Systems Hack' at HackMIT — a distributed filesystem built in 24 hours.",
    icon: "military_tech",
    accent: "cyan",
  },
  {
    year: "2023 Dec",
    title: "Into the Machine",
    desc: "ML Research Intern at AsgardAI Labs. Fine-tuned LLMs, built RAG pipelines. The path of the sage revealed itself.",
    icon: "psychology",
    accent: "gold",
  },
  {
    year: "2024 May",
    title: "Google Summer of Code",
    desc: "Accepted into GSoC. Contributed a high-performance parser to a major open-source compiler. 12 PRs merged.",
    icon: "workspace_premium",
    accent: "cyan",
  },
  {
    year: "2024 Jul",
    title: "SWE Internship",
    desc: "Software Engineering Intern at Midgard Tech Corp. Shipped data pipelines, redesigned APIs, built dashboards.",
    icon: "work",
    accent: "gold",
  },
  {
    year: "2024 Nov",
    title: "ICPC Regionals",
    desc: "Qualified and competed in ICPC Asia Regionals. Top 15 / 280+. The warrior had proven worthy.",
    icon: "emoji_events",
    accent: "cyan",
  },
  {
    year: "2025 — Now",
    title: "The Codex Begins",
    desc: "Building the final year project. Writing blogs. Crafting this very codex. The chronicle continues…",
    icon: "auto_stories",
    accent: "gold",
  },
] as const;

export default function TimelineSection() {
  return (
    <div className="relative section-fade">
      {/* Vertical line */}
      <div className="timeline-line" />

      <div className="flex flex-col gap-0">
        {events.map((evt, idx) => (
          <div key={idx} className="relative flex items-start gap-4 pl-2 pb-5">
            {/* Node */}
            <div
              className={`relative flex-shrink-0 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface-container-lowest ${
                evt.accent === "cyan"
                  ? "border-rune-glow/50"
                  : "border-muted-gold/50"
              }`}
            >
              <span
                className={`material-symbols-outlined icon-engraved ${
                  evt.accent === "cyan" ? "text-rune-glow/70" : "text-muted-gold/70"
                }`}
                style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
              >
                {evt.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`font-label-caps text-[9px] uppercase tracking-[0.2em] ${
                    evt.accent === "cyan" ? "text-rune-glow/65" : "text-muted-gold/65"
                  }`}
                >
                  {evt.year}
                </span>
                <h3 className="font-headline-md text-xs text-white engraved-text tracking-wider">
                  {evt.title}
                </h3>
              </div>
              <p className="font-body-md text-[10px] text-on-surface-variant/65 leading-relaxed engraved-text">
                {evt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
