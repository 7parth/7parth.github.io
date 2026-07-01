import React from 'react';

// ISSUES 1, 2, 5, 6:
// Stone is inset so it sits EXACTLY behind the iron borders of the frame.
// The frame's opaque metal masks the stone edges — they read as one artifact.
// Reduced contrast gradients so texture is secondary to content.
// Deep inset shadow creates recessed, carved depth.
export default function StoneLayer() {
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        // Inset matches the inner transparent window of frame.png (1536x1024 asset).
        // 14% vertical, 13% horizontal keeps stone fully behind iron borders.
        top: '14%',
        bottom: '14%',
        left: '13%',
        right: '13%',
        zIndex: 1,
        backgroundImage: `
          url('/ui/codex/texture/basalt.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Depth: recessed stone, ambient occlusion, subtle bevel at top
        boxShadow: `
          inset 0 0 60px 20px rgba(0,0,0,0.70),
          inset 0 8px 24px rgba(0,0,0,0.75),
          inset 0 -8px 24px rgba(0,0,0,0.60),
          inset 4px 0 16px rgba(0,0,0,0.50),
          inset -4px 0 16px rgba(0,0,0,0.50)
        `,
        // Reduce crack/texture contrast with a dark overlay
        filter: 'brightness(0.55) contrast(0.85)',
      }}
    />
  );
}
