import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { AuthorPortrait } from "@/components/author-portrait";
import { buildMetadata } from "@/lib/seo";
import { getArticlesByAuthor, getAuthorBySlug, taxonomies } from "@/lib/content";

export async function generateStaticParams() {
  return taxonomies.authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  return buildMetadata({
    title: author ? author.name : "Author",
    description: author ? author.bio : "Author archive",
    path: `/authors/${slug}`,
    type: "website",
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = getArticlesByAuthor(slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <AuthorPortrait author={author} large />
        <div className="soft-panel p-8 sm:p-12">
          <span className="section-label">Author</span>
          <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">{author.name}</h1>
          <p className="mt-2 text-lg text-stone-500">{author.role}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{author.bio}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {author.expertise.map((item) => (
              <span key={item} className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-stone-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)] lg:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Domain expertise</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {author.domainExpertise.map((item) => (
              <span key={item} className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 text-sm leading-7 text-stone-700">
            <p>
              <span className="font-semibold text-ink">Review focus:</span> {author.reviewFocus}
            </p>
            <p className="mt-4">
              <span className="font-semibold text-ink">Testing approach:</span> {author.testingMethodology}
            </p>
            <p className="mt-4">
              <span className="font-semibold text-ink">Disclosure:</span> {author.disclosure}
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-sand p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Credentials and editorial context</div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
            {author.credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
