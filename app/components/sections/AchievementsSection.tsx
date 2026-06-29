// AchievementsSection — Trophies of Valhalla
// 6 achievement cards with icon, tag badge, and description

const achievements = [
  {
    id: 1,
    icon: "emoji_events",
    title: "ICPC Regional Finalist",
    subtitle: "ICPC Asia Regionals 2024",
    desc: "Qualified and competed in the ICPC Asia Regional Contest, finishing top 15 out of 280+ teams. Solved 5 / 9 problems in 5 hours under contest pressure.",
    tag: "Competitive Prog.",
    accent: "gold",
  },
  {
    id: 2,
    icon: "code",
    title: "Google Summer of Code",
    subtitle: "GSoC 2024 — Contributor",
    desc: "Selected as a GSoC contributor. Implemented a high-performance parser for a major open-source compiler project — 12 PRs merged, 4 000+ lines of code.",
    tag: "Open Source",
    accent: "cyan",
  },
  {
    id: 3,
    icon: "military_tech",
    title: "HackMIT 2023 Winner",
    subtitle: "Best Systems Hack Award",
    desc: "Built a distributed filesystem with automatic sharding and replication in 24 hours. Won the 'Best Systems Hack' prize among 600+ hackers.",
    tag: "Hackathon",
    accent: "gold",
  },
  {
    id: 4,
    icon: "grade",
    title: "Codeforces Expert",
    subtitle: "Rating: 1 820 · Top 3 % globally",
    desc: "Achieved Expert tier on Codeforces. 700+ problems solved with a focus on graph theory, segment trees, and competitive dynamic programming.",
    tag: "Competitive Prog.",
    accent: "cyan",
  },
  {
    id: 5,
    icon: "star",
    title: "LeetCode Knight",
    subtitle: "Global Rank ~12 000 · 250+ solved",
    desc: "250+ problems solved (Easy/Medium/Hard). Completed the 100-Day streak badge. Knight tier rating in weekly and biweekly contests.",
    tag: "Problem Solving",
    accent: "gold",
  },
  {
    id: 6,
    icon: "workspace_premium",
    title: "Smart India Hackathon",
    subtitle: "National Finalist 2023",
    desc: "National finalist in India's largest hackathon. Built an AI-powered road-damage detection system using computer vision for government infrastructure monitoring.",
    tag: "Hackathon",
    accent: "cyan",
  },
] as const;

export default function AchievementsSection() {
  return (
    <div className="flex flex-col gap-4 section-fade">
      {achievements.map((ach) => (
        <div
          key={ach.id}
          className={`relic-stone p-4 ${ach.accent === "gold" ? "gold-card-glow" : "card-glow"}`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-stone bg-[#0d0e10] border flex items-center justify-center ${
                ach.accent === "gold" ? "border-muted-gold/30" : "border-rune-glow/30"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl icon-engraved ${
                  ach.accent === "gold" ? "text-muted-gold/80" : "text-rune-glow/80"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {ach.icon}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <h3 className="font-headline-md text-sm text-white engraved-text tracking-wider">
                  {ach.title}
                </h3>
                <span
                  className={`font-label-caps text-[8px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded border flex-shrink-0 ${
                    ach.accent === "gold"
                      ? "text-muted-gold/70 border-muted-gold/20 bg-muted-gold/5"
                      : "text-icy-cyan/70 border-icy-cyan/20 bg-icy-cyan/5"
                  }`}
                >
                  {ach.tag}
                </span>
              </div>
              <p
                className={`font-label-caps text-[9px] uppercase tracking-[0.18em] mb-2 ${
                  ach.accent === "gold" ? "text-muted-gold/55" : "text-icy-cyan/55"
                }`}
              >
                {ach.subtitle}
              </p>
              <p className="font-body-md text-[10px] text-on-surface-variant/68 leading-relaxed engraved-text">
                {ach.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
