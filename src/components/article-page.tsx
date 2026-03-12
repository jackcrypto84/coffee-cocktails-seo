import Link from "next/link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { AuthorPortrait } from "@/components/author-portrait";
import { Citations } from "@/components/citations";
import { EquipmentUsed } from "@/components/equipment-used";
import { JsonLd } from "@/components/json-ld";
import { RecipeHeroMedia } from "@/components/recipe-hero-media";
import { RecipeIterationNotes } from "@/components/recipe-iteration-notes";
import { SourceReferences } from "@/components/source-references";
import { TastingNotes } from "@/components/tasting-notes";
import { TestingNotes } from "@/components/testing-notes";
import { getAuthorBySlug, getAuthorsBySlugs, getIngredientBySlug, getInternalLinkPlan } from "@/lib/content";
import { getArticlePath, getMetaDescription, getMetaTitle, getSchemaType } from "@/lib/indexing";
import { Article } from "@/lib/content-types";
import { absoluteUrl } from "@/lib/seo";

export function ArticlePage({ article }: { article: Article }) {
  const author = getAuthorBySlug(article.authorSlug);
  const reviewers = getAuthorsBySlugs(article.reviewedBySlugs);
  const testers = getAuthorsBySlugs(article.testedBySlugs);
  const internalLinkPlan = getInternalLinkPlan(article);
  const breadcrumbItems = [
    { name: "Home", item: absoluteUrl("/") },
    { name: article.category === "coffee" ? "Coffee" : "Cocktails", item: absoluteUrl(`/${article.category}`) },
    { name: article.title, item: absoluteUrl(getArticlePath(article)) },
  ];

  const schemaType = getSchemaType(article);
  const recipeIngredients = (article.ingredients ?? []).map((slug) => getIngredientBySlug(slug)?.name ?? slug);
  const recipeInstructions = article.sections
    .filter((section) => section.type === "steps")
    .flatMap((section) => section.items)
    .map((item) => ({ "@type": "HowToStep", text: item }));

  const articleSchema = schemaType === "Recipe"
    ? {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: getMetaTitle(article),
        description: getMetaDescription(article),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        image: absoluteUrl(article.ogImagePath ?? `/${article.category}/${article.slug}/opengraph-image`),
        author: author ? { "@type": "Person", name: author.name } : undefined,
        mainEntityOfPage: absoluteUrl(getArticlePath(article)),
        recipeCategory: article.category === "coffee" ? "Coffee recipe" : "Cocktail recipe",
        recipeIngredient: recipeIngredients.length ? recipeIngredients : undefined,
        keywords: article.tags.join(", "),
        recipeInstructions: recipeInstructions.length ? recipeInstructions : undefined,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: getMetaTitle(article),
        description: getMetaDescription(article),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        image: absoluteUrl(article.ogImagePath ?? `/${article.category}/${article.slug}/opengraph-image`),
        author: author ? { "@type": "Person", name: author.name } : undefined,
        mainEntityOfPage: absoluteUrl(getArticlePath(article)),
      };

  const faqSchema = article.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />
      <article className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div>
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="soft-panel p-8 sm:p-12">
              <span className="section-label">{article.eyebrow}</span>
              <h1 className="mt-5 max-w-4xl font-heading text-4xl leading-tight text-ink sm:text-6xl">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{article.heroKicker}</p>
              <div className="mt-8 grid gap-3 text-sm text-stone-500 sm:grid-cols-2">
                <span>Published {article.publishedAt}</span>
                <span>Updated {article.updatedAt}</span>
                <span>Reviewed {article.lastReviewedAt}</span>
                <span>{article.readTime}</span>
                {author ? <Link href={`/authors/${author.slug}`}>Written by {author.name}</Link> : null}
                {reviewers.length ? <span>Reviewed by {reviewers.map((item) => item.name).join(", ")}</span> : null}
                {testers.length ? <span>Tested by {testers.map((item) => item.name).join(", ")}</span> : null}
              </div>
            </div>
            <RecipeHeroMedia article={article} />
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">Why trust this page</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm leading-7 text-emerald-950">
                  This article includes named authorship, review metadata, testing notes, source references, and recipe-image metadata for fact-sensitive sections and visual production.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-cocktail">
                <Link href="/editorial-policy">Editorial policy</Link>
                <Link href="/testing-methodology">Testing methodology</Link>
                <Link href="/corrections-policy">Corrections policy</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Human verification notes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-950">
              {article.verificationNotes.map((note) => (
                <li key={note}>[Human verification required] {note}</li>
              ))}
              {article.needsImageGeneration ? <li>[Image generation required] Add a recipe-accurate hero image file at {article.imagePath}.</li> : null}
              {article.visualValidationIssues?.map((issue) => <li key={issue}>[Visual review] {issue}</li>)}
            </ul>
          </div>

          <div className="prose prose-stone mt-8 max-w-none rounded-[2.5rem] bg-white p-8 shadow-[0_20px_60px_rgba(32,24,18,0.08)] sm:p-12">
            {article.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-stone-700">
                {paragraph}
              </p>
            ))}

            {article.sections.map((section) => (
              <section key={section.title} className="mt-10">
                <h2 className="font-heading text-3xl text-ink">{section.title}</h2>
                {section.type === "paragraphs"
                  ? section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-8 text-stone-700">
                        {paragraph}
                      </p>
                    ))
                  : null}
                {section.type === "steps" ? (
                  <>
                    {section.intro ? <p className="mt-4 text-base leading-8 text-stone-700">{section.intro}</p> : null}
                    <ol className="mt-5 space-y-4 pl-5 text-base leading-8 text-stone-700">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </>
                ) : null}
                {section.type === "checklist" ? (
                  <ul className="mt-5 space-y-4 pl-5 text-base leading-8 text-stone-700">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {article.comparison ? (
              <section className="mt-12 rounded-[2rem] border border-stone-200 bg-stone-50 p-6">
                <h2 className="font-heading text-3xl text-ink">{article.comparison.title}</h2>
                <p className="mt-3 text-base leading-8 text-stone-700">{article.comparison.intro}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {article.comparison.items.map((item) => (
                    <div key={item.label} className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-semibold text-ink">{item.label}</h3>
                      <p className="mt-2 text-sm font-semibold text-stone-500">Best for: {item.bestFor}</p>
                      <p className="mt-3 text-sm leading-7 text-stone-700">{item.why}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {article.featuredProducts?.length ? (
              <section className="mt-12 rounded-[2rem] bg-stone-950 p-6 text-stone-100">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Featured products</div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {article.featuredProducts.map((product) => (
                    <div key={product.name} className="rounded-[1.5rem] border border-stone-800 bg-stone-900 p-5">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="mt-2 text-sm text-stone-400">
                        {product.category} - Best for {product.bestFor}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-stone-300">{product.notes}</p>
                      <button className="mt-4 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-stone-950">
                        {product.affiliateLabel}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {article.testingNotes ? <TestingNotes notes={article.testingNotes} /> : null}
            {article.tastingNotes ? <TastingNotes notes={article.tastingNotes} /> : null}
            {article.equipmentUsed?.length ? <EquipmentUsed items={article.equipmentUsed} /> : null}
            {article.recipeIterationNotes?.length ? <RecipeIterationNotes items={article.recipeIterationNotes} /> : null}
            {article.citations?.length ? <Citations citations={article.citations} /> : null}
            {article.sourceReferences?.length ? <SourceReferences references={article.sourceReferences} /> : null}
            {article.affiliateDisclosure ? <AffiliateDisclosure disclosure={article.affiliateDisclosure} /> : null}

            {article.faq.length ? (
              <section className="mt-12">
                <h2 className="font-heading text-3xl text-ink">FAQ</h2>
                <div className="mt-6 space-y-4">
                  {article.faq.map((item) => (
                    <details key={item.question} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                      <summary className="cursor-pointer list-none text-lg font-semibold text-ink">{item.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-stone-700">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <aside className="mt-8 space-y-6 lg:mt-0">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Drink image metadata</div>
            <p className="mt-3 text-sm font-semibold text-cocktail">Status: {article.visualStatus}</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              {article.glassware ? <p><span className="font-semibold text-ink">Glassware:</span> {article.glassware}</p> : null}
              {article.vesselType ? <p><span className="font-semibold text-ink">Vessel:</span> {article.vesselType}</p> : null}
              {article.garnish ? <p><span className="font-semibold text-ink">Garnish:</span> {article.garnish}</p> : null}
              <p><span className="font-semibold text-ink">Drink color:</span> {article.drinkColor}</p>
              {article.iceStyle ? <p><span className="font-semibold text-ink">Ice style:</span> {article.iceStyle}</p> : null}
              {article.hotOrIced ? <p><span className="font-semibold text-ink">Hot or iced:</span> {article.hotOrIced}</p> : null}
              {article.foamTexture ? <p><span className="font-semibold text-ink">Foam texture:</span> {article.foamTexture}</p> : null}
              {article.milkTexture ? <p><span className="font-semibold text-ink">Milk texture:</span> {article.milkTexture}</p> : null}
              {article.layeringNotes ? <p><span className="font-semibold text-ink">Layering notes:</span> {article.layeringNotes}</p> : null}
              <p><span className="font-semibold text-ink">Mood:</span> {article.settingMood}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.styleTags?.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-stone-700">{tag}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Internal linking engine</div>
            <h2 className="mt-3 font-heading text-2xl text-ink">Explore next</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-stone-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {internalLinkPlan.contextualLinks.map((item) => (
                <Link key={item.slug} href={item.href} className="block rounded-[1.25rem] border border-stone-200 p-4 transition hover:border-stone-300">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{item.relationship}</div>
                  <div className="mt-2 text-base font-semibold text-ink">{item.anchorText}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.reason}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Pillar pages</div>
            <div className="mt-4 space-y-4">
              {internalLinkPlan.pillarLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-[1.25rem] bg-stone-50 p-4 transition hover:bg-stone-100">
                  <div className="text-sm font-semibold text-ink">{item.anchorText}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.reason}</p>
                </Link>
              ))}
            </div>
          </div>

          {internalLinkPlan.editorialNotes.length ? (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Editorial notes</div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                {internalLinkPlan.editorialNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {author ? (
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_50px_rgba(32,24,18,0.08)]">
              <AuthorPortrait author={author} />
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Author</div>
                <h2 className="mt-3 font-heading text-2xl text-ink">{author.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{author.role}</p>
                <p className="mt-4 text-sm leading-7 text-stone-700">{author.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {author.domainExpertise.map((item) => (
                    <span key={item} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-stone-700">
                      {item}
                    </span>
                  ))}
                </div>
                <Link href={`/authors/${author.slug}`} className="mt-4 inline-block text-sm font-semibold text-cocktail">
                  View author page
                </Link>
              </div>
            </div>
          ) : null}
        </aside>
      </article>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Related reading</div>
            <h2 className="mt-3 font-heading text-4xl text-ink">{internalLinkPlan.relatedReadingHeading}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600">{internalLinkPlan.relatedReadingIntro}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {internalLinkPlan.relatedReading.map((item) => (
            <Link key={item.slug} href={item.href} className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(32,24,18,0.08)] transition hover:-translate-y-0.5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{item.cluster}</div>
              <h3 className="mt-3 font-heading text-2xl text-ink">{item.anchorText}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.reason}</p>
              {item.article ? <p className="mt-4 text-sm font-semibold text-cocktail">{item.article.title}</p> : null}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
