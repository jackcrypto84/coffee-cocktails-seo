import {
  absoluteUrl,
  getCanonicalPath,
  getInternalLinkCoverage,
  getMetaDescription,
  getMetaTitle,
  getRouteInventory,
  getSchemaType,
  isNoindex,
  writeJson,
  writeText,
} from "./seo-utils.mjs";

function hasImageAlt(article) {
  return Boolean(article.imageAlt && article.imageAlt.trim());
}

function auditArticle(article, siteUrl, linkCoverage) {
  const key = `${article.category}:${article.slug}`;
  const links = linkCoverage.get(key) ?? { contextualLinks: 0, relatedReading: 0, pillarLinks: 0 };
  const issues = [];
  const blockers = [];
  const title = getMetaTitle(article);
  const description = getMetaDescription(article);
  const canonicalPath = getCanonicalPath(article);
  const schemaType = getSchemaType(article);
  const canonical = absoluteUrl(siteUrl, canonicalPath);

  if (!title?.trim()) blockers.push("Missing title");
  if (!description?.trim()) blockers.push("Missing meta description");
  if (!canonicalPath?.trim()) blockers.push("Missing canonical");
  if (!schemaType?.trim()) blockers.push("Missing schema");
  if (!hasImageAlt(article)) issues.push("Missing image alt text");
  if (links.contextualLinks + links.relatedReading < 2) issues.push("Internal links are too thin");
  if (isNoindex(article)) blockers.push("Page is marked noindex");

  return {
    type: "article",
    slug: article.slug,
    category: article.category,
    path: canonicalPath,
    canonical,
    title,
    metaDescription: description,
    schema: schemaType,
    imageAltPresent: hasImageAlt(article),
    internalLinks: links,
    blockers,
    issues,
  };
}

function auditRoute(route) {
  const blockers = [];
  if (!route.title?.trim()) blockers.push("Missing title");
  if (!route.description?.trim()) blockers.push("Missing meta description");
  if (!route.canonical?.trim()) blockers.push("Missing canonical");
  if (!route.schema?.trim()) blockers.push("Missing schema");

  return {
    type: route.kind,
    path: route.path,
    canonical: route.canonical,
    title: route.title,
    metaDescription: route.description,
    schema: route.schema,
    blockers,
    issues: [],
  };
}

const { siteConfig, articles, routes } = getRouteInventory();
const linkCoverage = getInternalLinkCoverage();
const articleAudits = articles.map((article) => auditArticle(article, siteConfig.url, linkCoverage));
const routeAudits = routes.filter((route) => route.kind !== "article").map(auditRoute);
const blockers = [...articleAudits, ...routeAudits].filter((item) => item.blockers.length);
const issues = [...articleAudits, ...routeAudits].filter((item) => item.issues.length);

const payload = {
  generatedAt: new Date().toISOString(),
  totals: {
    auditedRoutes: routes.length,
    auditedArticles: articleAudits.length,
    blockerCount: blockers.length,
    issueCount: issues.length,
  },
  blockers,
  issues,
  articleAudits,
  routeAudits,
};

await writeJson("seo-audit.json", payload);

const report = [
  "# SEO Audit",
  "",
  `Generated: ${payload.generatedAt}`,
  "",
  `- Audited routes: ${payload.totals.auditedRoutes}`,
  `- Audited articles: ${payload.totals.auditedArticles}`,
  `- Blocking failures: ${payload.totals.blockerCount}`,
  `- Non-blocking issues: ${payload.totals.issueCount}`,
  "",
  "## Blocking failures",
  payload.totals.blockerCount
    ? blockers
        .map((item) => `- ${item.path}: ${item.blockers.join('; ')}`)
        .join("\n")
    : "- None",
  "",
  "## Non-blocking issues",
  payload.totals.issueCount
    ? issues
        .map((item) => `- ${item.path}: ${item.issues.join('; ')}`)
        .join("\n")
    : "- None",
  "",
  "## Newly recommended checks",
  "- Confirm published pages are not intentionally noindex.",
  "- Confirm image alt text is present and recipe-specific on recipe-led pages.",
  "- Confirm generated internal-link plans still include at least two contextual or related-reading links.",
].join("\n");

await writeText("seo-audit.md", `${report}\n`);

console.log(`Audited ${routes.length} routes.`);
console.log(`Blocking failures: ${payload.totals.blockerCount}`);
console.log(`Non-blocking issues: ${payload.totals.issueCount}`);
console.log("Wrote content/seo/seo-audit.json and content/seo/seo-audit.md");

if (payload.totals.blockerCount > 0) {
  process.exitCode = 1;
}
