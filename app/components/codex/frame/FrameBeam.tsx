import React from 'react';

export interface FrameBeamProps {
  orientation: 'top' | 'bottom' | 'left' | 'right';
}

export default function FrameBeam({ orientation }: FrameBeamProps) {
  const isHorizontal = orientation === 'top' || orientation === 'bottom';

  const containerClasses = [
    'absolute z-30 pointer-events-none',
    orientation === 'bottom' ? 'scale-y-[-1]' : '',
    orientation === 'right' ? 'scale-x-[-1]' : '',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = isHorizontal ? {
    left: 'var(--fb-h-inset)',
    right: 'var(--fb-h-inset)',
    height: 'var(--fb-h-thick)',
    ...(orientation === 'top' ? { top: 'var(--fb-h-shift)' } : { bottom: 'var(--fb-h-shift)' })
  } : {
    top: 'var(--fb-v-inset)',
    bottom: 'var(--fb-v-inset)',
    width: 'var(--fb-v-thick)',
    ...(orientation === 'left' ? { left: 'var(--fb-v-shift)' } : { right: 'var(--fb-v-shift)' })
  };

  const src = isHorizontal ? '/ui/codex/frames/top.png' : '/ui/codex/frames/left.png';

  return (
    <div className={containerClasses} style={style}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill"
      />
    </div>
  );
}
