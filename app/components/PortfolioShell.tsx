"use client";

import { useEffect, useRef, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";
import RelicTile from "./ui/RelicTile";
import { relics, RUNES, SectionId } from "./data";
import { useRelicTransition } from "@/app/hooks/useRelicTransition";
import CodexCinematic from "./ui/CodexCinematic";
import MagicalPathOverlay from "./ui/MagicalPathOverlay";
import GhostWhisper from "./ui/GhostWhisper";

// Section Components
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import EducationSection from "./sections/EducationSection";
import ResumeSection from "./sections/ResumeSection";
import ContactSection from "./sections/ContactSection";
import TimelineSection from "./sections/TimelineSection";
import PlaceholderSection from "./sections/PlaceholderSection";
import LoreSection from "./sections/LoreSection";

// ── World-reaction map ────────────────────────────────────
const WORLD_CLASSES: Record<string, string> = {
  projects: "world-lightning",
  skills: "world-rune",
  experience: "world-cold",
  timeline: "world-gold",
  education: "world-dust",
};
export default function PortfolioShell() {
  // ── Single animation state machine ────────────────────────
  const {
    selectedId,
    pendingId,
    phase,
    isTransitioning,
    codexMounted,
    setPhase,
    commitPending,
    finishClose,
    triggerTransition,
    triggerClose,
  } = useRelicTransition("about" as SectionId);

  const mainRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const wallPulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [wallAwake, setWallAwake] = useState(false);
  const [hoveredRelicIndex, setHoveredRelicIndex] = useState<number | null>(null);

  const activeRelic =
    (isTransitioning ? pendingId : selectedId) === "lore"
      ? {
        id: "lore",
        codexLabel: "LORE",
        codexTitle: "THE ENGINEER'S CHRONICLE",
        loreSummary: "A tale explaining why this Codex exists, told by an unlikely storyteller.",
        icon: "menu_book",
        runeSymbol: "ᛈ",
        iconImg: "/icons/lore.png",
      }
      : relics.find((r) => r.id === (isTransitioning ? pendingId : selectedId)) || relics[0];
  const activeRelicIndex = relics.findIndex((r) => r.id === (isTransitioning ? pendingId : selectedId));

  const handleRelicClick = (id: SectionId) => {
    const clickedRelic = relics.find((r) => r.id === id);
    if (clickedRelic?.externalLink) {
      window.open(clickedRelic.externalLink, "_blank", "noopener,noreferrer");
      return;
    }

    setWallAwake(false);
    if (wallPulseTimerRef.current) clearTimeout(wallPulseTimerRef.current);
    requestAnimationFrame(() => setWallAwake(true));
    wallPulseTimerRef.current = setTimeout(() => setWallAwake(false), 2300);
    triggerTransition(id);
  };

  // ── Parallax target values (pure RAF, zero re-renders) ──
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({
    bg: { x: 0, y: 0 },
    nav: { x: 0, y: 0 },
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
    }).catch(() => { });
    return () => { tween?.kill(); };
  }, []);

  // ── Multi-layer damped parallax ──────────────────────────
  useEffect(() => {
    const DAMP = 0.045;
    const RANGES = { bg: 15, nav: 5, logo: 2 } as const;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouse.current.x = (e.clientX - cx) / cx;
      mouse.current.y = (e.clientY - cy) / cy;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
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
        const onUp = () => gsap.to(el, { scale: 1, duration: 0.28, ease: "back.out(2.2)" });
        el.addEventListener("mousedown", onDown);
        el.addEventListener("mouseup", onUp);
        el.addEventListener("mouseleave", onUp);
        (el as HTMLElement & { _gsapCleanup?: () => void })._gsapCleanup = () => {
          el.removeEventListener("mousedown", onDown);
          el.removeEventListener("mouseup", onUp);
          el.removeEventListener("mouseleave", onUp);
        };
      });
    }).catch(() => { });
    return () => {
      document.querySelectorAll<HTMLElement & { _gsapCleanup?: () => void }>(".relic-item")
        .forEach((el) => el._gsapCleanup?.());
    };
  }, []);

  // ── World reaction ───────────────────────────────────────
  useEffect(() => {
    const cls = WORLD_CLASSES[selectedId] ?? "";
    const root = document.documentElement;
    root.classList.remove("world-lightning", "world-rune", "world-cold", "world-gold", "world-dust");
    if (cls) root.classList.add(cls);
  }, [selectedId]);

  useEffect(() => {
    return () => {
      if (wallPulseTimerRef.current) clearTimeout(wallPulseTimerRef.current);
    };
  }, []);

  // ── Section content renderer ─────────────────────────────
  function renderContent() {
    switch (selectedId) {
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "experience": return <ExperienceSection />;
      case "skills": return <SkillsSection />;
      case "achievements": return <AchievementsSection />;
      case "education": return <EducationSection />;
      case "resume": return <ResumeSection />;
      case "contact": return <ContactSection />;
      case "timeline": return <TimelineSection />;
      case "lore": return <LoreSection />;
      default: return <PlaceholderSection title="Unknown Realm" />;
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-surface-container-lowest text-on-surface font-body-md antialiased selection:bg-rune-glow selection:text-surface">

      {/* ── Cursor ambient light ── */}
      <div ref={cursorRef} className="cursor-light" aria-hidden="true" />

      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="/gow-bg2.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
          style={{ transition: "transform 0.12s linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest opacity-25" />
        <div className="absolute inset-0 world-reaction-layer pointer-events-none" />
        <div className="absolute inset-0 gold-ambient" />
        <div className="absolute inset-0 moon-ambient" />
        <div className="absolute inset-0 vignette-layer" />
        <div className="absolute inset-0 lightning-layer bg-white" />
      </div>

      {/* Global Particle Overlay */}
      <ParticleCanvas worldMode={selectedId} />

      {/* ── Whisper of the Ghost — environmental lore inscription ── */}
      <GhostWhisper />

      {/* ── Header ── */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-4 md:px-6 md:py-6 bg-gradient-to-b from-surface-container-lowest/80 to-transparent pointer-events-none">
        <div
          ref={logoRef}
          className="flex items-center gap-2 md:gap-4 pointer-events-auto"
          style={{ willChange: "transform" }}
        >
          <img src="/icons/omega2.png" alt="" aria-hidden="true" className="h-10 w-10 md:h-[60px] md:w-[60px]" />
          <div>
            <h1 className="font-[family-name:var(--font-cinzel)] text-[18px] md:text-2xl tracking-widest text-on-surface leading-none uppercase engraved-text">
              Parth Waradkar
            </h1>
            <p className="font-[family-name:var(--font-cinzel)] text-[9px] md:text-xs text-on-surface-variant uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1 md:mt-1 engraved-text">
              AI Engineer
            </p>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main ref={mainRef} className="relative z-20 w-full h-full flex items-center justify-center md:justify-start pt-[60px] pb-[80px] px-2 md:pt-[80px] md:pb-[100px] md:px-8">

        {/* LEFT: Wall of Relics */}
        <aside 
          className="w-full sm:w-[80%] md:w-[60%] lg:w-[48%] xl:w-[42%] h-full flex flex-col pointer-events-auto z-30 px-2 md:px-4"
          style={{ maxWidth: "calc(95vh - 180px)" }}
        >
          <div
            ref={navRef}
            className="relic-wall-shell flex-1 pt-2 pb-2 sm:pt-4 sm:pb-4 md:pt-8 md:pb-8 relative"
            style={{
              willChange: "transform",
            }}
          >
            <MagicalPathOverlay hoveredRelicIndex={hoveredRelicIndex} activeRelicIndex={activeRelicIndex} />
            <div className={`relic-wall relative z-10 grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-6 md:h-full place-content-center ${wallAwake ? "relic-wall-awake" : ""}`}>
              {relics.map((relic, index) => {
                const isActive = selectedId === relic.id;
                // Show pending highlight during transition so relic feels "selected"
                const isPending = pendingId === relic.id && isTransitioning;
                
                const activeRow = Math.floor(activeRelicIndex / 3);
                const activeCol = activeRelicIndex % 3;
                const row = Math.floor(index / 3);
                const col = index % 3;
                const isNeighbor =
                  activeRelicIndex >= 0 &&
                  !isActive &&
                  !isPending &&
                  Math.abs(row - activeRow) + Math.abs(col - activeCol) <= 1;

                return (
                  <RelicTile
                    key={relic.id}
                    active={isActive || isPending}
                    neighbor={isNeighbor}
                    wear={(index % 4) as 0 | 1 | 2 | 3}
                    onClick={() => handleRelicClick(relic.id as SectionId)}
                    onMouseEnter={() => setHoveredRelicIndex(index)}
                    onMouseLeave={() => setHoveredRelicIndex(null)}
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
                              ? "brightness(1.16) contrast(1.08) drop-shadow(0 1px 1px rgba(0,0,0,0.9)) drop-shadow(0 0 3px rgba(72,202,228,0.36))"
                              : "brightness(0.85) contrast(1.10) saturate(0.90)",
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

      {/* ── Codex Cinematic — one progress-driven artifact summon ── */}
      {codexMounted && (
        <CodexCinematic
          phase={phase}
          sectionKey={selectedId}
          codexLabel={activeRelic.codexLabel}
          codexTitle={activeRelic.codexTitle}
          loreSummary={activeRelic.loreSummary}
          runes={RUNES}
          iconImg={activeRelic.iconImg}
          icon={activeRelic.icon}
          onPhaseChange={setPhase}
          onCommitContent={commitPending}
          onCloseRequest={triggerClose}
          onClosed={finishClose}
        >
          {renderContent()}
        </CodexCinematic>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full z-50 flex justify-center md:justify-between items-center px-4 md:px-6 py-4 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none">
        <div className="pointer-events-auto text-center md:text-left">
          <p className="font-label-caps text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] text-faded-bronze/70 engraved-text leading-tight">
            © 985 ÆSIR REALM<br className="md:hidden" /> HANDCRAFTED IN MIDGARD
          </p>
        </div>
        <div className="hidden md:flex gap-8 pointer-events-auto">
          <button onClick={() => triggerTransition("lore")} className="group flex items-center gap-2 font-[family-name:var(--font-cinzel)] text-[12px] font-bold tracking-[0.25em] text-muted-gold hover:text-icy-cyan transition-all duration-300 engraved-text gold-glow-text">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-gold group-hover:bg-icy-cyan shadow-[0_0_8px_rgba(240,195,70,0.8)] group-hover:shadow-[0_0_12px_rgba(72,202,228,0.9)] animate-pulse transition-all duration-300"></span>
            LORE
          </button>
        </div>
      </footer>
    </div>
  );
}
