// EducationSection — Scrolls of Knowledge
// Two education entries with highlights, score badges, and meta rows
import EntryMarker from "../ui/EntryMarker";

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Engineering",
    institution: "JSPM's Rajarshi Shahu College of Engineering",
    period: "Aug 2023 — May 2027",
    location: "Pune, India",
    score: "CGPA 9.31",
    accent: "gold",
    highlights: [
      "Currently pursuing B.Tech in Computer Engineering with a strong focus on software engineering and AI.",
      "Consistently maintaining a high academic standing with a CGPA of 9.31.",
    ],
  },
  {
    id: 2,
    degree: "12th Standard",
    field: "HSC Board",
    institution: "SPK Jr. College",
    period: "May 2022 — Mar 2023",
    location: "Sawantwadi, India",
    score: "75.5%",
    accent: "cyan",
    highlights: [
      "Completed 12th standard with a strong foundation in Physics, Chemistry, and Mathematics."
    ]
  },
  {
    id: 3,
    degree: "10th Standard",
    field: "SSC Board",
    institution: "Kalsulkar English School",
    period: "Mar 2021",
    location: "Sawantwadi, India",
    score: "93.6%",
    accent: "gold",
    highlights: [
      "Graduated 10th standard with distinction, scoring 93.6% in the Maharashtra State Board."
    ]
  }
] as const;

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-3 section-fade pb-2">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="relative pb-4 mb-0 border-b last:border-b-0 border-faded-bronze/10"
        >
          {/* Header row */}
          <div className="flex flex-col mb-1">
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-cinzel)] text-[17px] lg:text-[19px] uppercase tracking-[0.1em] text-muted-gold font-medium engraved-text flex items-center gap-1.5">
                <EntryMarker />
                {edu.degree}
              </h3>
              <p
                className={`font-[family-name:var(--font-cinzel)] text-[11px] lg:text-[12px] uppercase tracking-[0.2em] mt-1 ${edu.accent === "gold" ? "text-muted-gold/70" : "text-icy-cyan/70"
                  }`}
              >
                {edu.field}
              </p>
              <p className="font-[family-name:var(--font-ibm-plex)] text-[15px] lg:text-[16px] text-[#ECE7DD] font-normal engraved-text mt-1">
                {edu.institution}
              </p>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3 mt-2 py-1.5 border-y border-faded-bronze/10">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="font-[family-name:var(--font-ibm-plex)] text-[12px] md:text-[13px] text-on-surface-variant/70 tracking-[0.5px]">
                {edu.period}
              </span>
              <span className="font-[family-name:var(--font-ibm-plex)] text-[12px] md:text-[13px] text-on-surface-variant/70 tracking-[0.5px]">
                {edu.location}
              </span>
            </div>
            <span
              className={`font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.1em] px-2 py-0.5 border font-semibold ${edu.accent === "gold"
                ? "text-muted-gold border-muted-gold/30 bg-transparent"
                : "text-icy-cyan border-icy-cyan/30 bg-transparent"
                }`}
            >
              {edu.score}
            </span>
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-1.5">
            {edu.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-[family-name:var(--font-ibm-plex)] text-[14px] lg:text-[15px] text-[#ECE7DD] font-normal engraved-text leading-[1.5] tracking-[0.2px]"
              >
                <span
                  className={`flex-shrink-0 mt-0.5 ${edu.accent === "gold" ? "text-muted-gold/45" : "text-icy-cyan/45"
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
