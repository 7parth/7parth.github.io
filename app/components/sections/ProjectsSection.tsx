// ProjectsSection — Legendary Quests
// 6 project cards with tech stack tags, descriptions, and links
import EntryMarker from "../ui/EntryMarker";

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
          className="relative pb-8 mb-2 border-b last:border-b-0 border-faded-bronze/10"
        >
          <div className="flex flex-col">
            {/* Content */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h3 className="font-[family-name:var(--font-cinzel)] text-[14px] lg:text-[15px] uppercase tracking-[0.1em] text-muted-gold font-medium flex items-center engraved-text">
                  <EntryMarker />
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
                className={`font-[family-name:var(--font-cinzel)] text-[10px] lg:text-[11px] uppercase tracking-[0.15em] mb-2 ${
                  project.accent === "cyan"
                    ? "text-icy-cyan/70"
                    : "text-muted-gold/70"
                }`}
              >
                {project.subtitle}
              </p>
              <p className="font-[family-name:var(--font-ibm-plex)] text-[13px] lg:text-[14px] text-[#ECE7DD] font-normal leading-[1.6] tracking-[0.2px] engraved-text mb-3">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag bg-transparent border border-faded-bronze/20 text-on-surface-variant/80 font-[family-name:var(--font-ibm-plex)] text-[11px] lg:text-[12px] px-2 py-1">
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