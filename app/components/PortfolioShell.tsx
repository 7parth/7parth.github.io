"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import ShaderBackground from "./ShaderBackground";
import { relics, RUNES, BG_URL, SectionId } from "./data";

// Section Components
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import EducationSection from "./sections/EducationSection";
import ResumeSection from "./sections/ResumeSection";
import BlogsSection from "./sections/BlogsSection";
import ContactSection from "./sections/ContactSection";
import CertificatesSection from "./sections/CertificatesSection";
import PhotographySection from "./sections/PhotographySection";
import TimelineSection from "./sections/TimelineSection";
import PlaceholderSection from "./sections/PlaceholderSection";

export default function PortfolioShell() {
  const [activeId, setActiveId] = useState<SectionId>("about");
  const mainRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  
  const activeRelic = relics.find((r) => r.id === activeId) || relics[0];

  // GSAP ambient camera breathing (matches Stitch design)
  useEffect(() => {
    let tween: { kill: () => void } | null = null;
    import("gsap").then(({ gsap }) => {
      if (mainRef.current) {
        tween = gsap.to(mainRef.current, {
          y: -10, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut",
        }) as unknown as { kill: () => void };
      }
    }).catch(() => {});
    return () => { tween?.kill(); };
  }, []);

  // Mouse parallax for the center background layer
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setParallax({
        x: ((e.clientX - cx) / cx) * 10,
        y: ((e.clientY - cy) / cy) * 6,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // GSAP stone-press interaction on relics (spec: heavy stone press + tiny shake)
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const relicEls = document.querySelectorAll<HTMLElement>(".relic-item");
      relicEls.forEach((el) => {
        const onDown = () => gsap.to(el, { scale: 0.93, duration: 0.08, ease: "power2.in" });
        const onUp = () => gsap.to(el, { scale: 1, duration: 0.25, ease: "back.out(2)" });
        el.addEventListener("mousedown", onDown);
        el.addEventListener("mouseup", onUp);
        el.addEventListener("mouseleave", onUp);
        (el as HTMLElement & { _gsapCleanup?: () => void })._gsapCleanup = () => {
          el.removeEventListener("mousedown", onDown);
          el.removeEventListener("mouseup", onUp);
          el.removeEventListener("mouseleave", onUp);
        };
      });
    }).catch(() => {});
    return () => {
      document.querySelectorAll<HTMLElement & { _gsapCleanup?: () => void }>(".relic-item")
        .forEach((el) => el._gsapCleanup?.());
    };
  }, []);

  function renderContent() {
    switch (activeId) {
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "experience": return <ExperienceSection />;
      case "skills": return <SkillsSection />;
      case "achievements": return <AchievementsSection />;
      case "education": return <EducationSection />;
      case "resume": return <ResumeSection />;
      case "blogs": return <BlogsSection />;
      case "contact": return <ContactSection />;
      case "certificates": return <CertificatesSection />;
      case "photography": return <PhotographySection />;
      case "timeline": return <TimelineSection />;
      case "github": return <PlaceholderSection title="GitHub" />;
      case "linkedin": return <PlaceholderSection title="LinkedIn" />;
      case "leetcode": return <PlaceholderSection title="LeetCode" />;
      default: return <PlaceholderSection title="Unknown Realm" />;
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-surface-container-lowest text-on-surface font-body-md antialiased selection:bg-rune-glow selection:text-surface">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* WebGL animated mist shader (from Stitch design) */}
        <ShaderBackground />
        {/* Cinematic Norse backdrop — mix-blend-overlay at 70% per Stitch evolution design */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
          style={{
            backgroundImage: `url(${BG_URL})`,
            transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.04)`,
            transition: "transform 0.15s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest opacity-40" />
      </div>

      {/* Global Particle Overlay */}
      <ParticleCanvas />

      {/* Top App Bar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 bg-gradient-to-b from-surface-container-lowest/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <span 
            className="material-symbols-outlined text-[48px] text-error/80 icon-engraved" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            change_history
          </span>
          <div>
            <h1 className="font-headline-lg text-2xl tracking-widest text-on-surface leading-none uppercase engraved-text">
              KRATOS' CODEX
            </h1>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.3em] mt-1 engraved-text">
              CHRONICLES OF A WARRIOR
            </p>
          </div>
        </div>

        {/* Quote / Decorative Element */}
        <div className="hidden lg:block text-center pointer-events-auto">
          <p className="font-body-md text-on-surface-variant italic engraved-text">
            "The past is not where you<br/>live, it is what you learn."
          </p>
          <p className="font-label-caps text-rune-glow/80 mt-2 tracking-widest uppercase text-xs">
            - Kratos
          </p>
        </div>
        <div className="w-32 hidden lg:block" />
      </header>

      {/* Main Layout Container */}
      <main ref={mainRef} className="relative z-20 w-full h-full flex flex-col md:flex-row pt-[120px] pb-[80px]">
        
        {/* LEFT: Wall of Relics */}
        <aside className="w-full md:w-[35%] lg:w-[30%] h-full flex flex-col pointer-events-auto z-30 px-4">
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 heavy-stone-bg rounded-r-xl border-l-0">
            <div className="grid grid-cols-3 gap-3">
              {relics.map((relic) => {
                const isActive = activeId === relic.id;
                return (
                  <button
                    key={relic.id}
                    onClick={() => setActiveId(relic.id)}
                    className={`relic-item relic-stone frost-border group relative aspect-square flex flex-col items-center justify-center p-2 rounded-stone transition-all duration-300 ${
                      isActive 
                        ? "relic-active" 
                        : "text-on-surface-variant hover:text-icy-cyan"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-stone opacity-50 pointer-events-none" />
                    )}
                    <span 
                      className={`material-symbols-outlined text-3xl xl:text-4xl mb-2 icon-engraved ${
                        isActive ? "text-rune-glow rune-glow-text" : ""
                      }`}
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {relic.icon}
                    </span>
                    <span className={`font-label-caps text-[9px] xl:text-[10px] uppercase text-center w-full truncate tracking-widest mt-1 ${
                      isActive ? "text-white" : ""
                    }`}>
                      {relic.label}
                    </span>
                    <span className={`font-label-caps text-[7px] xl:text-[8px] uppercase text-center w-full truncate tracking-widest ${
                      isActive ? "text-rune-glow/70" : "text-on-surface-variant/50 group-hover:text-icy-cyan/50"
                    }`}>
                      {relic.sublabel[0]}<br/>{relic.sublabel[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER: Living World */}
        <section className="flex-1 hidden md:flex items-end justify-center relative pointer-events-none pb-10">
          <div className="flex items-center gap-8 text-rune-glow/60 opacity-80 mb-4">
            <span className="material-symbols-outlined text-3xl rune-glow-text">change_history</span>
            <span className="material-symbols-outlined text-3xl">circle</span>
            <span className="material-symbols-outlined text-3xl">close</span>
            <span className="material-symbols-outlined text-3xl">square</span>
          </div>
        </section>

        {/* RIGHT: Hanging Codex */}
        <aside className="w-full md:w-[40%] lg:w-[35%] h-full flex items-center justify-center px-6 pointer-events-auto z-30">
          <div className="relative w-full max-w-lg h-[95%] codex-tablet flex flex-col">
            
            {/* Heavy Chains */}
            <div className="absolute -top-[60px] left-8 w-3 h-[80px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1NSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48L3N2Zz4=')] opacity-80" />
            <div className="absolute -top-[60px] right-8 w-3 h-[80px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1NSIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NCIgc3Ryb2tlLXdpZHRoPSIyIiByeD0iNSIgcnk9IjUiLz48L3N2Zz4=')] opacity-80" />
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#555] rounded-tl" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#555] rounded-tr" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#555] rounded-bl" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#555] rounded-br" />

            {/* Inner Codex Area */}
            <div className="m-4 p-5 lg:p-8 flex flex-col h-full overflow-hidden codex-inner-border bg-surface-container-low/80 backdrop-blur-md">
              
              {/* Codex Header */}
              <div className="text-center mb-6 lg:mb-8 relative flex-shrink-0 border-b border-faded-bronze/30 pb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId + "-header"}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <p className="font-label-caps text-muted-gold tracking-[0.3em] uppercase text-xs mb-2 lg:mb-3 engraved-text">
                      {activeRelic.codexLabel}
                    </p>
                    <h2 className="font-headline-lg text-2xl lg:text-[40px] text-rune-glow rune-glow-text uppercase tracking-widest mb-3 lg:mb-4">
                      {activeRelic.codexTitle}
                    </h2>
                    
                    {/* Runic Divider with line brackets */}
                    <div className="flex items-center justify-center gap-3 text-icy-cyan/60 text-xs tracking-[0.5em] mb-3 lg:mb-4">
                      <span className="material-symbols-outlined text-sm text-icy-cyan/40">remove</span>
                      {RUNES.map((r, i) => <span key={i}>{r}</span>)}
                      <span className="material-symbols-outlined text-sm text-icy-cyan/40">remove</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Centered ornament diamond at bottom border */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-faded-bronze/60 bg-surface-container-highest flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-muted-gold text-lg icon-engraved">
                    {activeRelic.runeSymbol}
                  </span>
                </div>
              </div>

              {/* Codex Body */}
              <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 relative z-10 pb-12 pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Bottom fading edge */}
              <div className="absolute bottom-4 left-0 w-full h-12 bg-gradient-to-t from-surface-container-low to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="font-label-caps text-[10px] tracking-[0.2em] text-faded-bronze/70 engraved-text">
            © 985 ÆSIR REALM - HANDCRAFTED IN MIDGARD
          </p>
        </div>
        <div className="hidden md:flex gap-8 pointer-events-auto">
          <a className="font-label-caps text-[10px] tracking-[0.2em] text-on-surface-variant/60 hover:text-muted-gold transition-colors engraved-text" href="#">LORE</a>
          <a className="font-label-caps text-[10px] tracking-[0.2em] text-on-surface-variant/60 hover:text-muted-gold transition-colors engraved-text" href="#">TERMS OF SERVICE</a>
          <a className="font-label-caps text-[10px] tracking-[0.2em] text-on-surface-variant/60 hover:text-muted-gold transition-colors engraved-text" href="#">RUNIC HELP</a>
        </div>
      </footer>
    </div>
  );
}
