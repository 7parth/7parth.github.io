"use client";

import React from "react";
import styles from "./MagicalPathOverlay.module.css";

// ── Grid geometry (must match the CSS grid) ─────────────────────────
// The grid is 3 columns × 4 rows. Each cell occupies 1/3 of width and
// 1/4 of height. Path node centres sit at the centre of each cell.
const COLS = 3;
const ROWS = 4;
const COL_W = 100 / COLS;  // 33.33%
const ROW_H = 100 / ROWS;  // 25%

// Tile shrink factor: the tile occupies ~85% of its cell (remaining is gap).
// Raise this to 1.0 to clip all the way to the cell edge with zero gap.
const TILE_SHRINK = 0.82;

// The node centre for relic[index] = cell (col, row)
const COORDS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    x: `${(col + 0.5) * COL_W}%`,
    y: `${(row + 0.5) * ROW_H}%`,
  };
});

type Edge = { id: string; source: number; target: number };

const EDGES: Edge[] = [
  { id: "e01", source: 0, target: 1 },
  { id: "e12", source: 1, target: 2 },
  { id: "e03", source: 0, target: 3 },
  { id: "e34", source: 3, target: 4 },
  { id: "e45", source: 4, target: 5 },
  { id: "e36", source: 3, target: 6 },
  { id: "e67", source: 6, target: 7 },
  { id: "e78", source: 7, target: 8 },
  { id: "e69", source: 6, target: 9 },
  { id: "e910", source: 9, target: 10 },
  { id: "e1011", source: 10, target: 11 },
];

const PATHS_TO_NODE: Record<number, string[]> = {
  0: [],
  1: ["e01"],
  2: ["e01", "e12"],
  3: ["e03"],
  4: ["e03", "e34"],
  5: ["e03", "e34", "e45"],
  6: ["e03", "e36"],
  7: ["e03", "e36", "e67"],
  8: ["e03", "e36", "e67", "e78"],
  9: ["e03", "e36", "e69"],
  10: ["e03", "e36", "e69", "e910"],
  11: ["e03", "e36", "e69", "e910", "e1011"],
};

interface MagicalPathOverlayProps {
  hoveredRelicIndex: number | null;
  activeRelicIndex: number;
}

export default function MagicalPathOverlay({
  hoveredRelicIndex,
  activeRelicIndex,
}: MagicalPathOverlayProps) {
  const targetIndex =
    hoveredRelicIndex !== null ? hoveredRelicIndex : activeRelicIndex;
  const activeEdges =
    targetIndex !== null ? PATHS_TO_NODE[targetIndex] ?? [] : [];

  // ── Build the clip path that carves out every tile rectangle ────────
  // SVG clipPath works with an "evenodd" fill rule: start with a full-
  // canvas rect, then punch a hole for every tile. Lines that fall inside
  // a hole are invisible.
  const tileHoles = Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    // Tile centre in % units
    const cx = (col + 0.5) * COL_W;
    const cy = (row + 0.5) * ROW_H;
    // Half-dimensions of the clipped-out hole
    const hw = (COL_W / 2) * TILE_SHRINK;
    const hh = (ROW_H / 2) * TILE_SHRINK;
    return (
      <rect
        key={i}
        x={`${cx - hw}%`}
        y={`${cy - hh}%`}
        width={`${hw * 2}%`}
        height={`${hh * 2}%`}
      />
    );
  });

  return (
    <div className={styles.overlayContainer}>
      <svg
        className={styles.svgLayer}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Organic crack / root distortion */}
          <filter id="carved-crack" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/*
            ── Tile mask ──────────────────────────────────────────────
            Base white rect = everything is visible.
            Black rects = punched holes centered at each coordinate
            to mask out the relic tile areas.
          */}
          <mask id="gap-only-mask">
            {/* Full canvas visibility */}
            <rect width="100%" height="100%" fill="white" />
            {/* Punch black holes for every relic tile */}
            {COORDS.map((coord, i) => {
              // Calculate width and height of the mask hole (85% of cell width/height)
              const w = COL_W * 0.85;
              const h = ROW_H * 0.85;
              return (
                <rect
                  key={i}
                  x={`calc(${coord.x} - ${w / 2}%)`}
                  y={`calc(${coord.y} - ${h / 2}%)`}
                  width={`${w}%`}
                  height={`${h}%`}
                  fill="black"
                />
              );
            })}
          </mask>
        </defs>

        {/* All drawing is masked to the gap region only */}
        <g mask="url(#gap-only-mask)">
          {/* Base layer: dark idle carved grooves */}
          <g filter="url(#carved-crack)">
            {EDGES.map((edge) => (
              <line
                key={`base-${edge.id}`}
                x1={COORDS[edge.source].x}
                y1={COORDS[edge.source].y}
                x2={COORDS[edge.target].x}
                y2={COORDS[edge.target].y}
                className={styles.idleGroove}
              />
            ))}
          </g>

          {/* Active layer: glowing magical veins */}
          <g filter="url(#carved-crack)">
            {EDGES.map((edge) => {
              const isActive = activeEdges.includes(edge.id);
              const sequenceIndex = activeEdges.indexOf(edge.id);
              return (
                <line
                  key={`glow-${edge.id}`}
                  x1={COORDS[edge.source].x}
                  y1={COORDS[edge.source].y}
                  x2={COORDS[edge.target].x}
                  y2={COORDS[edge.target].y}
                  pathLength="100"
                  className={`${styles.activeGlow} ${isActive ? styles.illuminated : ""}`}
                  style={{
                    transitionDelay: isActive ? `${sequenceIndex * 200}ms` : "0ms",
                  }}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
