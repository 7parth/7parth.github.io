import React from 'react';
import Image from 'next/image';

// ISSUE 1: Frame glow reduced — softer cyan, narrower spread.
// The frame supports content, it does not dominate it.
export default function FrameLayer() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <Image
        src="/ui/codex/frame/frame.png"
        alt="Codex Frame"
        fill
        className="object-contain drop-shadow-[0_0_8px_rgba(72,202,228,0.18)]"
        priority
      />
    </div>
  );
}
