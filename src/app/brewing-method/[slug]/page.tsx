import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SectionIllustration } from "@/components/section-illustration";
import { getBrewingMethodBySlug, getPublishedArticles, taxonomies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getBrewingMethodEditorial } from "@/lib/taxonomy-editorial";

export async function generateStaticParams() {
  return taxonomies.brewingMethods.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getBrewingMethodBySlug(slug);

  return buildMetadata({
    title: item ? item.name : "Brewing method",
    description: item ? item.description : "Brewing method guide",
    path: `/brewing-method/${slug}`,
    type: "website",
  });
}

export default async function BrewingMethodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = getBrewingMethodBySlug(slug);
  if (!method) notFound();

  const editorial = getBrewingMethodEditorial(slug);
  const articles = getPublishedArticles("coffee").filter((article) => article.brewingMethods?.includes(slug));
  const featured = articles.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="soft-panel p-8 sm:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">Brew method hub</div>
          <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">{method.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{method.description}</p>
          {editorial ? <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{editorial.intro}</p> : null}
          <div className="mt-6 inline-flex rounded-full bg-sand px-4 py-2 text-sm font-semibold text-stone-700">Skill level: {method.skillLevel}</div>
        </div>
        <SectionIllustration
          kind="brewMethod"
          eyebrow="Method illustration"
          title="Structured around the variables this method actually changes"
          note="This hub is meant to guide readers into grind, ratio, brew time, and workflow decisions instead of leaving them with isolated recipe fragments."
        />
      </section>

      {editorial ? (
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Why this cluster matters</div>
            <p className="mt-4 text-base leading-8 text-stone-700">{editorial.whyItMatters}</p>
            <h2 className="mt-8 font-heading text-3xl text-ink">What readers need next</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              {editorial.whatReadersNeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Curated pathways</div>
            <div className="mt-4 space-y-4">
              {editorial.recommendedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-[1.25rem] bg-stone-50 p-4 transition hover:bg-stone-100">
                  <div className="text-sm font-semibold text-ink">{item.label}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {featured.length ? (
        <section className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Best starting points</div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      {editorial?.faq.length ? (
        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">FAQ</div>
          <div className="mt-5 space-y-4">
            {editorial.faq.map((item) => (
              <details key={item.question} className="rounded-[1.25rem] bg-stone-50 p-4">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-stone-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
