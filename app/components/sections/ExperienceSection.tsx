// ExperienceSection — Battles Fought
// Timeline-style entries with Norse runic markers

const experiences = [
  {
    id: 1,
    company: "Midgard Tech Corp",
    role: "Software Engineering Intern",
    period: "May 2024 — Aug 2024",
    location: "Remote",
    icon: "work",
    accent: "cyan",
    points: [
      "Architected a high-throughput data ingestion pipeline processing 500K events/day using Apache Kafka and Go microservices, reducing tail latency by 40%",
      "Redesigned core REST API endpoints with Redis caching strategies, cutting average response time from 800 ms to 120 ms",
      "Developed an internal analytics dashboard with Next.js and D3.js, adopted by 3 product teams within the first sprint",
      "Maintained 95%+ test coverage for critical services using Go testing + testify mocks",
    ],
    tech: ["Go", "Kafka", "Redis", "Next.js", "PostgreSQL"],
  },
  {
    id: 2,
    company: "AsgardAI Labs",
    role: "ML Research Intern",
    period: "Dec 2023 — Feb 2024",
    location: "Bangalore, IN",
    icon: "model_training",
    accent: "gold",
    points: [
      "Fine-tuned LLaMA-2 (7B) on domain-specific legal documents using QLoRA, achieving 18% improvement on downstream classification benchmarks",
      "Built a RAG pipeline with FAISS vector store and LangChain enabling semantic search over 50 K+ documents with sub-200 ms retrieval",
      "Optimised inference via INT8 quantisation, reducing GPU memory footprint by 60% with < 2% accuracy degradation",
    ],
    tech: ["Python", "PyTorch", "LangChain", "FAISS", "FastAPI"],
  },
  {
    id: 3,
    company: "Valkyrie Open Source Initiative",
    role: "Core Contributor",
    period: "Jan 2023 — Present",
    location: "Remote (Volunteer)",
    icon: "diversity_3",
    accent: "cyan",
    points: [
      "30+ merged PRs spanning performance improvements, bug fixes, and new feature implementations across multiple repositories",
      "Maintained CI/CD pipeline with GitHub Actions and Docker-based deployment for zero-downtime releases",
    ],
    tech: ["Various", "GitHub Actions", "Docker"],
  },
] as const;

export default function ExperienceSection() {
  return (
    <div className="flex flex-col gap-5 section-fade">
      {experiences.map((exp) => (
        <div key={exp.id} className={`relic-stone p-4 ${exp.accent === "cyan" ? "card-glow" : "gold-card-glow"}`}>
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-stone bg-[#0d0e10] border flex items-center justify-center ${
                exp.accent === "cyan" ? "border-rune-glow/25" : "border-muted-gold/25"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl icon-engraved ${
                  exp.accent === "cyan" ? "text-rune-glow/70" : "text-muted-gold/70"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {exp.icon}
              </span>
            </div>

            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-headline-md text-sm text-white engraved-text tracking-wider">
                    {exp.role}
                  </h3>
                  <p
                    className={`font-label-caps text-[9px] uppercase tracking-[0.2em] mt-0.5 ${
                      exp.accent === "cyan" ? "text-icy-cyan/60" : "text-muted-gold/60"
                    }`}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-label-caps text-[8px] text-on-surface-variant/45 uppercase tracking-[0.1em]">
                    {exp.period}
                  </p>
                  <p className="font-label-caps text-[8px] text-on-surface-variant/30 mt-0.5">
                    {exp.location}
                  </p>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="mt-3 flex flex-col gap-2">
                {exp.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[10px] text-on-surface-variant/70 leading-relaxed engraved-text"
                  >
                    <span
                      className={`flex-shrink-0 mt-0.5 ${
                        exp.accent === "cyan" ? "text-icy-cyan/50" : "text-muted-gold/50"
                      }`}
                    >
                      ᛗ
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {exp.tech.map((t) => (
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