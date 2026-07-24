import React from 'react';

export interface FrameCornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

export default function FrameCorner({ position }: FrameCornerProps) {
  const containerClasses = [
    'absolute z-30 pointer-events-none',
    position === 'tl' ? 'top-0 left-0' : '',
    position === 'tr' ? 'top-0 right-0 scale-x-[-1]' : '',
    position === 'bl' ? 'bottom-0 left-0 scale-y-[-1]' : '',
    position === 'br' ? 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} style={{ width: 'var(--fc-size)', height: 'var(--fc-size)' }}>
      <img
        src="/ui/codex/frames/corner-tl.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill"
      />
    </div>  
  );
}
