import React from "react";

export interface CodexSectionHeaderProps {
  title: string;
}

export default function CodexSectionHeader({ title }: CodexSectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center my-10 lg:my-14">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-faded-bronze/40 to-transparent mb-4"></div>
      <h3 className="font-label-caps text-sm lg:text-base text-muted-gold uppercase tracking-[0.3em] whitespace-nowrap engraved-text">
        {title}
      </h3>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-faded-bronze/40 to-transparent mt-4"></div>
    </div>
  );
}
