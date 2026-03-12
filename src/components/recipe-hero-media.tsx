import Image from "next/image";
import { Article } from "@/lib/content-types";

export function RecipeHeroMedia({ article }: { article: Article }) {
  const hasImage = article.visualStatus === "image-ready" || article.visualStatus === "needs-review";
  const imagePath = hasImage ? article.imagePath ?? "" : "";
  const statusLabel = hasImage ? "Hero image present" : article.visualStatus === "prompt-ready" ? "Prompt-ready, image missing" : "Needs visual brief";

  return (
    <figure className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_20px_60px_rgba(32,24,18,0.08)] backdrop-blur">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {hasImage ? (
          <Image
            src={imagePath}
            alt={article.imageAlt ?? article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#f5eee4_0%,#eadac5_58%,#d7e5e3_100%)]">
            <div className="absolute left-8 top-8 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 shadow-sm">
              {statusLabel}
            </div>
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-[0_16px_40px_rgba(32,24,18,0.08)] backdrop-blur-sm">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Fallback placeholder</div>
              <h2 className="mt-3 font-heading text-3xl text-ink">{article.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-700">This page has structured visual metadata and a generation-ready workflow, but the final hero image file has not been added yet.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
                <span className="rounded-full bg-sand px-3 py-1">{article.vesselType ?? article.glassware}</span>
                <span className="rounded-full bg-sand px-3 py-1">{article.drinkColor}</span>
                {article.hotOrIced ? <span className="rounded-full bg-sand px-3 py-1">{article.hotOrIced}</span> : null}
                {article.iceStyle ? <span className="rounded-full bg-sand px-3 py-1">{article.iceStyle}</span> : null}
              </div>
            </div>
          </div>
        )}
      </div>
      <figcaption className="border-t border-stone-200/80 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
          <span>{statusLabel}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-[0.68rem] tracking-[0.14em] text-stone-600">{article.vesselType ?? article.glassware}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-[0.68rem] tracking-[0.14em] text-stone-600">{article.drinkColor}</span>
        </div>
        <p className="mt-3 text-sm leading-7 text-stone-700">{article.imageCaption}</p>
        {!hasImage ? (
          <details className="mt-4 rounded-[1.25rem] bg-stone-50 p-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-cocktail">View generation prompt</summary>
            <p className="mt-3 text-sm leading-7 text-stone-700">{article.imagePrompt}</p>
          </details>
        ) : null}
      </figcaption>
    </figure>
  );
}
