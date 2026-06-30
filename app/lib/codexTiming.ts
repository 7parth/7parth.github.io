export const CODEX_TIMELINE = {
  IDLE: 0,
  PRESS: 0.05,
  RUNE: 0.1,
  TRAVEL_START: 0.15,
  TRAVEL_MID: 0.3,
  CODEX_REACHED: 0.4,
  STONE_EXISTS: 0.45,
  FRAME_CARVES: 0.5,
  INNER_STONE: 0.6,
  HEADER: 0.7,
  DIVIDER: 0.8,
  BODY: 0.9,
  READY: 1,
} as const;

export const CODEX_DURATION = 1800;
export const CODEX_CLOSE_DURATION = 900;

export type CinematicPhase =
  | "IDLE"
  | "PRESS"
  | "RUNE"
  | "TRAVEL"
  | "SUMMON"
  | "ENGRAVE"
  | "READY"
  | "ERASE"
  | "DISSOLVE"
  | "RETURN";

export function phaseFromProgress(progress: number, direction: "open" | "close"): CinematicPhase {
  if (direction === "close") {
    if (progress > 0.9) return "ERASE";
    if (progress > 0.6) return "DISSOLVE";
    if (progress > 0.1) return "RETURN";
    return "IDLE";
  }

  if (progress < CODEX_TIMELINE.PRESS) return "IDLE";
  if (progress < CODEX_TIMELINE.RUNE) return "PRESS";
  if (progress < CODEX_TIMELINE.TRAVEL_START) return "RUNE";
  if (progress < CODEX_TIMELINE.CODEX_REACHED) return "TRAVEL";
  if (progress < CODEX_TIMELINE.INNER_STONE) return "SUMMON";
  if (progress < 0.985) return "ENGRAVE";
  return "READY";
}
