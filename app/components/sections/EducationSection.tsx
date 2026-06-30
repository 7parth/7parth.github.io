// EducationSection — Scrolls of Knowledge
// Two education entries with highlights, score badges, and meta rows

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Engineering",
    institution: "JSPM's Rajarshi Shahu College of Engineering, Pune",
    period: "Aug 2023 — May 2027",
    location: "Pune, India",
    score: "CGPA 9.31",
    icon: "school",
    accent: "gold",
    highlights: [
      "Currently pursuing B.Tech in Computer Engineering with a strong focus on software engineering and AI.",
      "Consistently maintaining a high academic standing with a CGPA of 9.31.",
    ],
  },
] as const;

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-6 section-fade">
      {education.map((edu) => (
        <div
          key={edu.id}
          className={`relic-stone p-5 ${edu.accent === "gold" ? "gold-card-glow" : "card-glow"}`}
        >
          {/* Header row */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-stone bg-[#0d0e10] border flex items-center justify-center ${
                edu.accent === "gold" ? "border-muted-gold/30" : "border-rune-glow/30"
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl icon-engraved ${
                  edu.accent === "gold" ? "text-muted-gold/80" : "text-rune-glow/80"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {edu.icon}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-headline-md text-base text-white engraved-text tracking-wider leading-tight">
                {edu.degree}
              </h3>
              <p
                className={`font-label-caps text-[9px] uppercase tracking-[0.2em] mt-0.5 ${
                  edu.accent === "gold" ? "text-muted-gold/65" : "text-icy-cyan/65"
                }`}
              >
                {edu.field}
              </p>
              <p className="font-body-md text-xs text-on-surface-variant/75 mt-1 engraved-text">
                {edu.institution}
              </p>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex items-center justify-between mb-4 py-2.5 border-y border-[#252525]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-on-surface-variant/35 icon-engraved">
                calendar_month
              </span>
              <span className="font-label-caps text-[8px] text-on-surface-variant/55 tracking-[0.1em]">
                {edu.period}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-on-surface-variant/35 icon-engraved">
                location_on
              </span>
              <span className="font-label-caps text-[8px] text-on-surface-variant/55 tracking-[0.1em]">
                {edu.location}
              </span>
            </div>
            <span
              className={`font-label-caps text-[8px] tracking-[0.1em] px-2 py-0.5 rounded border ${
                edu.accent === "gold"
                  ? "text-muted-gold border-muted-gold/30 bg-muted-gold/5"
                  : "text-icy-cyan border-icy-cyan/30 bg-icy-cyan/5"
              }`}
            >
              {edu.score}
            </span>
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-2.5">
            {edu.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[10px] text-on-surface-variant/68 leading-relaxed engraved-text"
              >
                <span
                  className={`flex-shrink-0 mt-0.5 ${
                    edu.accent === "gold" ? "text-muted-gold/45" : "text-icy-cyan/45"
                  }`}
                >
                  ᛋ
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
