import React from 'react';
import FrameBeam from './FrameBeam';
import FrameCorner from './FrameCorner';

export default function CodexFrame() {
  return (
    <div 
      className="absolute z-30 pointer-events-none"
      style={{
        top: 'var(--fc-out-y)',
        bottom: 'var(--fc-out-y)',
        left: 'var(--fc-out-x)',
        right: 'var(--fc-out-x)',
      }}
    >
      <FrameBeam orientation="top" />
      <FrameBeam orientation="bottom" />
      <FrameBeam orientation="left" />
      <FrameBeam orientation="right" />
      
      <FrameCorner position="tl" />
      <FrameCorner position="tr" />
      <FrameCorner position="bl" />
      <FrameCorner position="br" />
    </div>
  );
}
