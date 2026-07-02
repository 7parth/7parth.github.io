/**
 * RelicTile
 * ─────────────────────────────────────────────────────────────
 * Reusable navigation tile for the God of War themed portfolio.
 *
 * State machine: idle → hover → pressed → active
 * All animation is CSS-driven (see RelicTile.module.css).
 * Sound hooks: data-sound attributes — attach audio externally.
 *
 * Layer order (z-index):
 *   1  stone background image  (.stone)
 *   2  frost overlay           (.frost)
 *   3  CSS radial glow         (.glow)
 *   4  content                 (.content)  ← icon / title / subtitle
 *   5  particle slot           (.particles) ← empty; future use
 * ─────────────────────────────────────────────────────────────
 */

import React from "react";
import styles from "./RelicTile.module.css";

export interface RelicTileProps {
  /** Icon — any ReactNode. Works with Material Symbols spans and Lucide icons. */
  icon: React.ReactNode;
  /** Primary label. Rendered uppercase. */
  title: string;
  /** Two-line Norse subtitle. Rendered uppercase, muted. */
  subtitle: string;
  /** Whether this tile is the currently selected section. */
  active?: boolean;
  /** Whether this tile is close enough to catch reflected magic from the selected relic. */
  neighbor?: boolean;
  /** Small deterministic material variation. */
  wear?: 0 | 1 | 2 | 3;
  /** Click handler. */
  onClick?: () => void;
  /** Hover events for path tracking */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** Optional custom class name */
  className?: string;
}

const RelicTile = React.memo(function RelicTile({
  icon,
  title,
  subtitle,
  active = false,
  neighbor = false,
  wear = 0,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: RelicTileProps) {
  const tileClass = [
    styles.tile,
    "relic-item",           // keeps GSAP stone-press targeting working
    active ? styles.tileActive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="button"
      aria-pressed={active}
      aria-label={`Navigate to ${title}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={tileClass}
      data-neighbor={neighbor ? "true" : undefined}
      data-wear={wear}
      // ── Sound-ready hooks ──────────────────────────────────
      // Attach audio in a future useSound() hook or event listener.
      // hover  → stone scrape  (attach to onMouseEnter)
      // click  → stone impact  (attach to onClick)
      data-sound={active ? undefined : "click"}
    >
      {/* ── Layer 1: Stone background images ── */}
      <span className={`${styles.stone} ${styles.stoneIdle}`}   aria-hidden="true" />
      <span className={`${styles.stone} ${styles.stoneHover}`}  aria-hidden="true" />
      <span className={`${styles.stone} ${styles.stoneActive}`} aria-hidden="true" />

      {/* ── Layer 2: Frost overlay ── */}
      <span className={styles.frost} aria-hidden="true" />
      <span className={styles.wear} aria-hidden="true" />
      <span className={styles.cracks} aria-hidden="true" />
      <span className={styles.innerLight} aria-hidden="true" />
      <span className={styles.frostVeins} aria-hidden="true" />

      {/* ── Layer 3: CSS radial glow + adjacent spill ── */}
      <span className={styles.glow}      aria-hidden="true" />
      <span className={styles.spillGlow} aria-hidden="true" />

      {/* ── Active-only overlays ── */}
      {active && (
        <>
          {/* Inner gradient wash */}
          <span className={styles.activeOverlay} aria-hidden="true" />
          {/* Frost shimmer sweep */}
          <span className={styles.frostSweep}    aria-hidden="true" />
          <span className={styles.awakenedDust}  aria-hidden="true" />
        </>
      )}

      {/* ── Layer 4: Content ── */}
      <span className={styles.content}>
        {/* Icon — 40px, centered. Accepts Material Symbols spans or Lucide components */}
        <span
          className={styles.icon}
          aria-hidden="true"
          data-sound="hover"
        >
          {icon}
        </span>

        {/* Title */}
        <span className={styles.title}>
          {title}
        </span>

        {/* Subtitle — two lines max */}
        <span className={styles.subtitle}>
          {subtitle}
        </span>
      </span>

      {/* ── Layer 5: Particle slot (future) ── */}
      {/*
        To add particles, mount a canvas or div here:
        <canvas className={styles.particles} data-layer="particles" />
      */}
      <span className={styles.particles} aria-hidden="true" />
    </button>
  );
});

export default RelicTile;
