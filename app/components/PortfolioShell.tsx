"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import RelicTile from "./ui/RelicTile";
import { relics, RUNES, SectionId } from "./data";
import {
  energyTravel,
} from "@/app/lib/animations";
import { useRelicTransition } from "@/app/hooks/useRelicTransition";
import CodexOverlay from "./ui/CodexOverlay";

// Section Components
import AboutSection       from "./sections/AboutSection";
import ProjectsSection    from "./sections/ProjectsSection";
import ExperienceSection  from "./sections/ExperienceSection";
import SkillsSection      from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import EducationSection   from "./sections/EducationSection";
import ResumeSection      from "./sections/ResumeSection";
import ContactSection     from "./sections/ContactSection";
import TimelineSection    from "./sections/TimelineSection";
import PlaceholderSection from "./sections/PlaceholderSection";

// ── World-reaction map ────────────────────────────────────
const WORLD_CLASSES: Record<string, string> = {
  projects:   "world-lightning",
  skills:     "world-rune",
  experience: "world-cold",
  timeline:   "world-gold",
  education:  "world-dust",
};

export default function PortfolioShell() {
  // ── Animation state machine (nav + transition phase) ──
  const {
    selectedId,
    pendingId,
    phase,
    isTransitioning,
    triggerTransition,
  } = useRelicTransition("about" as SectionId);

  // ── Codex overlay state ───────────────────────────────
  const [codexOpen, setCodexOpen] = useState(false);

  const mainRef   = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const navRef    = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLImageElement>(null);

  const activeRelic = relics.find((r) => r.id === selectedId) || relics[0];

  // ── Parallax target values (pure RAF, zero re-renders) ──
  const mouse  = useRef({ x: 0, y: 0 });
  const smooth = useRef({
    bg:   { x: 0, y: 0 },
    nav:  { x: 0, y: 0 },
    logo: { x: 0, y: 0 },
  });

  // ── Camera breathing (GSAP) ──────────────────────────────
  useEffect(() => {
    let tween: { kill: () => void } | null = null;
    import("gsap").then(({ gsap }) => {
      if (mainRef.current) {
        tween = gsap.to(mainRef.current, {
          y: -4, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut",
        }) as unknown as { kill: () => void };
      }
    }).catch(() => {});
    return () => { tween?.kill(); };
  }, []);

  // ── Multi-layer damped parallax ──────────────────────────
  useEffect(() => {
    const DAMP   = 0.045;
    const RANGES = { bg: 15, nav: 5, logo: 2 } as const;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      mouse.current.x = (e.clientX - cx) / cx;
      mouse.current.y = (e.clientY - cy) / cy;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    function tick() {
      const m = mouse.current;
      const s = smooth.current;
      for (const key of ["bg", "nav", "logo"] as const) {
        const range = RANGES[key];
        s[key].x += (m.x * range - s[key].x) * DAMP;
        s[key].y += (m.y * range - s[key].y) * DAMP;
      }
      if (bgRef.current)
        bgRef.current.style.transform = `translate(${s.bg.x}px,${s.bg.y}px) scale(1.04)`;
      if (navRef.current)
        navRef.current.style.transform = `translate(${s.nav.x}px,${s.nav.y}px)`;
      if (logoRef.current)
        logoRef.current.style.transform = `translate(${s.logo.x}px,${s.logo.y}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── GSAP stone-press on relics ───────────────────────────
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const els = document.querySelectorAll<HTMLElement>(".relic-item");
      els.forEach((el) => {
        const onDown = () => gsap.to(el, { scale: 0.93, duration: 0.08, ease: "power2.in" });
        const onUp   = () => gsap.to(el, { scale: 1,    duration: 0.28, ease: "back.out(2.2)" });
        el.addEventListener("mousedown", onDown);
        el.addEventListener("mouseup",   onUp);
        el.addEventListener("mouseleave", onUp);
        (el as HTMLElement & { _gsapCleanup?: () => void })._gsapCleanup = () => {
          el.removeEventListener("mousedown", onDown);
          el.removeEventListener("mouseup",   onUp);
          el.removeEventListener("mouseleave", onUp);
        };
      });
    }).catch(() => {});
    return () => {
      document.querySelectorAll<HTMLElement & { _gsapCleanup?: () => void }>(".relic-item")
        .forEach((el) => el._gsapCleanup?.());
    };
  }, []);

  // ── World reaction ───────────────────────────────────────
  useEffect(() => {
    const cls = WORLD_CLASSES[selectedId] ?? "";
    const root = document.documentElement;
    root.classList.remove("world-lightning","world-rune","world-cold","world-gold","world-dust");
    if (cls) root.classList.add(cls);
  }, [selectedId]);

  // ── Section content renderer ─────────────────────────────
  function renderContent() {
    switch (selectedId) {
      case "about":        return <AboutSection />;
      case "projects":     return <ProjectsSection />;
      case "experience":   return <ExperienceSection />;
      case "skills":       return <SkillsSection />;
      case "achievements": return <AchievementsSection />;
      case "education":    return <EducationSection />;
      case "resume":       return <ResumeSection />;
      case "contact":      return <ContactSection />;
      case "timeline":     return <TimelineSection />;
      case "github":       return <PlaceholderSection title="GitHub" />;
      case "linkedin":     return <PlaceholderSection title="LinkedIn" />;
      case "leetcode":     return <PlaceholderSection title="LeetCode" />;
      default:             return <PlaceholderSection title="Unknown Realm" />;
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-surface-container-lowest text-on-surface font-body-md antialiased selection:bg-rune-glow selection:text-surface">

      {/* ── Cursor ambient light ── */}
      <div ref={cursorRef} className="cursor-light" aria-hidden="true" />

      {/* ── Energy travel overlay (relic → codex) ── */}
      <AnimatePresence>
        {phase === "traveling" && (
          <motion.div
            key="energy-travel"
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 40 }}
            variants={energyTravel}
            initial="hidden"
            animate="travel"
            exit="hidden"
          >
            {/* Horizontal beam from left-center to right-center */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "28%",
                right: "10%",
                height: "2px",
                marginTop: "-1px",
                background: "linear-gradient(90deg, transparent, rgba(72,202,228,0.7) 30%, rgba(165,243,252,0.9) 60%, rgba(72,202,228,0.4) 80%, transparent)",
                boxShadow: "0 0 12px rgba(72,202,228,0.6), 0 0 24px rgba(72,202,228,0.3)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="/gow-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
          style={{ transition: "transform 0.12s linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest opacity-40" />
        <div className="absolute inset-0 world-reaction-layer pointer-events-none" />
        <div className="absolute inset-0 gold-ambient" />
        <div className="absolute inset-0 moon-ambient" />
        <div className="absolute inset-0 vignette-layer" />
        <div className="absolute inset-0 lightning-layer bg-white" />
      </div>

      {/* Global Particle Overlay */}
      <ParticleCanvas worldMode={selectedId} />

      {/* ── Header ── */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 bg-gradient-to-b from-surface-container-lowest/80 to-transparent pointer-events-none">
        <div
          ref={logoRef}
          className="flex items-center gap-4 pointer-events-auto"
          style={{ willChange: "transform" }}
        >
          <img src="/icons/omega-blue.png" alt="" aria-hidden="true" height={60} width={60} />
          <div>
            <h1 className="font-headline-lg text-2xl tracking-widest text-on-surface leading-none uppercase engraved-text">
              Parth Waradkar
            </h1>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.3em] mt-1 engraved-text">
              AI Engineer
            </p>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main ref={mainRef} className="relative z-20 w-full h-full flex items-center justify-start pt-[120px] pb-[80px] px-8">

        {/* LEFT: Wall of Relics */}
        <aside className="w-full md:w-[35%] lg:w-[30%] h-full flex flex-col pointer-events-auto z-30 px-6">
          <div
            ref={navRef}
            className="flex-1 overflow-y-auto hide-scrollbar py-4 relative"
            style={{
              background: "radial-gradient(ellipse at 40% 50%, rgba(80,180,255,0.08), transparent 70%)",
              willChange: "transform",
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              {relics.map((relic) => {
                const isActive  = selectedId === relic.id;
                // Show pending highlight during transition so relic feels "selected"
                const isPending = pendingId  === relic.id && isTransitioning;
                return (
                  <RelicTile
                    key={relic.id}
                    active={isActive || isPending}
                    onClick={() => {
                      triggerTransition(relic.id as SectionId);
                      setCodexOpen(true);
                    }}
                    title={relic.label}
                    subtitle={`${relic.sublabel[0]}\n${relic.sublabel[1]}`}
                    icon={
                      relic.iconImg ? (
                        <img
                          src={relic.iconImg}
                          alt=""
                          aria-hidden="true"
                          style={{
                            display: "block",
                            width: `${relic.iconScale ?? 1}em`,
                            height: `${relic.iconScale ?? 1}em`,
                            objectFit: "contain",
                            margin: "0 auto",
                            filter: (isActive || isPending)
                              ? "brightness(1.4) drop-shadow(0 0 4px rgba(72,202,228,0.7))"
                              : "brightness(0.85)",
                          }}
                        />
                      ) : (
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "inherit",
                            lineHeight: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "1em",
                            height: "1em",
                            fontVariationSettings: (isActive || isPending) ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          {relic.icon}
                        </span>
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </aside>

      </main>

      {/* ── Codex Overlay ── */}
      <CodexOverlay
        isOpen={codexOpen}
        sectionKey={selectedId}
        codexLabel={activeRelic.codexLabel}
        codexTitle={activeRelic.codexTitle}
        runeSymbol={activeRelic.runeSymbol}
        runes={RUNES}
        onClose={() => setCodexOpen(false)}
      >
        {renderContent()}
      </CodexOverlay>

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
