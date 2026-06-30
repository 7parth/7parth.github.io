// AchievementsSection — Trophies of Valhalla
// 6 achievement cards with icon, tag badge, and description

const achievements = [
  {
    id: 1,
    icon: "workspace_premium",
    title: "Smart India Hackathon 2025",
    subtitle: "National Top 5 Finalist",
    desc: "Built a production RAG system for government policy retrieval, selected among the top 5 teams nationally.",
    tag: "Hackathon",
    accent: "gold",
  },
  {
    id: 2,
    icon: "military_tech",
    title: "Bajaj Finserv HackRx 6.0",
    subtitle: "Ranked 67th / 4800+ Teams",
    desc: "Nationwide hackathon where we built an advanced document intelligence backend system, ranking in the top tier out of 4800+ participating teams.",
    tag: "Hackathon",
    accent: "cyan",
  },
  {
    id: 3,
    icon: "emoji_events",
    title: "Sinhagad Technomela'25 Hackathon",
    subtitle: "Secured 2nd Place",
    desc: "Secured 2nd place among 600+ participants for building an AI-powered, Blockchain-driven solution.",
    tag: "Hackathon",
    accent: "gold",
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
