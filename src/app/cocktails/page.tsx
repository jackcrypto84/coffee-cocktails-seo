import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryVisual } from "@/components/category-visual";
import { buildMetadata } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Original Cocktail Ideas",
  description: "Browse original cocktails, classics with twists, flavor-led drink ideas, seasonal serves, and home bar technique guides.",
  path: "/cocktails",
  type: "website",
});

export default function CocktailHubPage() {
  const articles = getPublishedArticles("cocktails");

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="soft-panel p-8 sm:p-12">
          <span className="section-label">Cocktail hub</span>
          <h1 className="mt-5 font-heading text-5xl text-ink sm:text-6xl">Original cocktail ideas for a home bar that wants more than generic riffs.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            Use this hub to browse original signatures, classics with smart twists, flavor profiles, seasonal drinks, and practical home bar technique with more balance logic and less filler.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-stone-700">
            <Link href="/ingredients/gin" className="rounded-full bg-sand px-4 py-2">Gin drinks</Link>
            <Link href="/ingredients/rye-whiskey" className="rounded-full bg-sand px-4 py-2">Whiskey drinks</Link>
            <Link href="/flavor-profile/bittersweet" className="rounded-full bg-sand px-4 py-2">Bittersweet drinks</Link>
            <Link href="/guides" className="rounded-full bg-sand px-4 py-2">Occasion guides</Link>
          </div>
        </div>
        <CategoryVisual
          category="cocktails"
          title="Build drinks around flavor structure, not random novelty"
          detail="These pages are strongest when they explain aroma, sweetness, dilution, and substitution logic clearly enough for a home bartender to riff with confidence."
        />
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </section>
    </div>
  );
}
