import { Author } from "@/lib/content-types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AuthorPortrait({ author, large = false }: { author: Author; large?: boolean }) {
  const coffeeAuthor = author.role.toLowerCase().includes("coffee");
  const shell = coffeeAuthor
    ? "bg-[linear-gradient(155deg,#5d3a20_0%,#a86e40_46%,#f2d7b1_100%)]"
    : "bg-[linear-gradient(155deg,#083136_0%,#0d5c63_46%,#f3c17a_100%)]";
  const accent = coffeeAuthor ? "#f8e3c4" : "#fff1d8";
  const accentSoft = coffeeAuthor ? "rgba(248,227,196,0.18)" : "rgba(255,241,216,0.18)";

  return (
    <div className={`relative overflow-hidden rounded-[2rem] ${shell} ${large ? "aspect-[4/4.5]" : "aspect-square"}`}>
      <svg viewBox="0 0 100 110" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <circle cx="24" cy="24" r="16" fill={accentSoft} />
        <circle cx="78" cy="18" r="12" fill="rgba(255,255,255,0.12)" />
        <path d="M10 96 C 26 72, 44 78, 52 60 C 58 46, 66 38, 84 30" stroke={accent} strokeOpacity="0.72" strokeWidth="1.8" fill="none" />
        <circle cx="50" cy="42" r="18" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.26)" />
        <path d="M34 94 C 36 74, 44 66, 50 66 C 56 66, 64 74, 66 94" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.2)" />
        <rect x="18" y="14" width="26" height="18" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
        <rect x="22" y="19" width="18" height="2" rx="1" fill="rgba(255,255,255,0.45)" />
        <rect x="22" y="24" width="12" height="2" rx="1" fill="rgba(255,255,255,0.28)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">{author.role}</div>
        <div className={`mt-3 inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 ${large ? "h-14 w-14 text-lg" : "h-12 w-12 text-base"} font-semibold backdrop-blur-sm`}>
          {initials(author.name)}
        </div>
      </div>
    </div>
  );
}
