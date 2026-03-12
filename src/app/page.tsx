import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryVisual } from "@/components/category-visual";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedArticles, getPublishedArticles, taxonomies } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Grounded & Stirred",
  description: "Coffee brewing guides and original cocktail ideas with strong taxonomy, SEO structure, and editorial controls.",
  path: "/",
  type: "website",
});

export default function Home() {
  const coffee = getFeaturedArticles("coffee");
  const cocktails = getFeaturedArticles("cocktails");
  const latest = getPublishedArticles().slice(0, 4);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="hero-grid grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="soft-panel p-8 sm:p-10">
            <span className="section-label">Search-led editorial system</span>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-tight text-ink sm:text-7xl">
              Coffee brewing guides and original cocktails with real point of view.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
              Grounded & Stirred is built for useful search traffic, but it is designed like a serious enthusiast publication: stronger visuals, tighter taxonomy, named expertise, and articles that feel tested instead of padded.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/coffee" className="rounded-full bg-coffee px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(112,76,45,0.25)]">
                Explore coffee guides
              </Link>
              <Link href="/cocktails" className="rounded-full bg-cocktail px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(13,92,99,0.24)]">
                Explore cocktail ideas
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] bg-stone-50 p-5">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-stone-400">Coverage</div>
                <div className="mt-2 text-2xl font-semibold text-ink">Coffee + cocktails</div>
                <p className="mt-2 text-sm leading-6 text-stone-600">Two adjacent niches with distinct editorial voice and monetization paths.</p>
              </div>
              <div className="rounded-[1.5rem] bg-stone-50 p-5">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-stone-400">Trust</div>
                <div className="mt-2 text-2xl font-semibold text-ink">Named review layer</div>
                <p className="mt-2 text-sm leading-6 text-stone-600">Reviewed-by, tested-by, citations, and correction policy are visible on-page.</p>
              </div>
              <div className="rounded-[1.5rem] bg-stone-50 p-5">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-stone-400">System</div>
                <div className="mt-2 text-2xl font-semibold text-ink">Programmatic with guardrails</div>
                <p className="mt-2 text-sm leading-6 text-stone-600">Scaled hubs only publish when they clear usefulness and uniqueness thresholds.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <CategoryVisual
              category="coffee"
              title="Coffee that teaches adjustment, not just recipes"
              detail="Brew method hubs, troubleshooting, grinders, water, extraction, and milk texture are all organized to help readers actually dial in better cups."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <CategoryVisual
                category="cocktails"
                compact
                title="Cocktails built around flavor logic"
                detail="Original drinks explain dilution, sweetness, aroma, and why the combination earns its place."
              />
              <div className="soft-panel p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Quick routes</div>
                <div className="mt-5 space-y-3">
                  <Link href="/brewing-method/pour-over" className="block rounded-[1.25rem] bg-sand px-4 py-4 text-sm font-semibold text-ink">Pour-over recipes and fixes</Link>
                  <Link href="/ingredients/gin" className="block rounded-[1.25rem] bg-stone-950 px-4 py-4 text-sm font-semibold text-white">Spirit-led cocktail pages</Link>
                  <Link href="/flavor-profile/citrus-forward" className="block rounded-[1.25rem] border border-stone-200 px-4 py-4 text-sm font-semibold text-ink">Flavor profile hubs</Link>
                  <Link href="/guides" className="block rounded-[1.25rem] border border-stone-200 px-4 py-4 text-sm font-semibold text-ink">Seasonal and occasion guides</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">Coffee hub</div>
                <h2 className="mt-3 font-heading text-4xl text-ink">Brew with more confidence</h2>
              </div>
              <Link href="/coffee" className="text-sm font-semibold text-coffee">See all</Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {coffee.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
          </div>
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cocktail">Cocktail hub</div>
                <h2 className="mt-3 font-heading text-4xl text-ink">Original drinks with structure</h2>
              </div>
              <Link href="/cocktails" className="text-sm font-semibold text-cocktail">See all</Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {cocktails.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="soft-panel p-8 sm:p-10">
          <span className="section-label">Taxonomy pathways</span>
          <h2 className="mt-4 font-heading text-4xl text-ink">Editorial hubs that make the site easier to explore</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {taxonomies.brewingMethods.map((item) => (
              <Link key={item.slug} href={`/brewing-method/${item.slug}`} className="rounded-[1.5rem] bg-sand p-5 transition hover:-translate-y-0.5">
                <div className="text-sm font-semibold text-ink">{item.name}</div>
                <p className="mt-2 text-sm leading-7 text-stone-700">{item.description}</p>
              </Link>
            ))}
            {taxonomies.flavorProfiles.slice(0, 2).map((item) => (
              <Link key={item.slug} href={`/flavor-profile/${item.slug}`} className="rounded-[1.5rem] border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5">
                <div className="text-sm font-semibold text-ink">{item.name}</div>
                <p className="mt-2 text-sm leading-7 text-stone-700">{item.description}</p>
              </Link>
            ))}
            {taxonomies.ingredients.slice(0, 1).map((item) => (
              <Link key={item.slug} href={`/ingredients/${item.slug}`} className="rounded-[1.5rem] bg-stone-950 p-5 text-stone-100 transition hover:-translate-y-0.5">
                <div className="text-sm font-semibold">{item.name}</div>
                <p className="mt-2 text-sm leading-7 text-stone-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Latest updates</div>
            <h2 className="mt-3 font-heading text-4xl text-ink">Fresh examples in the system</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-cocktail">Use site search</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latest.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>
    </div>
  );
}
