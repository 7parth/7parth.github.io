// ProjectsSection — Legendary Quests
// 6 project cards with tech stack tags, descriptions, and links

const projects = [
  {
    id: 1,
    icon: "policy",
    name: "Beacon",
    subtitle: "Agentic AI Platform for Ministry of Education",
    desc: "Engineered an AI platform to retrieve, compare and audit 1000+ verified government policy documents. Integrated optimizations (caching, indexing) reducing query latency by 35%.",
    tech: ["FastAPI", "ReactJs", "LangChain", "LangGraph", "PostgreSQL"],
    github: "https://github.com/7parth/beacon-2.git",
    live: null,
    accent: "cyan",
  },
  {
    id: 2,
    icon: "route",
    name: "PathGenie",
    subtitle: "Full Stack AI Learning Path Generator",
    desc: "Developed an application generating personalized learning paths using structured topic decomposition. Designed a FastAPI service for Resume analysis and ATS scoring using MongoDB Atlas Vector Database.",
    tech: ["MERN", "LangGraph", "Python", "FastAPI", "MongoDB"],
    github: "https://github.com/7parth/PathGenie",
    live: null,
    accent: "gold",
  },
  {
    id: 3,
    icon: "menu_book",
    name: "CiteMind",
    subtitle: "Production-grade RAG System",
    desc: "Built a hybrid retrieval RAG system using Reciprocal Rank Fusion and cross-encoder reranking. Integrated NVIDIA NIM for citation-backed generation and Ragas evaluation pipeline.",
    tech: ["FastAPI", "LangChain", "NextJS", "PGVector", "Supabase"],
    github: "https://github.com/7parth/CiteMind",
    live: null,
    accent: "cyan",
  },
] as const;

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-4 section-fade">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`relic-stone p-4 ${project.accent === "cyan" ? "card-glow" : "gold-card-glow"}`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-stone bg-[#0d0e10] border flex items-center justify-center ${
                project.accent === "cyan"
                  ? "border-rune-glow/25"
                  : "border-muted-gold/25"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl icon-engraved ${
                  project.accent === "cyan"
                    ? "text-rune-glow/70"
                    : "text-muted-gold/70"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {project.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1 mb-0.5">
                <h3 className="font-headline-md text-sm text-white engraved-text tracking-wider">
                  {project.name}
                </h3>
                <div className="flex gap-1.5 flex-shrink-0">
                  <a
                    href={project.github}
                    aria-label="GitHub"
                    className="material-symbols-outlined text-base text-on-surface-variant/40 hover:text-icy-cyan transition-colors icon-engraved"
                  >
                    code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      aria-label="Live demo"
                      className="material-symbols-outlined text-base text-on-surface-variant/40 hover:text-muted-gold transition-colors icon-engraved"
                    >
                      open_in_new
                    </a>
                  )}
                </div>
              </div>
              <p
                className={`font-label-caps text-[9px] uppercase tracking-[0.18em] mb-2 ${
                  project.accent === "cyan"
                    ? "text-icy-cyan/50"
                    : "text-muted-gold/50"
                }`}
              >
                {project.subtitle}
              </p>
              <p className="font-body-md text-[10px] text-on-surface-variant/65 leading-relaxed engraved-text mb-3">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}