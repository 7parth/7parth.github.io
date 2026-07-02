// SkillsSection — Weapons Mastered
// Minimalist, typography-driven skill lists


const categories = [
  {
    name: "Computer Science",
    skills: ["Python", "C/C++", "JavaScript", "SQL", "OOP", "CN", "DSA", "DBMS"],
  },
  {
    name: "Full-Stack Development",
    skills: ["FastAPI", "React.js", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    name: "AI / ML",
    skills: ["LangChain", "LangGraph", "RAG", "Machine Learning", "PyTorch", "Transformers", "NLP", "Fine Tuning"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Docker", "AWS", "Redis", "Git / GitHub"],
  },
] as const;

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-x-6 lg:gap-x-12 gap-y-8 lg:gap-y-12 h-full section-fade pt-4 pb-2">
      {categories.map((cat) => (
        <div key={cat.name} className="flex flex-col">
          {/* Category header */}
          <h3 className="font-[family-name:var(--font-cinzel)] text-[12px] lg:text-[13px] uppercase tracking-[0.2em] text-muted-gold font-medium engraved-text mb-2">
            {cat.name}
          </h3>

          {/* Engraved divider */}
          <hr className="border-t border-faded-bronze/25 w-full mb-4 lg:mb-5" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.05)" }} />

          {/* Skill list */}
          <div className="grid grid-cols-2 gap-x-3">
            {cat.skills.map((skill) => (
              <span key={skill} className="font-[family-name:var(--font-cinzel)] text-[16px] lg:text-[17px] text-[#ECE7DD] font-medium engraved-text leading-[1.8] tracking-[0.05em]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
