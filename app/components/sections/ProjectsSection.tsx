// ProjectsSection — Legendary Quests
// 6 project cards with tech stack tags, descriptions, and links

const projects = [
  {
    id: 1,
    icon: "storage",
    name: "RealmsDB",
    subtitle: "Distributed Database Engine",
    desc: "A high-performance distributed key-value store in C++ featuring consistent hashing, Raft consensus, and write-ahead logging for fault tolerance at scale.",
    tech: ["C++", "Raft", "gRPC", "CMake"],
    github: "#",
    live: null,
    accent: "cyan",
  },
  {
    id: 2,
    icon: "psychology",
    name: "SpartanAI",
    subtitle: "Combat Strategy Predictor",
    desc: "ML pipeline analyzing game-state data to predict optimal combat strategies using transformer-based sequence models and reinforcement learning fine-tuning.",
    tech: ["Python", "PyTorch", "HuggingFace", "FastAPI"],
    github: "#",
    live: "#",
    accent: "gold",
  },
  {
    id: 3,
    icon: "store",
    name: "ValhallaMart",
    subtitle: "Full-Stack Marketplace",
    desc: "E-commerce platform with real-time inventory, Razorpay payments, Redis caching, and a microservices architecture handling 10k+ concurrent users.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    github: "#",
    live: "#",
    accent: "cyan",
  },
  {
    id: 4,
    icon: "terminal",
    name: "RuneScript",
    subtitle: "Programming Language",
    desc: "A dynamically-typed interpreted language with its own lexer, parser, and tree-walking interpreter. Supports closures, first-class functions, and a REPL.",
    tech: ["Go", "LLVM", "ANTLR"],
    github: "#",
    live: null,
    accent: "gold",
  },
  {
    id: 5,
    icon: "sync",
    name: "FrostSync",
    subtitle: "Collaborative Code Editor",
    desc: "Real-time collaborative editor using CRDTs for operational transformation, WebSocket rooms, and Monaco Editor. Supports 50+ concurrent editors per room.",
    tech: ["TypeScript", "WebSockets", "React", "Express"],
    github: "#",
    live: "#",
    accent: "cyan",
  },
  {
    id: 6,
    icon: "smart_toy",
    name: "OdinBot",
    subtitle: "Discord Community Bot",
    desc: "Feature-rich Discord bot with slash commands, LLM-powered Q&A, contest reminders from Codeforces & LeetCode, role management, and an analytics dashboard.",
    tech: ["Python", "discord.py", "MongoDB", "OpenAI"],
    github: "#",
    live: null,
    accent: "gold",
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
