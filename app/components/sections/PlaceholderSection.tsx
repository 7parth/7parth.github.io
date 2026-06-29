export default function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 section-fade text-center gap-4">
      <span
        className="material-symbols-outlined text-5xl text-on-surface-variant/30 icon-engraved"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        hourglass_empty
      </span>
      <div className="space-y-2">
        <h3 className="font-headline-md text-base text-white/80 engraved-text tracking-widest uppercase">
          {title}
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant/50 engraved-text max-w-xs mx-auto leading-relaxed">
          The records for this realm are still being inscribed by the scribes of Midgard. Return soon.
        </p>
      </div>
    </div>
  );
}
