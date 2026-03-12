import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";
import { getArticleBySlug, getPublishedArticles } from "@/lib/content";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getPublishedArticles("cocktails").map((article) => ({ slug: article.slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("cocktails", slug);

  return buildOgImage({
    category: "cocktails",
    title: article?.title ?? "Cocktail guide",
    description: article?.description ?? "Original cocktail guide from Grounded & Stirred.",
  });
}
