import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryVisual } from "@/components/category-visual";
import { buildMetadata } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Coffee Brewing Guides",
  description: "Browse coffee articles covering brew methods, beans, grinders, espresso, milk drinks, and troubleshooting.",
  path: "/coffee",
  type: "website",
});

export default function CoffeeHubPage() {
  const articles = getPublishedArticles("coffee");

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="soft-panel p-8 sm:p-12">
          <span className="section-label">Coffee hub</span>
          <h1 className="mt-5 font-heading text-5xl text-ink sm:text-6xl">Coffee brewing guides for people who want repeatable results.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            This hub organizes brew methods, beans, grinders, espresso, milk drinks, and troubleshooting into a structure that teaches adjustment logic instead of dumping recipes without context.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-stone-700">
            <Link href="/brewing-method/pour-over" className="rounded-full bg-sand px-4 py-2">Pour-over</Link>
            <Link href="/brewing-method/espresso" className="rounded-full bg-sand px-4 py-2">Espresso</Link>
            <Link href="/flavor-profile/chocolatey" className="rounded-full bg-sand px-4 py-2">Flavor notes</Link>
            <Link href="/ingredients/coffee-beans" className="rounded-full bg-sand px-4 py-2">Beans</Link>
          </div>
        </div>
        <CategoryVisual
          category="coffee"
          title="Dial in sweetness, clarity, and texture"
          detail="The strongest pages here are built around brewing decisions readers can actually test at home: grind, ratio, water, extraction behavior, and milk texture." 
        />
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </section>
    </div>
  );
}
