/**
 * animations.ts — Reusable Framer Motion variants
 * ─────────────────────────────────────────────────
 * Named variants used across the entire application.
 * Import and pass directly to Framer Motion components.
 *
 * All timings are designed for a AAA God-of-War feel:
 * heavy, deliberate, magical — never instant.
 */

import type { Variants } from "framer-motion";

// ── Shared easing curves ──────────────────────────────────
export const EASE_HEAVY   = [0.22, 1,    0.36, 1]   as const; // slow out, feel weighty
export const EASE_IN_HARD = [0.55, 0,    1,    0.45] as const; // fast in (stone compress)
export const EASE_OUT_GOD = [0.16, 1,    0.3,  1]    as const; // God of War menu feel

// ── fadeUp — content rises from below ─────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.42, ease: EASE_HEAVY } },
  exit:   { opacity: 0, y: -10, filter: "blur(4px)",
    transition: { duration: 0.22, ease: EASE_IN_HARD } },
};

// ── fadeDown — enters from above ──────────────────────────
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -14, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,   filter: "blur(0px)",
    transition: { duration: 0.36, ease: EASE_HEAVY } },
  exit:   { opacity: 0, y: 8,   filter: "blur(3px)",
    transition: { duration: 0.20, ease: EASE_IN_HARD } },
};

// ── fadeLeft — slides in from right ───────────────────────
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 16 },
  show:   { opacity: 1, x: 0,
    transition: { duration: 0.38, ease: EASE_HEAVY } },
  exit:   { opacity: 0, x: -12,
    transition: { duration: 0.20, ease: EASE_IN_HARD } },
};

// ── fadeRight — slides in from left ───────────────────────
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0,
    transition: { duration: 0.38, ease: EASE_HEAVY } },
  exit:   { opacity: 0, x: 12,
    transition: { duration: 0.20, ease: EASE_IN_HARD } },
};

// ── codexOpen — panel reveals with scale + blur ───────────
export const codexOpen: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
  show:   { opacity: 1, scale: 1,    filter: "blur(0px)",
    transition: { duration: 0.50, ease: EASE_HEAVY } },
  exit:   { opacity: 0, scale: 0.98, filter: "blur(3px)",
    transition: { duration: 0.24, ease: EASE_IN_HARD } },
};

// ── relicActivate — relic tile press-and-spring ───────────
export const relicActivate: Variants = {
  idle:    { scale: 1,    transition: { duration: 0.28, ease: EASE_HEAVY } },
  pressed: { scale: 0.93, transition: { duration: 0.10, ease: EASE_IN_HARD } },
  active:  { scale: 1,    transition: { duration: 0.32, ease: EASE_HEAVY } },
};

// ── energyTravel — the blue pulse between relic and codex ─
export const energyTravel: Variants = {
  hidden:  { opacity: 0, scaleX: 0, originX: 0 },
  travel:  { opacity: [0, 0.9, 0.6, 0],
    scaleX: [0, 1,   1,   1],
    transition: { duration: 0.55, ease: EASE_HEAVY, times: [0, 0.25, 0.75, 1] } },
};

// ── runePulse — icon/element brightens in two-flash pattern
export const runePulse: Variants = {
  rest:  { opacity: 1, scale: 1 },
  pulse: { opacity: [1, 0.65, 1, 0.8, 1],
    scale:   [1, 1,    1, 1,   1],
    transition: { duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0 } },
};

// ── staggerContainer — parent that staggers children ─────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show:   {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit:   {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

// ── staggerItem — individual staggered child ─────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.38, ease: EASE_HEAVY } },
  exit:   { opacity: 0, y: -6,
    transition: { duration: 0.18, ease: EASE_IN_HARD } },
};

// ── Engraving reveal — ancient stone carving sequence ─────
// Phase durations (ms): line grow 250 | sweep 350 | reveal 350
// Icon 150 | title 200 | desc 250 | glow settle 400

/** 1. Rune seed line — scales from 0 to full width at center */
export const engraveSeedLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { scaleX: 0, opacity: 0,
    transition: { duration: 0.15, ease: EASE_IN_HARD } },
};

/** 2. Sweep line — travels left→right via clip-path */
export const engraveSweep: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.25 },
  },
  exit: { opacity: 0, transition: { duration: 0.15, delay: 0 } },
};

/** 3. Stone slab reveals under the sweep (mask slides left→right) */
export const engraveSlabReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.30 },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.18, ease: EASE_IN_HARD },
  },
};

/** 4a. Icon — fades up after slab reveals */
export const engraveIcon: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.15, ease: EASE_HEAVY, delay: 0.60 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
};

/** 4b. Title — fades in with letter-spacing collapse (engraved feel) */
export const engraveTitle: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.5em", filter: "blur(4px)" },
  show: {
    opacity: 1, letterSpacing: "0.12em", filter: "blur(0px)",
    transition: { duration: 0.20, ease: EASE_HEAVY, delay: 0.72 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** 4c. Description / body — slides up */
export const engraveDesc: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(3px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.25, ease: EASE_HEAVY, delay: 0.85 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.14 } },
};

/** 4d. Rune accents — illuminate after everything settles */
export const engraveAccents: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.40, ease: EASE_HEAVY, delay: 1.0 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Sweep line glow — fades away at the very end leaving stone */
export const engraveSweepFade: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.10, delay: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.40, ease: "easeOut", delay: 0.60 } },
};
