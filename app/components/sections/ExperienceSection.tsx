// ExperienceSection — Battles Fought
// Timeline-style entries with Norse runic markers
import EntryMarker from "../ui/EntryMarker";

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
    <div className="flex flex-col gap-8 section-fade">
      {experiences.map((exp) => (
        <div key={exp.id} className="relative pb-10 mb-2 border-b last:border-b-0 border-faded-bronze/10">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <div>
                <h3 className="font-headline-md text-lg lg:text-xl text-white/90 engraved-text tracking-wider flex items-center">
                  <EntryMarker />
                  {exp.role}
                </h3>
                  <p
                    className={`font-label-caps text-[10px] lg:text-xs uppercase tracking-[0.2em] mt-1 lg:mt-2 ${
                      exp.accent === "cyan" ? "text-icy-cyan/70" : "text-muted-gold/70"
                    }`}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="text-left lg:text-right flex-shrink-0">
                  <p className="font-label-caps text-[9px] lg:text-[10px] text-on-surface-variant/60 uppercase tracking-[0.1em]">
                    {exp.period}
                  </p>
                  <p className="font-label-caps text-[9px] lg:text-[10px] text-on-surface-variant/40 mt-1">
                    {exp.location}
                  </p>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="mt-5 flex flex-col gap-3">
                {exp.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-xs lg:text-sm text-on-surface-variant/80 leading-relaxed engraved-text"
                  >
                    <span
                      className={`flex-shrink-0 mt-0.5 text-base ${
                        exp.accent === "cyan" ? "text-icy-cyan/60" : "text-muted-gold/60"
                      }`}
                    >
                      ᛗ
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-5 lg:mt-6">
                {exp.tech.map((t) => (
                  <span key={t} className="tech-tag bg-transparent border border-faded-bronze/20 text-on-surface-variant/80 text-[9px] lg:text-[10px] px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
      ))}
    </div>
  );
}