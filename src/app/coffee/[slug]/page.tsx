import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getArticleBySlug, getPublishedArticles } from "@/lib/content";
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
    title: article.title,
    description: article.description,
    path: `/coffee/${article.slug}`,
    imagePath: article.ogImagePath,
  });
}

export default async function CoffeeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("coffee", slug);

  if (!article) notFound();

  return <ArticlePage article={article} />;
}
