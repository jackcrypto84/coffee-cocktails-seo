import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";
import { getArticleBySlug, getPublishedArticles } from "@/lib/content";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getPublishedArticles("coffee").map((article) => ({ slug: article.slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("coffee", slug);

  return buildOgImage({
    category: "coffee",
    title: article?.title ?? "Coffee guide",
    description: article?.description ?? "Coffee brewing guide from Grounded & Stirred.",
  });
}
