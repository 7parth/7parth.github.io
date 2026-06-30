"use client";

import { useCallback, useState } from "react";
import type { SectionId } from "@/app/components/data";
import type { CinematicPhase } from "@/app/lib/codexTiming";

export interface RelicTransitionState {
  selectedId:        SectionId;
  pendingId:         SectionId;
  phase:             CinematicPhase;
  isTransitioning:   boolean;
  codexMounted:      boolean;
  setPhase:          (phase: CinematicPhase) => void;
  commitPending:     () => void;
  finishClose:       () => void;
  triggerTransition: (id: SectionId) => void;
  triggerClose:      () => void;
}

export function useRelicTransition(initial: SectionId): RelicTransitionState {
  const [selectedId, setSelectedId] = useState<SectionId>(initial);
  const [pendingId,  setPendingId]  = useState<SectionId>(initial);
  const [phase,      setPhase]      = useState<CinematicPhase>("IDLE");
  const [codexMounted, setCodexMounted] = useState(false);

  const triggerTransition = useCallback((id: SectionId) => {
    if (codexMounted) return;
    setPendingId(id);
    setCodexMounted(true);
  }, [codexMounted]);

  const triggerClose = useCallback(() => {
    if (phase !== "READY") return;
    setPhase("ERASE");
  }, [phase]);

  const commitPending = useCallback(() => {
    setSelectedId(pendingId);
  }, [pendingId]);

  const finishClose = useCallback(() => {
    setCodexMounted(false);
    setPhase("IDLE");
  }, []);

  return {
    selectedId,
    pendingId,
    phase,
    isTransitioning: codexMounted && phase !== "READY",
    codexMounted,
    setPhase,
    commitPending,
    finishClose,
    triggerTransition,
    triggerClose,
  };
}
