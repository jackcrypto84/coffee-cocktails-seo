type VisualCategory = "coffee" | "cocktails";

type Theme = {
  shell: string;
  label: string;
  chips: string[];
  gradientStart: string;
  gradientEnd: string;
  accent: string;
  accentSoft: string;
  line: string;
  panel: string;
};

const categoryThemes: Record<VisualCategory, Theme> = {
  coffee: {
    shell:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_40%),linear-gradient(145deg,#2f1d13_0%,#6e4527_52%,#e6c18d_100%)] text-amber-50",
    label: "Brew logic, extraction, texture",
    chips: ["pour-over", "espresso", "milk drinks"],
    gradientStart: "#f8d7a9",
    gradientEnd: "#5c3416",
    accent: "#fff0d8",
    accentSoft: "rgba(255, 240, 216, 0.22)",
    line: "rgba(255,255,255,0.2)",
    panel: "rgba(255,255,255,0.1)",
  },
  cocktails: {
    shell:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(145deg,#06292c_0%,#0d5c63_50%,#f2b868_100%)] text-teal-50",
    label: "Balance, aroma, dilution",
    chips: ["highballs", "sours", "spritzes"],
    gradientStart: "#bff5ec",
    gradientEnd: "#0d5054",
    accent: "#fff2d8",
    accentSoft: "rgba(255, 242, 216, 0.2)",
    line: "rgba(255,255,255,0.2)",
    panel: "rgba(255,255,255,0.09)",
  },
};

function hashValue(input: string) {
  return input.split("").reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
}

function buildShapeData(seed: string) {
  const hash = hashValue(seed);
  return {
    aX: 30 + (hash % 18),
    aY: 20 + ((hash >> 2) % 16),
    aR: 16 + (hash % 10),
    bX: 58 + ((hash >> 3) % 20),
    bY: 18 + ((hash >> 4) % 22),
    bR: 10 + ((hash >> 5) % 8),
    cX: 70 + ((hash >> 1) % 18),
    cY: 62 + ((hash >> 3) % 16),
    cR: 18 + ((hash >> 2) % 10),
    lineOffset: 14 + (hash % 12),
    tilt: (hash % 9) - 4,
  };
}

function ArtworkSvg({ category, seed, compact = false }: { category: VisualCategory; seed: string; compact?: boolean }) {
  const theme = categoryThemes[category];
  const shape = buildShapeData(seed);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-95">
      <defs>
        <linearGradient id={`${category}-${seed.length}-bg`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={theme.gradientStart} stopOpacity="0.34" />
          <stop offset="100%" stopColor={theme.gradientEnd} stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill={`url(#${category}-${seed.length}-bg)`} />
      <circle cx={shape.aX} cy={shape.aY} r={shape.aR} fill={theme.accentSoft} />
      <circle cx={shape.bX} cy={shape.bY} r={shape.bR} fill="rgba(255,255,255,0.12)" />
      <circle cx={shape.cX} cy={shape.cY} r={shape.cR} fill={theme.accentSoft} />
      <path d={`M8 ${64 + shape.tilt} C 26 ${48 + shape.tilt}, 46 ${74 - shape.tilt}, 62 ${56 + shape.tilt} S 88 ${48 - shape.tilt}, 98 ${58 + shape.tilt}`} stroke={theme.accent} strokeOpacity="0.72" strokeWidth={compact ? 2.4 : 1.8} fill="none" />
      <path d={`M14 ${72 + shape.tilt} C 32 ${56 + shape.tilt}, 50 ${82 - shape.tilt}, 68 ${64 + shape.tilt} S 90 ${54 - shape.tilt}, 96 ${64 + shape.tilt}`} stroke="rgba(255,255,255,0.32)" strokeWidth="1.2" fill="none" />
      <rect x="10" y="12" width="26" height="30" rx="8" fill={theme.panel} stroke={theme.line} />
      <rect x="14" y="18" width="18" height="2.5" rx="1.25" fill="rgba(255,255,255,0.52)" />
      <rect x="14" y="24" width="14" height="2.5" rx="1.25" fill="rgba(255,255,255,0.34)" />
      <rect x="14" y="30" width="10" height="2.5" rx="1.25" fill="rgba(255,255,255,0.24)" />
      {category === "coffee" ? (
        <>
          <path d={`M62 ${18 + shape.tilt} q 8 10 0 20 q -8 -10 0 -20`} fill="none" stroke={theme.accent} strokeWidth="1.8" strokeLinecap="round" />
          <path d={`M72 ${16 - shape.tilt} q 8 10 0 20 q -8 -10 0 -20`} fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="74" cy="74" r="12" fill="rgba(0,0,0,0.14)" stroke="rgba(255,255,255,0.28)" />
          <circle cx="74" cy="74" r="8" fill="none" stroke={theme.accent} strokeOpacity="0.8" />
        </>
      ) : (
        <>
          <path d={`M66 ${14 + shape.tilt} l 8 18 l -16 0 z`} fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.34)" />
          <rect x="62" y="32" width="20" height="28" rx="10" fill="rgba(0,0,0,0.14)" stroke="rgba(255,255,255,0.28)" />
          <circle cx="72" cy="66" r="12" fill="none" stroke={theme.accent} strokeOpacity="0.72" strokeWidth="1.8" />
          <circle cx="72" cy="66" r="4" fill="rgba(255,255,255,0.55)" />
        </>
      )}
      <line x1="0" y1={86 - shape.lineOffset * 0.2} x2="100" y2={86 - shape.lineOffset * 0.2} stroke="rgba(255,255,255,0.16)" />
    </svg>
  );
}

export function CategoryVisual({
  category,
  title,
  detail,
  compact = false,
}: {
  category: VisualCategory;
  title: string;
  detail: string;
  compact?: boolean;
}) {
  const theme = categoryThemes[category];
  const seed = `${title}-${detail}`;

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] ${theme.shell} ${
        compact ? "min-h-[220px] p-5" : "min-h-[320px] p-7 sm:p-8"
      }`}
    >
      <ArtworkSvg category={category} seed={seed} compact={compact} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.06)_100%)]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/70">Editorial signal</div>
          <h3 className={`mt-4 max-w-sm font-heading ${compact ? "text-3xl" : "text-4xl sm:text-5xl"}`}>{title}</h3>
          <p className={`mt-4 max-w-md ${compact ? "text-sm leading-7 text-white/78" : "text-base leading-8 text-white/82"}`}>
            {detail}
          </p>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-4">
            {theme.chips.map((chip) => (
              <div key={chip} className="rounded-[1.25rem] border border-white/15 bg-white/8 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/78">
                {chip}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/66">{theme.label}</p>
        </div>
      </div>
    </div>
  );
}

export function ArticleVisual({
  category,
  eyebrow,
  tags,
  title,
}: {
  category: VisualCategory;
  eyebrow: string;
  tags: string[];
  title: string;
}) {
  const displayTags = tags.slice(0, 3);
  const theme = categoryThemes[category];

  return (
    <div className={`relative overflow-hidden p-6 ${theme.shell}`}>
      <ArtworkSvg category={category} seed={`${title}-${tags.join("-")}`} compact />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/18" />

      <div className="relative z-10">
        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/72">{eyebrow}</div>
        <div className="mt-6 grid grid-cols-[1.3fr_0.7fr] gap-3">
          <div className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-white/58">Built around</div>
            <div className="mt-3 space-y-2">
              {displayTags.map((tag) => (
                <div key={tag} className="rounded-full border border-white/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/84">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[1.5rem] border border-white/12 bg-white/10 backdrop-blur-sm" />
            <div className="rounded-[1.5rem] border border-white/12 bg-black/15" />
            <div className="rounded-[1.5rem] border border-white/12 bg-white/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
