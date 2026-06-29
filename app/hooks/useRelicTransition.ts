/**
 * useRelicTransition.ts
 * ─────────────────────────────────────────────────────────────
 * Separates animation state from navigation state.
 *
 * State machine:
 *   idle
 *     → pressing     (relic compresses, 80ms)
 *     → traveling    (energy travels relic→codex, 300ms)
 *     → opening      (codex border flashes, content exits, 200ms)
 *     → idle         (new content enters)
 *
 * The hook exposes:
 *   selectedId     — the committed navigation ID (lags behind click)
 *   pendingId      — the ID being animated toward
 *   phase          — current animation phase
 *   isTransitioning — true while any phase is active
 *   triggerTransition(id) — call on relic click
 *
 * Sound hooks are left as data attributes / callbacks for future.
 */

"use client";

import { useState, useCallback, useRef } from "react";
import type { SectionId } from "@/app/components/data";

export type TransitionPhase = "idle" | "pressing" | "traveling" | "opening";

export interface RelicTransitionState {
  selectedId:      SectionId;
  pendingId:       SectionId;
  phase:           TransitionPhase;
  isTransitioning: boolean;
  triggerTransition: (id: SectionId) => void;
}

// Timing constants (ms) — tuned for 500–700ms total feel
const T_PRESS   =  90;  // relic compress
const T_TRAVEL  = 280;  // energy shoots across
const T_OPEN    = 160;  // codex border flash + content exit

export function useRelicTransition(initial: SectionId): RelicTransitionState {
  const [selectedId,  setSelectedId]  = useState<SectionId>(initial);
  const [pendingId,   setPendingId]   = useState<SectionId>(initial);
  const [phase,       setPhase]       = useState<TransitionPhase>("idle");

  // Prevent overlap if user clicks rapidly
  const lockRef = useRef(false);

  const triggerTransition = useCallback((id: SectionId) => {
    // Same section or already transitioning — ignore
    if (id === selectedId || lockRef.current) return;

    lockRef.current = true;
    setPendingId(id);

    // Phase 1 — relic compress
    setPhase("pressing");

    setTimeout(() => {
      // Phase 2 — energy travels
      setPhase("traveling");

      setTimeout(() => {
        // Phase 3 — codex opens, content commits
        setPhase("opening");
        setSelectedId(id);   // commit nav; content exit/enter now driven by Framer

        setTimeout(() => {
          setPhase("idle");
          lockRef.current = false;
        }, T_OPEN);
      }, T_TRAVEL);
    }, T_PRESS);
  }, [selectedId]);

  return {
    selectedId,
    pendingId,
    phase,
    isTransitioning: phase !== "idle",
    triggerTransition,
  };
}
