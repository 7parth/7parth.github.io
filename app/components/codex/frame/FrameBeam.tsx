import React from 'react';

export interface FrameBeamProps {
  orientation: 'top' | 'bottom' | 'left' | 'right';
}

export default function FrameBeam({ orientation }: FrameBeamProps) {
  const isHorizontal = orientation === 'top' || orientation === 'bottom';

  const containerClasses = [
    'absolute z-30 pointer-events-none',
    isHorizontal ? 'left-[160px] right-[160px] h-[117px]' : 'top-[160px] bottom-[160px] w-[210px]',
    orientation === 'top' ? 'top-[-30px]' : '',
    orientation === 'bottom' ? 'bottom-[-30px] scale-y-[-1]' : '',
    orientation === 'left' ? 'left-[-59px]' : '',
    orientation === 'right' ? 'right-[-59px] scale-x-[-1]' : '',
  ].filter(Boolean).join(' ');

  const src = isHorizontal ? '/ui/codex/frames/top.png' : '/ui/codex/frames/left.png';

  return (
    <div className={containerClasses}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill"
      />
    </div>
  );
}
