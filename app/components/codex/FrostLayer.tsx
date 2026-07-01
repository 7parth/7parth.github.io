import React from 'react';
import Image from 'next/image';

// Frost corners — only in the four corners, low opacity.
// Inset matches the stone layer so frost is also behind iron borders.
export default function FrostLayer() {
  return (
    <div
      className="absolute pointer-events-none mix-blend-screen"
      style={{
        top: '14%',
        bottom: '14%',
        left: '13%',
        right: '13%',
        zIndex: 2,
        opacity: 0.18,
        WebkitMaskImage: `
          radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 100% 0%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 0% 100%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 100% 100%, rgba(0,0,0,1) 0%, transparent 30%)
        `,
        maskImage: `
          radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 100% 0%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 0% 100%, rgba(0,0,0,1) 0%, transparent 30%),
          radial-gradient(ellipse at 100% 100%, rgba(0,0,0,1) 0%, transparent 30%)
        `,
        WebkitMaskComposite: 'source-over',
        maskComposite: 'add',
      }}
    >
      <Image
        src="/ui/codex/texture/frost.png"
        alt="Frost Overlay"
        fill
        className="object-cover"
      />
    </div>
  );
}
