// ExperienceSection — Battles Fought
// Timeline-style entries with Norse runic markers

const experiences = [
  {
    id: 1,
    company: "TimeForge | Smart India Hackathon 2025",
    role: "Full-Stack Developer / Generative AI",
    period: "Aug 2025 — Dec 2025",
    location: "India, Odisha",
    icon: "work",
    accent: "cyan",
    points: [
      "Architected and deployed backend services using FastAPI to handle data ingestion and processing pipelines at scale.",
      "Web scraped, stored and Processed 1000+ verified government documents using Supabase S3 to create a reliable and searchable knowledge base.",
      "Integrated RAG pipelines with Supabase S3 and PGVector to reduce redundant document reprocessing by 40% through vector based artifact reuse.",
    ],
    tech: ["FastAPI", "Supabase S3", "PGVector", "RAG", "Python"],
  },
  {
    id: 2,
    company: "Apacs | Bajaj Finserv HackRx Hackathon 2025",
    role: "Backend Developer / Generative AI",
    period: "Jun 2025 — Jul 2025",
    location: "India, Remote",
    icon: "model_training",
    accent: "gold",
    points: [
      "Engineered a FastAPI based RAG API handling concurrent requests and failure edge cases across production workloads.",
      "Implemented an Advanced RAG using LangChain to support multiple formats (PDF, DOCX, PPTX, images) with Retrieval based query handling to improve accuracy and relevance of responses across large document sets.",
      "Integrated a cached augmented generation layer (CAG) layer and secure REST APIs with token-based authentication to reduce redundant processing, improving response time from 30s to 1s for repeated queries via CAG caching layer.",
    ],
    tech: ["FastAPI", "LangChain", "RAG", "REST APIs", "Python"],
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