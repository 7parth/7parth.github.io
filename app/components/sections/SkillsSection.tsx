// SkillsSection — Weapons Mastered
// Categorised skill bars with animated fill and percentage readout

const categories = [
  {
    name: "Programming Languages",
    icon: "code",
    accent: "cyan",
    skills: [
      { name: "Python", level: 90 },
      { name: "C/C++", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    name: "Full-Stack Development",
    icon: "layers",
    accent: "gold",
    skills: [
      { name: "FastAPI", level: 92 },
      { name: "React.js / Next.js", level: 85 },
      { name: "Node.js / Express", level: 82 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "Supabase", level: 75 },
    ],
  },
  {
    name: "AI / ML & Agentic AI",
    icon: "psychology",
    accent: "cyan",
    skills: [
      { name: "LangChain / LangGraph", level: 90 },
      { name: "RAG & Vector DBs", level: 88 },
      { name: "Agentic AI / NLP", level: 85 },
      { name: "Fine Tuning", level: 80 },
      { name: "PyTorch / Transformers", level: 75 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "cloud",
    accent: "gold",
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS EC2", level: 75 },
      { name: "Redis", level: 70 },
      { name: "Git / GitHub", level: 85 },
      { name: "LangSmith", level: 80 },
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
