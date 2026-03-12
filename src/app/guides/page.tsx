import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SectionIllustration } from "@/components/section-illustration";
import { buildMetadata } from "@/lib/seo";
import { getPublishedArticles, taxonomies } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Guides",
  description: "Editorial guide navigator for brew methods, flavor profiles, ingredient clusters, seasons, and occasions across coffee and cocktails.",
  path: "/guides",
  type: "website",
});

export default function GuidesPage() {
  const articles = getPublishedArticles();
  const seasonal = articles.filter((article) => article.seasons?.length).slice(0, 4);
  const occasion = articles.filter((article) => article.occasions?.length).slice(0, 4);
  const coffeeStarters = articles.filter((article) => article.category === "coffee").slice(0, 3);
  const cocktailStarters = articles.filter((article) => article.category === "cocktails").slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="soft-panel p-8 sm:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Editorial guide navigator</div>
          <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">Find the right cluster before you publish or read the wrong page.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            The point of this page is not to create another layer of thin SEO navigation. It is to help readers and editors move into the right cluster quickly: brew methods, flavor profiles, ingredient logic, seasons, and occasions.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            Use it when you know the kind of problem you are solving but not yet the exact article. Start from the dimension that changes the cup or glass most: method, flavor goal, base ingredient, or serving context.
          </p>
        </div>
        <SectionIllustration
          kind="guide"
          eyebrow="Guide illustration"
          title="Navigation should feel curated, not auto-generated"
          note="This page works best when it helps the reader choose the right content angle quickly, then gets out of the way instead of stacking shallow link grids."
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] bg-sand p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Start with method</div>
          <h2 className="mt-3 font-heading text-3xl text-ink">Brew method hubs</h2>
          <p className="mt-3 text-sm leading-7 text-stone-700">
            Best when the reader already knows the workflow: pour-over, espresso, or milk drinks.
          </p>
          <div className="mt-4 space-y-3">
            {taxonomies.brewingMethods.map((item) => (
              <Link key={item.slug} href={`/brewing-method/${item.slug}`} className="block rounded-[1.25rem] bg-white p-4 text-sm">
                <div className="font-semibold text-ink">{item.name}</div>
                <div className="mt-1 text-stone-600">Skill level: {item.skillLevel}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Start with flavor</div>
          <h2 className="mt-3 font-heading text-3xl text-ink">Flavor profile hubs</h2>
          <p className="mt-3 text-sm leading-7 text-stone-700">
            Best when the reader is chasing brightness, bitterness, chocolatey comfort, or floral lift.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {taxonomies.flavorProfiles.map((item) => (
              <Link key={item.slug} href={`/flavor-profile/${item.slug}`} className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-stone-700">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-stone-950 p-6 text-stone-100">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Start with ingredient</div>
          <h2 className="mt-3 font-heading text-3xl">Ingredient hubs</h2>
          <p className="mt-3 text-sm leading-7 text-stone-300">
            Best when the ingredient itself is driving the next decision: beans, gin, rye, or citrus.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {taxonomies.ingredients.map((item) => (
              <Link key={item.slug} href={`/ingredients/${item.slug}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Start with situation</div>
          <h2 className="mt-3 font-heading text-3xl text-ink">Season and occasion</h2>
          <p className="mt-3 text-sm leading-7 text-stone-700">
            Best for hosting, brunch, after-dinner drinks, or pages designed around when the reader will serve the drink.
          </p>
          <div className="mt-4 space-y-3 text-sm font-semibold text-cocktail">
            <Link href="#seasonal-picks">See seasonal picks</Link>
            <Link href="#occasion-picks">See occasion-led picks</Link>
            <Link href="/cocktails">Browse cocktail hub</Link>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">Coffee launch paths</div>
          <h2 className="mt-3 font-heading text-4xl text-ink">Best starting points for coffee readers</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            Start with these if the reader is trying to improve the cup first and only later figure out which subcluster matters most.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {coffeeStarters.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cocktail">Cocktail launch paths</div>
          <h2 className="mt-3 font-heading text-4xl text-ink">Best starting points for cocktail readers</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            Start here when the reader wants a strong original drink or a useful technique page before they choose a narrower flavor or ingredient cluster.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cocktailStarters.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div id="seasonal-picks">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Seasonal editorial paths</div>
          <h2 className="mt-3 font-heading text-4xl text-ink">Seasonal picks</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            These pages work best when timing changes the reader&apos;s search intent, not just the garnish.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {seasonal.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <div id="occasion-picks">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Occasion-led editorial paths</div>
          <h2 className="mt-3 font-heading text-4xl text-ink">Occasion-led picks</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            These are useful when service context changes what the reader needs: brunch, dinner party, holiday hosting, or weekday brewing.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {occasion.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Editorial rules for scaling</div>
        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">Fewer, better hubs</h3>
            <p className="mt-2 text-sm leading-7 text-stone-700">
              We would rather deepen a useful method or flavor cluster than spin out extra guide pages that only restate the same metadata in a new URL.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Route by reader need</h3>
            <p className="mt-2 text-sm leading-7 text-stone-700">
              Good navigation starts from the problem the reader can name: bitterness, bright citrus, milk texture, hosting, or a base spirit decision.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Publish when the hub teaches</h3>
            <p className="mt-2 text-sm leading-7 text-stone-700">
              If a cluster page cannot offer a distinct point of view, curated pathways, and a real next-step recommendation, it should stay small until the library catches up.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
