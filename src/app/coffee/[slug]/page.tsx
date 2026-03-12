import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getArticleBySlug, getPublishedArticles } from "@/lib/content";
import { getArticlePath, getMetaDescription, getMetaTitle, isNoindex } from "@/lib/indexing";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getPublishedArticles("coffee").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("coffee", slug);

  if (!article) {
    return buildMetadata({ title: "Coffee article", description: "Coffee article", path: `/coffee/${slug}` });
  }

  return buildMetadata({
    title: getMetaTitle(article),
    description: getMetaDescription(article),
    path: getArticlePath(article),
    imagePath: article.ogImagePath,
    noindex: isNoindex(article),
  });
}

export default async function CoffeeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("coffee", slug);

  if (!article) notFound();

  return <ArticlePage article={article} />;
}
