import React from 'react';
import Image from 'next/image';

// Watermark also inset to match the stone surface.
// soft-light blend + blur = engraved into stone, not pasted on top.
export default function WatermarkLayer() {
  return (
    <div
      className="absolute pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        top: '14%',
        bottom: '14%',
        left: '13%',
        right: '13%',
        zIndex: 3,
      }}
    >
      <div
        className="relative w-[60%] h-[60%] mix-blend-soft-light"
        style={{ opacity: 0.05, filter: 'blur(1px)' }}
      >
        <Image
          src="/ui/codex/watermarks/experience.png"
          alt="Watermark"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
