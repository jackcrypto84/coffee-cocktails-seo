import Image from "next/image";

const illustrationMap = {
  brewMethod: {
    src: "/editorial/brew-method.svg",
    alt: "Editorial illustration for brew method guides",
    accent: "text-coffee",
  },
  ingredient: {
    src: "/editorial/ingredient-pairing.svg",
    alt: "Editorial illustration for ingredient pairing pages",
    accent: "text-cocktail",
  },
  flavor: {
    src: "/editorial/flavor-compass.svg",
    alt: "Editorial illustration for flavor profile pages",
    accent: "text-stone-700",
  },
  guide: {
    src: "/editorial/guide-navigator.svg",
    alt: "Editorial illustration for guide navigation pages",
    accent: "text-cocktail",
  },
} as const;

export function SectionIllustration({
  kind,
  eyebrow,
  title,
  note,
}: {
  kind: keyof typeof illustrationMap;
  eyebrow: string;
  title: string;
  note: string;
}) {
  const illustration = illustrationMap[kind];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_18px_50px_rgba(32,24,18,0.08)] backdrop-blur">
      <div className="relative aspect-[4/3] w-full">
        <Image src={illustration.src} alt={illustration.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
      </div>
      <div className="p-5">
        <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${illustration.accent}`}>{eyebrow}</div>
        <h2 className="mt-3 font-heading text-3xl text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">{note}</p>
      </div>
    </div>
  );
}
