import { articles } from "@/content/articles";
import { articleImageOverrides } from "@/content/article-images";
import { authors } from "@/content/authors";
import { brewingMethods, flavorProfiles, ingredients } from "@/content/taxonomies";
import generatedInternalLinks from "@/content/generated/internal-links.json";
import {
  buildAffiliateDisclosure,
  buildCitations,
  buildEquipmentUsed,
  buildRecipeIterationNotes,
  buildSourceReferences,
  buildTastingNotes,
  buildTestingNotes,
} from "@/lib/editorial";
import { getRecipeImageMeta } from "@/lib/recipe-images";
import { Article, Author, ContentCategory } from "@/lib/content-types";

type GeneratedArticleLink = {
  slug: string;
  href: string;
  category: ContentCategory;
  title: string;
  cluster: string;
  anchorText: string;
  reason: string;
  relationship: string;
  score: number;
  forced: boolean;
};

type GeneratedPillarLink = {
  href: string;
  title: string;
  anchorText: string;
  reason: string;
};

type GeneratedInternalLinkPlan = {
  slug: string;
  category: ContentCategory;
  cluster: string;
  relatedReadingHeading: string;
  relatedReadingIntro: string;
  contextualLinks: GeneratedArticleLink[];
  pillarLinks: GeneratedPillarLink[];
  relatedReading: GeneratedArticleLink[];
  editorialNotes: string[];
  manualOverrideUsed: boolean;
};

type ResolvedArticleLink = GeneratedArticleLink & {
  article: Article | null;
};

type ResolvedInternalLinkPlan = {
  slug: string;
  category: ContentCategory;
  cluster: string;
  relatedReadingHeading: string;
  relatedReadingIntro: string;
  contextualLinks: ResolvedArticleLink[];
  pillarLinks: GeneratedPillarLink[];
  relatedReading: ResolvedArticleLink[];
  editorialNotes: string[];
  manualOverrideUsed: boolean;
};

const generatedLinkPlans = generatedInternalLinks as GeneratedInternalLinkPlan[];

export function getPublishedArticles(category?: ContentCategory) {
  return articles
    .filter((article) => article.status === "published")
    .map(enrichArticle)
    .filter((article) => (category ? article.category === category : true))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export function getFeaturedArticles(category?: ContentCategory) {
  return getPublishedArticles(category).filter((article) => article.featured);
}

export function getArticleBySlug(category: ContentCategory, slug: string) {
  return getPublishedArticles(category).find((article) => article.slug === slug);
}

export function getAuthorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorsBySlugs(slugs?: string[]) {
  if (!slugs?.length) return [];
  return slugs.map((slug) => getAuthorBySlug(slug)).filter((author): author is Author => Boolean(author));
}

export function getArticlesByAuthor(slug: string) {
  return getPublishedArticles().filter((article) => article.authorSlug === slug);
}

export function getIngredientBySlug(slug: string) {
  return ingredients.find((item) => item.slug === slug);
}

export function getBrewingMethodBySlug(slug: string) {
  return brewingMethods.find((item) => item.slug === slug);
}

export function getFlavorProfileBySlug(slug: string) {
  return flavorProfiles.find((item) => item.slug === slug);
}

export function getInternalLinkPlan(article: Article): ResolvedInternalLinkPlan {
  const generatedPlan = generatedLinkPlans.find((item) => item.slug === article.slug && item.category === article.category);

  if (generatedPlan) {
    return {
      ...generatedPlan,
      contextualLinks: resolveArticleLinks(generatedPlan.contextualLinks),
      relatedReading: resolveArticleLinks(generatedPlan.relatedReading),
    };
  }

  const fallbackArticles = getFallbackRelatedArticles(article, 3);
  return {
    slug: article.slug,
    category: article.category,
    cluster: article.eyebrow,
    relatedReadingHeading: "Related reading",
    relatedReadingIntro: "These links are a simple fallback while the generated internal-link plan catches up.",
    contextualLinks: fallbackArticles.map((candidate) => ({
      slug: candidate.slug,
      href: `/${candidate.category}/${candidate.slug}`,
      category: candidate.category,
      title: candidate.title,
      cluster: candidate.eyebrow,
      anchorText: candidate.title,
      reason: "Fallback recommendation based on shared taxonomy overlap.",
      relationship: "fallback",
      score: 0,
      forced: false,
      article: candidate,
    })),
    pillarLinks: [
      {
        href: `/${article.category}`,
        title: article.category === "coffee" ? "Coffee Brewing Guides Hub" : "Original Cocktail Ideas Hub",
        anchorText: article.category === "coffee" ? "browse the coffee hub" : "browse the cocktail hub",
        reason: "Fallback pillar link while generated recommendations are unavailable.",
      },
    ],
    relatedReading: fallbackArticles.map((candidate) => ({
      slug: candidate.slug,
      href: `/${candidate.category}/${candidate.slug}`,
      category: candidate.category,
      title: candidate.title,
      cluster: candidate.eyebrow,
      anchorText: candidate.title,
      reason: "Fallback recommendation based on shared taxonomy overlap.",
      relationship: "fallback",
      score: 0,
      forced: false,
      article: candidate,
    })),
    editorialNotes: ["Generated internal-link plan missing. Run npm run links:sample to refresh the recommendations file."],
    manualOverrideUsed: false,
  };
}

export function getRelatedArticles(article: Article, limit = 3) {
  const resolved = getInternalLinkPlan(article).relatedReading
    .map((item) => item.article)
    .filter((item): item is Article => Boolean(item));

  if (resolved.length) {
    return resolved.slice(0, limit);
  }

  return getFallbackRelatedArticles(article, limit);
}

export function getSuggestedRelatedPages(article: Article, limit = 3) {
  return getFallbackRelatedArticles(article, limit);
}

export function getSearchIndex() {
  return getPublishedArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    href: `/${article.category}/${article.slug}`,
    tags: article.tags,
  }));
}

export const taxonomies = {
  ingredients,
  brewingMethods,
  flavorProfiles,
  authors,
};

function resolveArticleLinks(items: GeneratedArticleLink[]): ResolvedArticleLink[] {
  return items.map((item) => ({
    ...item,
    article: getArticleBySlug(item.category, item.slug) ?? null,
  }));
}

function getFallbackRelatedArticles(article: Article, limit = 3) {
  const scored = getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === article.category) score += 3;
      score += overlap(candidate.tags, article.tags) * 2;
      score += overlap(candidate.flavorProfiles, article.flavorProfiles) * 2;
      score += overlap(candidate.ingredients, article.ingredients) * 2;
      score += overlap(candidate.brewingMethods, article.brewingMethods) * 2;
      score += overlap(candidate.spiritBases, article.spiritBases) * 2;
      score += overlap(candidate.occasions, article.occasions);
      score += overlap(candidate.seasons, article.seasons);
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title));

  return scored.slice(0, limit).map(({ candidate }) => candidate);
}

function overlap(a?: string[], b?: string[]) {
  if (!a || !b) return 0;
  return a.filter((item) => b.includes(item)).length;
}

function enrichArticle(article: Article): Article {
  const merged = {
    ...article,
    ...(articleImageOverrides[article.slug] ?? {}),
  };

  return getRecipeImageMeta({
    ...merged,
    reviewedBySlugs: merged.reviewedBySlugs ?? [merged.authorSlug],
    testedBySlugs: merged.testedBySlugs ?? [merged.authorSlug],
    lastReviewedAt: merged.lastReviewedAt ?? merged.updatedAt,
    affiliateDisclosure: merged.affiliateDisclosure ?? buildAffiliateDisclosure(merged),
    testingNotes: merged.testingNotes ?? buildTestingNotes(merged),
    tastingNotes: merged.tastingNotes ?? buildTastingNotes(merged),
    equipmentUsed: merged.equipmentUsed ?? buildEquipmentUsed(merged),
    recipeIterationNotes: merged.recipeIterationNotes ?? buildRecipeIterationNotes(merged),
    sourceReferences: merged.sourceReferences ?? buildSourceReferences(merged),
    citations: merged.citations ?? buildCitations(merged),
  });
}
