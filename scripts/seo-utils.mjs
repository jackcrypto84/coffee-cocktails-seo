import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content");
const LIB_DIR = path.join(ROOT, "src", "lib");
const SEO_OUTPUT_DIR = path.join(ROOT, "content", "seo");

const STATIC_ROUTES = [
  {
    path: "/",
    title: "Grounded & Stirred",
    description: "Coffee brewing guides and original cocktail ideas with strong taxonomy, SEO structure, and editorial controls.",
    schema: "WebSite",
  },
  {
    path: "/coffee",
    title: "Coffee Brewing Guides",
    description: "Browse coffee articles covering brew methods, beans, grinders, espresso, milk drinks, and troubleshooting.",
    schema: "CollectionPage",
  },
  {
    path: "/cocktails",
    title: "Original Cocktail Ideas",
    description: "Browse original cocktails, classics with twists, flavor-led drink ideas, seasonal serves, and home bar technique guides.",
    schema: "CollectionPage",
  },
  {
    path: "/guides",
    title: "Guides",
    description: "Browse editorial guide pathways for coffee brewing and original cocktails.",
    schema: "CollectionPage",
  },
  {
    path: "/search",
    title: "Search",
    description: "Search the Grounded & Stirred archive by topic, ingredient, method, and flavor profile.",
    schema: "WebPage",
  },
  {
    path: "/affiliate-disclosure",
    title: "Affiliate Disclosure",
    description: "Learn how Grounded & Stirred handles affiliate relationships and editorial independence.",
    schema: "WebPage",
  },
  {
    path: "/editorial-policy",
    title: "Editorial Policy",
    description: "Read the editorial standards that guide publishing, testing, attribution, and corrections on Grounded & Stirred.",
    schema: "WebPage",
  },
  {
    path: "/corrections-policy",
    title: "Corrections Policy",
    description: "See how factual corrections and updates are handled across the Grounded & Stirred archive.",
    schema: "WebPage",
  },
  {
    path: "/testing-methodology",
    title: "Testing Methodology",
    description: "How the site approaches brewing tests, cocktail iteration, tasting notes, and practical validation.",
    schema: "WebPage",
  },
];

function stripTypeScript(source) {
  return source
    .replace(/^import[\s\S]*?from\s+.+?;\r?\n/gm, "")
    .replace(/export const (\w+)\s*:\s*[^=]+=/g, "const $1 =")
    .replace(/export const (\w+)\s*=/g, "const $1 =")
    .replace(/\sas const/g, "")
    .trim();
}

function loadTsExports(filePath, exportNames) {
  const source = fs.readFileSync(filePath, "utf8");
  const executable = `${stripTypeScript(source)}\nreturn { ${exportNames.join(", ")} };`;
  return new Function(executable)();
}

export function loadSiteConfig() {
  return loadTsExports(path.join(LIB_DIR, "site.ts"), ["siteConfig"]).siteConfig;
}

export function loadArticles() {
  return loadTsExports(path.join(CONTENT_DIR, "articles.ts"), ["articles"]).articles;
}

export function loadAuthors() {
  return loadTsExports(path.join(CONTENT_DIR, "authors.ts"), ["authors"]).authors;
}

export function loadTaxonomies() {
  return loadTsExports(path.join(CONTENT_DIR, "taxonomies.ts"), ["ingredients", "brewingMethods", "flavorProfiles"]);
}

export function loadArticleImageOverrides() {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "article-images.json"), "utf8"));
}

export function loadInternalLinkPlans() {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "generated", "internal-links.json"), "utf8"));
}

export function getCanonicalPath(article) {
  return article.seo?.canonicalPath ?? `/${article.category}/${article.slug}`;
}

export function getMetaTitle(article) {
  return article.seo?.metaTitle ?? article.title;
}

export function getMetaDescription(article) {
  return article.seo?.metaDescription ?? article.description;
}

export function getSchemaType(article) {
  if (article.seo?.schemaType) return article.seo.schemaType;
  if (article.category === "cocktails") return "Recipe";
  const haystack = `${article.title} ${(article.tags ?? []).join(" ")}`.toLowerCase();
  return /(recipe|latte|cappuccino|flat white|cortado|mocha)/.test(haystack) ? "Recipe" : "Article";
}

export function isNoindex(article) {
  return article.seo?.noindex ?? false;
}

export function absoluteUrl(siteUrl, pathname) {
  return new URL(pathname, siteUrl).toString();
}

export function getPublishedArticles() {
  const articles = loadArticles();
  const imageOverrides = loadArticleImageOverrides();
  return articles
    .filter((article) => article.status === "published")
    .map((article) => ({ ...article, ...(imageOverrides[article.slug] ?? {}) }))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export function getRouteInventory() {
  const siteConfig = loadSiteConfig();
  const articles = getPublishedArticles();
  const authors = loadAuthors();
  const { ingredients, brewingMethods, flavorProfiles } = loadTaxonomies();

  const articleRoutes = articles.filter((article) => !isNoindex(article)).map((article) => ({
    kind: "article",
    title: getMetaTitle(article),
    description: getMetaDescription(article),
    path: getCanonicalPath(article),
    schema: getSchemaType(article),
    canonical: absoluteUrl(siteConfig.url, getCanonicalPath(article)),
    lastModified: article.updatedAt,
    article,
  }));

  const authorRoutes = authors.map((author) => ({
    kind: "author",
    title: author.name,
    description: author.bio,
    path: `/authors/${author.slug}`,
    schema: "ProfilePage",
    canonical: absoluteUrl(siteConfig.url, `/authors/${author.slug}`),
    lastModified: null,
  }));

  const ingredientRoutes = ingredients.map((item) => ({
    kind: "ingredient",
    title: item.name,
    description: item.description,
    path: `/ingredients/${item.slug}`,
    schema: "CollectionPage",
    canonical: absoluteUrl(siteConfig.url, `/ingredients/${item.slug}`),
    lastModified: null,
  }));

  const brewingRoutes = brewingMethods.map((item) => ({
    kind: "brewing-method",
    title: item.name,
    description: item.description,
    path: `/brewing-method/${item.slug}`,
    schema: "CollectionPage",
    canonical: absoluteUrl(siteConfig.url, `/brewing-method/${item.slug}`),
    lastModified: null,
  }));

  const flavorRoutes = flavorProfiles.map((item) => ({
    kind: "flavor-profile",
    title: item.name,
    description: item.description,
    path: `/flavor-profile/${item.slug}`,
    schema: "CollectionPage",
    canonical: absoluteUrl(siteConfig.url, `/flavor-profile/${item.slug}`),
    lastModified: null,
  }));

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    kind: "static",
    ...route,
    canonical: absoluteUrl(siteConfig.url, route.path),
    lastModified: null,
  }));

  return {
    siteConfig,
    articles,
    staticRoutes,
    routes: [...staticRoutes, ...articleRoutes, ...ingredientRoutes, ...brewingRoutes, ...flavorRoutes, ...authorRoutes],
  };
}

export function getInternalLinkCoverage() {
  const linkPlans = loadInternalLinkPlans();
  const coverage = new Map();
  for (const plan of linkPlans) {
    coverage.set(`${plan.category}:${plan.slug}`, {
      contextualLinks: plan.contextualLinks?.length ?? 0,
      relatedReading: plan.relatedReading?.length ?? 0,
      pillarLinks: plan.pillarLinks?.length ?? 0,
    });
  }
  return coverage;
}

export function formatXmlUrl(url, lastModified) {
  return [
    "  <url>",
    `    <loc>${url}</loc>`,
    lastModified ? `    <lastmod>${new Date(lastModified).toISOString()}</lastmod>` : null,
    "  </url>",
  ].filter(Boolean).join("\n");
}

export async function ensureSeoOutputDir() {
  await fsp.mkdir(SEO_OUTPUT_DIR, { recursive: true });
}

export function seoOutputPath(fileName) {
  return path.join(SEO_OUTPUT_DIR, fileName);
}

export async function writeJson(fileName, value) {
  await ensureSeoOutputDir();
  await fsp.writeFile(seoOutputPath(fileName), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function writeText(fileName, value) {
  await ensureSeoOutputDir();
  await fsp.writeFile(seoOutputPath(fileName), value, "utf8");
}
