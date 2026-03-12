import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SectionIllustration } from "@/components/section-illustration";
import { getFlavorProfileBySlug, getPublishedArticles, taxonomies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatAppliesTo, getFlavorProfileEditorial } from "@/lib/taxonomy-editorial";

export async function generateStaticParams() {
  return taxonomies.flavorProfiles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getFlavorProfileBySlug(slug);

  return buildMetadata({
    title: item ? item.name : "Flavor profile",
    description: item ? item.description : "Flavor profile guide",
    path: `/flavor-profile/${slug}`,
    type: "website",
  });
}

export default async function FlavorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getFlavorProfileBySlug(slug);
  if (!profile) notFound();

  const editorial = getFlavorProfileEditorial(slug);
  const articles = getPublishedArticles().filter((article) => article.flavorProfiles?.includes(slug) || article.beanNotes?.includes(slug));
  const featured = articles.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="soft-panel p-8 sm:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Flavor profile hub</div>
          <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">{profile.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{profile.description}</p>
          <p className="mt-4 text-sm font-semibold text-stone-500">Applies to: {formatAppliesTo(profile.appliesTo)}</p>
          {editorial ? <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{editorial.intro}</p> : null}
        </div>
        <SectionIllustration
          kind="flavor"
          eyebrow="Flavor illustration"
          title="A flavor page should help readers steer taste, not just label it"
          note="These hubs work best when they connect flavor language to brew choices, pairing decisions, and the kind of drinks or coffees that actually express the profile clearly."
        />
      </section>

      {editorial ? (
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Why this profile matters</div>
            <p className="mt-4 text-base leading-8 text-stone-700">{editorial.whyItMatters}</p>
            <h2 className="mt-8 font-heading text-3xl text-ink">What a strong page in this cluster should do</h2>
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
