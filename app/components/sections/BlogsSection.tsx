// BlogsSection — Sage's Journal
// List of blog articles with read times and external links

const blogs = [
  {
    id: 1,
    title: "Understanding Distributed Systems in C++",
    date: "Dec 12, 2024",
    readTime: "8 min read",
    url: "#",
    accent: "cyan",
  },
  {
    id: 2,
    title: "Fine-Tuning LLaMA-2 for Legal Tech",
    date: "Nov 05, 2024",
    readTime: "12 min read",
    url: "#",
    accent: "gold",
  },
  {
    id: 3,
    title: "The Art of Writing Interpreters in Go",
    date: "Sep 28, 2024",
    readTime: "10 min read",
    url: "#",
    accent: "cyan",
  },
  {
    id: 4,
    title: "Optimising React Context with CRDTs",
    date: "Aug 15, 2024",
    readTime: "6 min read",
    url: "#",
    accent: "gold",
  },
] as const;

export default function BlogsSection() {
  return (
    <div className="flex flex-col gap-3 section-fade">
      {blogs.map((blog) => (
        <a
          key={blog.id}
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relic-stone p-4 flex flex-col gap-2 group transition-all duration-300 ${
            blog.accent === "gold" ? "hover:border-muted-gold/40 hover:shadow-[0_0_15px_rgba(176,141,87,0.15)]" : "hover:border-icy-cyan/40 hover:shadow-[0_0_15px_rgba(165,243,252,0.15)]"
          }`}
        >
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-headline-md text-sm text-white engraved-text tracking-wide group-hover:text-surface-tint transition-colors">
              {blog.title}
            </h3>
            <span
              className={`material-symbols-outlined text-lg icon-engraved ${
                blog.accent === "gold" ? "text-muted-gold/50 group-hover:text-muted-gold" : "text-icy-cyan/50 group-hover:text-icy-cyan"
              } transition-colors`}
            >
              open_in_new
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-on-surface-variant/40">
                calendar_today
              </span>
              <span className="font-label-caps text-[9px] text-on-surface-variant/50 tracking-[0.1em]">
                {blog.date}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-on-surface-variant/20" />
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-on-surface-variant/40">
                schedule
              </span>
              <span className="font-label-caps text-[9px] text-on-surface-variant/50 tracking-[0.1em]">
                {blog.readTime}
              </span>
            </div>
          </div>
        </a>
      ))}
      <a
        href="#"
        className="shimmer-btn mt-2 w-full py-3 bg-[#1a1c1e] border border-[#2a2a2a] rounded flex items-center justify-center gap-2 hover:border-surface-tint/50 transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <span className="shimmer-layer" />
        <span className="font-label-caps text-surface-tint/80 text-[10px] uppercase tracking-[0.2em] engraved-text">
          View All Archives
        </span>
        <span className="material-symbols-outlined text-surface-tint/80 text-sm icon-engraved">
          arrow_forward
        </span>
      </a>
    </div>
  );
}
