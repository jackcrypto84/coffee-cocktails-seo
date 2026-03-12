import Link from "next/link";
import { ArticleVisual } from "@/components/category-visual";
import { Article } from "@/lib/content-types";

export function ArticleCard({ article }: { article: Article }) {
  const accentTone = article.category === "coffee" ? "text-coffee" : "text-cocktail";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-[0_18px_50px_rgba(32,24,18,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(32,24,18,0.12)]">
      <ArticleVisual category={article.category} eyebrow={article.eyebrow} tags={article.tags} title={article.title} />
      <div className="flex flex-1 flex-col p-6">
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${accentTone}`}>{article.category}</span>
        <h3 className="mt-3 font-heading text-2xl leading-tight text-ink">
          <Link href={`/${article.category}/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">{article.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-stone-500">
          <div className="rounded-[1rem] bg-stone-50 px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-400">Read time</div>
            <div className="mt-1 font-semibold text-stone-700">{article.readTime}</div>
          </div>
          <div className="rounded-[1rem] bg-stone-50 px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-400">Updated</div>
            <div className="mt-1 font-semibold text-stone-700">{article.updatedAt}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
