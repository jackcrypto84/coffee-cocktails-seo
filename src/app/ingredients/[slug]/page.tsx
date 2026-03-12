import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SectionIllustration } from "@/components/section-illustration";
import { getIngredientBySlug, getPublishedArticles, taxonomies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getIngredientEditorial } from "@/lib/taxonomy-editorial";

export async function generateStaticParams() {
  return taxonomies.ingredients.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getIngredientBySlug(slug);

  return buildMetadata({
    title: item ? item.name : "Ingredient",
    description: item ? item.description : "Ingredient guide",
    path: `/ingredients/${slug}`,
    type: "website",
  });
}

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();

  const editorial = getIngredientEditorial(slug);
  const articles = getPublishedArticles().filter((article) => article.ingredients?.includes(slug));
  const featured = articles.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="soft-panel p-8 sm:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Ingredient hub</div>
          <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">{ingredient.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{ingredient.description}</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{ingredient.angle}</p>
          {editorial ? <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{editorial.intro}</p> : null}
        </div>
        <SectionIllustration
          kind="ingredient"
          eyebrow="Pairing illustration"
          title="Ingredient pages should help the reader combine, not just categorize"
          note="The useful version of this cluster explains what the ingredient changes in flavor, aroma, or structure, then routes readers to pages that build on that logic."
        />
      </section>

      {editorial ? (
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Why this ingredient matters</div>
            <p className="mt-4 text-base leading-8 text-stone-700">{editorial.whyItMatters}</p>
            <h2 className="mt-8 font-heading text-3xl text-ink">What the cluster still needs</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              {editorial.whatReadersNeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Curated recommendations</div>
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
