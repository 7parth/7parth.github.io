// AchievementsSection — Trophies of Valhalla
// 6 achievement cards with icon, tag badge, and description
import EntryMarker from "../ui/EntryMarker";

const achievements = [
  {
    id: 1,
    title: "Smart India Hackathon 2025",
    subtitle: "National Top 5 Finalist",
    location: "Odisha, Rourkela",
    desc: "Built a production RAG system for government policy retrieval, selected among the top 5 teams nationally.",
    tag: "Hackathon",
    accent: "gold",
  },
  {
    id: 2,
    title: "Avinya 4.0 Hackathon",
    subtitle: "Winner",
    location: "RSCOE, Pune",
    desc: "Secured 1st place winning a final prize of ₹30,000 for our innovative solution.",
    tag: "Hackathon",
    accent: "cyan",
  },
  {
    id: 3,
    title: "HackMatrix 4.0 (Artimas)",
    subtitle: "Runner Up",
    location: "PCCOE, Pune",
    desc: "Built an AI-powered financial platform for credit health management and loan guidance using React, FastAPI, and ML.",
    tag: "Hackathon",
    accent: "gold",
  },
  {
    id: 4,
    title: "Bajaj Finserv HackRx 6.0",
    subtitle: "Ranked 67th / 4800+ Teams",
    location: "Remote, India",
    desc: "Nationwide hackathon where we built an advanced document intelligence backend system, ranking in the top tier out of 4800+ participating teams.",
    tag: "Hackathon",
    accent: "cyan",
  },
  {
    id: 5,
    title: "Sinhagad Technomela'24 Hackathon",
    subtitle: "Secured 2nd Place",
    location: "Pune, India",
    desc: "Secured 2nd place among 600+ participants for building an AI-powered, Blockchain-driven solution.",
    tag: "Hackathon",
    accent: "gold",
  },
  {
    id: 6,
    title: "Intercollegiate Table Tennis Tournament",
    subtitle: "2024 Runner Up & 2025 Second Runner Up",
    location: "PCMC",
    desc: "Demonstrated agility, strategy, and sportsmanship consistently securing top podium finishes in intercollegiate competitions.",
    tag: "Sports",
    accent: "cyan",
  },
] as const;

export default function AchievementsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-6 lg:gap-y-10 section-fade pb-2">
      {achievements.map((ach) => (
        <div key={ach.id} className="relative flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-[family-name:var(--font-cinzel)] text-[14px] lg:text-[15px] uppercase tracking-[0.1em] text-muted-gold font-medium engraved-text flex items-center gap-1.5">
              <EntryMarker />
              {ach.title}
            </h3>
            <span
              className={`font-label-caps text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 border flex-shrink-0 bg-transparent ${ach.accent === "gold"
                  ? "text-muted-gold/70 border-muted-gold/20"
                  : "text-icy-cyan/70 border-icy-cyan/20"
                }`}
            >
              {ach.tag}
            </span>
          </div>

          <hr className="border-t border-faded-bronze/25 w-full mb-3 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[10px] lg:text-[11px] font-label-caps uppercase tracking-[0.15em]">
              <span className={ach.accent === "gold" ? "text-muted-gold/70" : "text-icy-cyan/70"}>
                {ach.subtitle}
              </span>
              <span className="text-on-surface-variant/50 text-right">
                {ach.location}
              </span>
            </div>

            <p className="font-[family-name:var(--font-ibm-plex)] text-[14px] lg:text-[15px] text-[#ECE7DD] font-normal engraved-text leading-[1.6] tracking-[0.2px]">
              {ach.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
