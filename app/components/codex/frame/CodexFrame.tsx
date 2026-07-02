import React from 'react';
import FrameBeam from './FrameBeam';
import FrameCorner from './FrameCorner';

export default function CodexFrame() {
  return (
    <div className="absolute -inset-x-[9px] -inset-y-[7px] z-30 pointer-events-none">
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
