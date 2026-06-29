// PhotographySection — Visions Across the Realms
// Grid of photos with hover overlays

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=600&auto=format&fit=crop",
    title: "Vanaheim Forests",
    accent: "gold",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
    title: "Midgard Peaks",
    accent: "cyan",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=600&auto=format&fit=crop",
    title: "Jotunheim Frost",
    accent: "cyan",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506744012022-30d8f070624d?q=80&w=600&auto=format&fit=crop",
    title: "Alfheim Light",
    accent: "gold",
  },
] as const;

export default function PhotographySection() {
  return (
    <div className="grid grid-cols-2 gap-3 section-fade">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`group relative overflow-hidden rounded-stone border ${
            photo.accent === "gold" ? "border-muted-gold/20" : "border-icy-cyan/20"
          } aspect-square`}
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${photo.url})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-3 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span
              className={`material-symbols-outlined text-base icon-engraved mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ${
                photo.accent === "gold" ? "text-muted-gold" : "text-icy-cyan"
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              photo_camera
            </span>
            <h3 className="font-headline-md text-xs text-white engraved-text tracking-wider">
              {photo.title}
            </h3>
          </div>
        </div>
      ))}
      <div className="col-span-2 mt-2 text-center">
        <p className="font-body-md text-[10px] text-on-surface-variant/50 engraved-text italic">
          "The eye captures what the soul remembers."
        </p>
      </div>
    </div>
  );
}
