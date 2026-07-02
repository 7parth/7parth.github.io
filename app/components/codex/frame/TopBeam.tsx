import React from 'react';

export default function TopBeam() {
  return (
    <div className="absolute top-0 left-[160px] right-[160px] h-[160px] z-30 pointer-events-none">
      <img
        src="/codex/frame/top.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_0_8px_rgba(72,202,228,0.18)]"
      />
    </div>
  );
}
