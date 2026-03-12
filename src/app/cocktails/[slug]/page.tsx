import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getArticleBySlug, getPublishedArticles } from "@/lib/content";
import { getArticlePath, getMetaDescription, getMetaTitle, isNoindex } from "@/lib/indexing";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getPublishedArticles("cocktails").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("cocktails", slug);

  if (!article) {
    return buildMetadata({ title: "Cocktail article", description: "Cocktail article", path: `/cocktails/${slug}` });
  }

  return buildMetadata({
    title: getMetaTitle(article),
    description: getMetaDescription(article),
    path: getArticlePath(article),
    imagePath: article.ogImagePath,
    noindex: isNoindex(article),
  });
}

export default async function CocktailArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("cocktails", slug);

  if (!article) notFound();

  return <ArticlePage article={article} />;
}
