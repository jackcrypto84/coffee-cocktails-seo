import { Article } from "@/lib/content-types";

const coffeeRecipeKeywords = ["recipe", "latte", "cappuccino", "flat white", "cortado", "mocha"];

export function getArticlePath(article: Article) {
  return article.seo?.canonicalPath ?? `/${article.category}/${article.slug}`;
}

export function getMetaTitle(article: Article) {
  return article.seo?.metaTitle ?? article.title;
}

export function getMetaDescription(article: Article) {
  return article.seo?.metaDescription ?? article.description;
}

export function getSchemaType(article: Article): "Article" | "Recipe" {
  if (article.seo?.schemaType) return article.seo.schemaType;
  if (article.category === "cocktails") return "Recipe";

  const haystack = `${article.title} ${article.tags.join(" ")}`.toLowerCase();
  return coffeeRecipeKeywords.some((keyword) => haystack.includes(keyword)) ? "Recipe" : "Article";
}

export function isNoindex(article: Article) {
  return article.seo?.noindex ?? false;
}
