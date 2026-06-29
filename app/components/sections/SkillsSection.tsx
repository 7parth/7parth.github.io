// SkillsSection — Weapons Mastered
// Categorised skill bars with animated fill and percentage readout

const categories = [
  {
    name: "Languages",
    icon: "code",
    accent: "cyan",
    skills: [
      { name: "C++", level: 90 },
      { name: "Python", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Go", level: 76 },
      { name: "Java", level: 70 },
      { name: "Rust", level: 52 },
    ],
  },
  {
    name: "Frameworks & Libraries",
    icon: "layers",
    accent: "gold",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Node / Express", level: 82 },
      { name: "FastAPI / Django", level: 77 },
      { name: "PyTorch / TF", level: 72 },
      { name: "LangChain", level: 66 },
    ],
  },
  {
    name: "Databases & Storage",
    icon: "storage",
    accent: "cyan",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 78 },
      { name: "Cassandra", level: 60 },
      { name: "Elasticsearch", level: 62 },
    ],
  },
  {
    name: "Infrastructure & Tools",
    icon: "settings",
    accent: "gold",
    skills: [
      { name: "Docker / K8s", level: 74 },
      { name: "Linux / Bash", level: 83 },
      { name: "GitHub Actions", level: 80 },
      { name: "AWS / GCP", level: 70 },
      { name: "Figma", level: 65 },
    ],
  },
] as const;

interface SkillBarProps {
  level: number;
  accent: string;
}

function SkillBar({ level, accent }: SkillBarProps) {
  return (
    <div className="skill-bar-track flex-1">
      <div
        className={accent === "cyan" ? "skill-bar-fill-cyan" : "skill-bar-fill-gold"}
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

export default function SkillsSection() {
  return (
    <div className="flex flex-col gap-4 section-fade">
      {categories.map((cat) => (
        <div key={cat.name} className="relic-stone p-4">
          {/* Category header */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`material-symbols-outlined text-base icon-engraved ${
                cat.accent === "cyan" ? "text-icy-cyan/70" : "text-muted-gold/70"
              }`}
            >
              {cat.icon}
            </span>
            <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-on-surface-variant engraved-text">
              {cat.name}
            </h3>
          </div>

          {/* Skill bars */}
          <div className="flex flex-col gap-3">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="font-body-md text-[11px] text-on-surface-variant/75 w-28 flex-shrink-0 engraved-text">
                  {skill.name}
                </span>
                <SkillBar level={skill.level} accent={cat.accent} />
                <span className="font-label-caps text-[9px] text-on-surface-variant/35 w-7 text-right flex-shrink-0">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
