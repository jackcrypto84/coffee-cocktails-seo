import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articlesPath = path.join(rootDir, "src", "content", "articles.ts");
const coffeeTitlesPath = path.join(rootDir, "content", "strategy", "coffee-titles.json");
const cocktailTitlesPath = path.join(rootDir, "content", "strategy", "cocktail-titles.json");
const rulesPath = path.join(rootDir, "content", "linking", "internal-linking-rules.json");
const overridesPath = path.join(rootDir, "content", "linking", "manual-overrides.json");

const stopWords = new Set([
  "a",
  "an",
  "and",
  "at",
  "be",
  "best",
  "by",
  "coffee",
  "cocktail",
  "cocktails",
  "do",
  "does",
  "for",
  "from",
  "guide",
  "how",
  "ideas",
  "in",
  "into",
  "is",
  "it",
  "like",
  "more",
  "not",
  "of",
  "on",
  "or",
  "recipe",
  "still",
  "that",
  "the",
  "them",
  "this",
  "to",
  "with",
  "without",
  "your",
]);

export async function loadLinkingInputs() {
  const [rules, overrides, liveArticles, coffeeTitles, cocktailTitles] = await Promise.all([
    loadJson(rulesPath),
    loadJson(overridesPath),
    parseArticlesRegistry(articlesPath),
    loadJson(coffeeTitlesPath),
    loadJson(cocktailTitlesPath),
  ]);

  const strategyArticles = [
    ...normalizeStrategyTitles(coffeeTitles.titles, "coffee"),
    ...normalizeStrategyTitles(cocktailTitles.titles, "cocktails"),
  ];

  return { rules, overrides, liveArticles, strategyArticles };
}

export async function loadJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

export async function parseArticlesRegistry(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const executableSource = source
    .replace(/^import[^\n]+\n/m, "")
    .replace(/export const articles:\s*Article\[\]\s*=\s*/, "globalThis.__articles = ");
  const sandbox = { globalThis: {} };
  vm.runInNewContext(executableSource, sandbox);

  return (sandbox.globalThis.__articles || []).map((record) => ({
    slug: record.slug,
    category: record.category,
    title: record.title,
    description: record.description,
    eyebrow: record.eyebrow || "",
    heroKicker: record.heroKicker || "",
    searchIntent: record.searchIntent || "informational",
    featured: Boolean(record.featured),
    tags: record.tags || [],
    brewingMethods: record.brewingMethods || [],
    flavorProfiles: record.flavorProfiles || [],
    spiritBases: record.spiritBases || [],
    occasions: record.occasions || [],
    seasons: record.seasons || [],
    ingredients: record.ingredients || [],
    verificationNotes: record.verificationNotes || [],
    source: "live",
    cluster: inferCluster(record),
  }));
}

function normalizeStrategyTitles(titles, category) {
  return titles.map((entry) => ({
    slug: entry.slug,
    category,
    title: entry.title,
    description: `${entry.cluster} article for ${entry.audience.toLowerCase()} readers.`,
    eyebrow: entry.cluster,
    heroKicker: "",
    searchIntent: entry.intent.toLowerCase(),
    featured: false,
    tags: extractTokens(entry.title),
    brewingMethods: extractBrewingMethods(entry.title, category),
    flavorProfiles: extractFlavorProfiles(entry.title),
    spiritBases: extractSpiritBases(entry.title),
    occasions: extractOccasions(entry.title),
    seasons: extractSeasons(entry.title),
    ingredients: extractIngredients(entry.title, category),
    verificationNotes: entry.review ? [entry.review] : [],
    cluster: entry.cluster,
    source: "strategy",
  }));
}

export function inferCluster(record) {
  if (record.cluster) return record.cluster;

  const title = `${record.title} ${record.eyebrow || ""} ${(record.tags || []).join(" ")}`.toLowerCase();

  if (record.category === "coffee") {
    if (includesAny(title, ["espresso", "portafilter", "yield", "channel", "puck"])) {
      return "Espresso troubleshooting";
    }
    if (includesAny(title, ["latte", "cappuccino", "flat white", "milk", "microfoam", "cafe-style"])) {
      return "Milk drinks and cafe-style drinks";
    }
    if (includesAny(title, ["v60", "pour-over", "kalita", "origami", "bloom"])) {
      return "Pour-over recipes";
    }
    if (includesAny(title, ["grinder", "water", "ratio", "extraction", "gear"])) {
      return "Water, grinders, extraction, ratios";
    }
    if (includesAny(title, ["bean", "beans", "roast", "decaf"])) {
      return "Coffee beans and roast levels";
    }
    return "Coffee brewing fundamentals";
  }

  if (includesAny(title, ["highball", "spritz", "tonic", "fizz"])) {
    return "Refreshing highballs and spritzes";
  }
  if (includesAny(title, ["old fashioned", "negroni", "martini", "manhattan", "stir", "spirit-forward"])) {
    return "Spirit-forward cocktails";
  }
  if (includesAny(title, ["dessert", "cream", "flip", "after-dinner", "coffee cocktail"])) {
    return "Dessert cocktails";
  }
  if (includesAny(title, ["spring", "summer", "autumn", "holiday", "hosting", "seasonal"])) {
    return "Seasonal cocktails";
  }
  if (includesAny(title, ["syrup", "infusion", "foam", "garnish", "clarified"])) {
    return "Syrups, infusions, foams, garnishes";
  }
  if (includesAny(title, ["pairing", "savory", "citrus", "flavor", "orange", "sesame"])) {
    return "Flavor pairing guides";
  }
  return "Original cocktail concepts";
}

function includesAny(haystack, needles) {
  return needles.some((needle) => haystack.includes(needle));
}

function extractTokens(text) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token && token.length > 2 && !stopWords.has(token)),
    ),
  );
}

function extractBrewingMethods(text, category) {
  if (category !== "coffee") return [];
  const lower = text.toLowerCase();
  const methods = [];
  if (lower.includes("espresso")) methods.push("espresso");
  if (includesAny(lower, ["v60", "pour-over", "kalita", "origami"])) methods.push("pour-over");
  if (includesAny(lower, ["milk", "latte", "cappuccino", "flat white"])) methods.push("milk-drinks");
  return methods;
}

function extractFlavorProfiles(text) {
  const lower = text.toLowerCase();
  const profiles = [];
  if (includesAny(lower, ["citrus", "yuzu", "orange", "lemon", "grapefruit"])) profiles.push("citrus-forward");
  if (includesAny(lower, ["chocolate", "cocoa", "coffee", "espresso"])) profiles.push("chocolatey");
  if (includesAny(lower, ["floral", "apricot", "spring"])) profiles.push("floral");
  if (includesAny(lower, ["savory", "sesame", "smoked", "smoky"])) profiles.push("savory");
  return profiles;
}

function extractSpiritBases(text) {
  const lower = text.toLowerCase();
  const bases = [];
  if (includesAny(lower, ["gin", "gimlet", "martini", "negroni"])) bases.push("gin");
  if (includesAny(lower, ["whiskey", "whisky", "old fashioned", "manhattan"])) bases.push("whiskey");
  if (includesAny(lower, ["rum", "highball"])) bases.push("rum");
  if (includesAny(lower, ["vodka", "espresso tonic"])) bases.push("vodka");
  if (lower.includes("amaro")) bases.push("amaro");
  return bases;
}

function extractOccasions(text) {
  const lower = text.toLowerCase();
  const occasions = [];
  if (includesAny(lower, ["hosting", "party", "guests", "gatherings", "brunch", "holiday"])) occasions.push("hosting");
  if (includesAny(lower, ["weekday", "morning", "home brewing"])) occasions.push("weekday brewing");
  return occasions;
}

function extractSeasons(text) {
  const lower = text.toLowerCase();
  const seasons = [];
  if (lower.includes("spring")) seasons.push("spring");
  if (lower.includes("summer")) seasons.push("summer");
  if (includesAny(lower, ["autumn", "fall"])) seasons.push("autumn");
  if (includesAny(lower, ["holiday", "winter"])) seasons.push("winter");
  return seasons;
}

function extractIngredients(text, category) {
  const lower = text.toLowerCase();
  const items = [];
  if (category === "coffee") items.push("coffee-beans");
  if (includesAny(lower, ["milk", "latte", "flat white", "cappuccino"])) items.push("milk");
  if (includesAny(lower, ["coffee", "espresso", "cold brew"])) items.push("coffee");
  if (includesAny(lower, ["pineapple", "apricot", "cherry", "orange", "yuzu"])) items.push("fruit");
  return items;
}

export function buildRecommendationsForPool(pool, rules, overrides) {
  return pool.map((record) => buildLinkPlan(record, pool, rules, overrides));
}

export function buildLinkPlan(source, pool, rules, overrides) {
  const override = overrides[source.slug] || {};
  const blocked = new Set(override.blockLinks || []);
  const forced = override.forceLinks || [];
  const usedAnchors = new Set();
  const sourceTokens = extractTokens(`${source.title} ${source.description}`);
  const adjacentClusters = new Set((rules.clusters[source.category] || {})[source.cluster] || []);

  const scoredCandidates = pool
    .filter((candidate) => candidate.slug !== source.slug)
    .filter((candidate) => candidate.category === source.category)
    .filter((candidate) => !blocked.has(candidate.slug))
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(source, candidate, sourceTokens, adjacentClusters, rules.weights),
    }))
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title));

  const contextualLinks = [];

  for (const forcedSlug of forced) {
    const forcedCandidate = pool.find(
      (candidate) => candidate.slug === forcedSlug && candidate.category === source.category && candidate.slug !== source.slug,
    );
    if (!forcedCandidate || blocked.has(forcedCandidate.slug)) continue;
    contextualLinks.push(buildLinkItem(source, forcedCandidate, 999, override.customAnchors || {}, usedAnchors, true));
  }

  for (const entry of scoredCandidates) {
    if (contextualLinks.length >= rules.maximumContextualLinks) break;
    if (contextualLinks.some((item) => item.slug === entry.candidate.slug)) continue;
    contextualLinks.push(buildLinkItem(source, entry.candidate, entry.score, override.customAnchors || {}, usedAnchors, false));
  }

  const pillarLinks = pickPillarLinks(source, rules.pillars, usedAnchors);
  const relatedPool = scoredCandidates.filter((entry) => !contextualLinks.some((item) => item.slug === entry.candidate.slug));
  const relatedReading = relatedPool
    .slice(0, rules.maximumRelatedReadingLinks)
    .map((entry) => buildLinkItem(source, entry.candidate, entry.score, override.customAnchors || {}, usedAnchors, false));

  const editorialNotes = [
    ...new Set(
      [
        ...(override.editorialNotes || []),
        contextualLinks.length < rules.minimumContextualLinks
          ? "Manual review: this page needs more same-cluster coverage before publishing an automated related reading block."
          : "",
        source.verificationNotes?.length
          ? "Keep fact-sensitive claims beside links that depend on brew tests, tasting, or product comparisons."
          : "",
      ].filter(Boolean),
    ),
  ];

  return {
    slug: source.slug,
    category: source.category,
    title: source.title,
    cluster: source.cluster,
    source: source.source,
    relatedReadingHeading: `${clusterLead(source.cluster)} next reads`,
    relatedReadingIntro:
      override.relatedReadingIntro || buildRelatedReadingIntro(source, contextualLinks, pillarLinks),
    contextualLinks,
    pillarLinks,
    relatedReading,
    editorialNotes,
    manualOverrideUsed: Boolean(
      (override.forceLinks || []).length ||
        (override.blockLinks || []).length ||
        (override.customAnchors && Object.keys(override.customAnchors).length),
    ),
  };
}

function scoreCandidate(source, candidate, sourceTokens, adjacentClusters, weights) {
  const candidateTokens = extractTokens(`${candidate.title} ${candidate.description}`);
  let score = 0;

  if (candidate.category === source.category) score += weights.sameCategory;
  if (candidate.cluster === source.cluster) score += weights.sameCluster;
  if (adjacentClusters.has(candidate.cluster)) score += weights.adjacentCluster;
  if (candidate.featured) score += weights.featured;
  if (candidate.featured || candidate.source === "live") score += weights.pillarCandidate;
  if (candidate.searchIntent === source.searchIntent) score += weights.sharedSearchIntent;
  score += overlap(candidate.tags, source.tags) * weights.sharedTags;
  score += overlap(candidate.brewingMethods, source.brewingMethods) * weights.sharedBrewingMethods;
  score += overlap(candidate.flavorProfiles, source.flavorProfiles) * weights.sharedFlavorProfiles;
  score += overlap(candidate.spiritBases, source.spiritBases) * weights.sharedSpiritBases;
  score += overlap(candidate.ingredients, source.ingredients) * weights.sharedIngredients;
  score += overlap(candidate.occasions, source.occasions) * weights.sharedOccasions;
  score += overlap(candidate.seasons, source.seasons) * weights.sharedSeasons;
  score += overlap(candidateTokens, sourceTokens) * weights.titleTokenOverlap;

  return score;
}

function overlap(left = [], right = []) {
  if (!left.length || !right.length) return 0;
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
}

function buildLinkItem(source, target, score, customAnchors, usedAnchors, forced) {
  const relationship = target.cluster === source.cluster ? "same-cluster" : "adjacent-cluster";
  const reason = buildReason(source, target, relationship);
  const anchorText = chooseAnchorText(source, target, relationship, customAnchors[target.slug] || [], usedAnchors);

  return {
    slug: target.slug,
    href: `/${target.category}/${target.slug}`,
    category: target.category,
    title: target.title,
    cluster: target.cluster,
    anchorText,
    reason,
    relationship,
    score,
    forced,
  };
}

function buildReason(source, target, relationship) {
  if (relationship === "same-cluster") {
    return `Stays inside ${source.cluster.toLowerCase()} and gives the reader a practical next step instead of a lateral detour.`;
  }

  if (overlap(source.flavorProfiles, target.flavorProfiles) > 0 || overlap(source.spiritBases, target.spiritBases) > 0) {
    return "Connects an adjacent technique or flavor problem the reader is likely to hit next.";
  }

  if (overlap(source.ingredients, target.ingredients) > 0 || overlap(source.brewingMethods, target.brewingMethods) > 0) {
    return "Adds nearby context without repeating the same explanation in a new article.";
  }

  return "Broadens the session with a closely related guide that still fits the reader's current problem.";
}

function chooseAnchorText(source, target, relationship, customAnchors, usedAnchors) {
  const shortTitle = compactTitle(target.title);
  const variants = [
    ...customAnchors,
    ...(relationship === "same-cluster"
      ? [
          `read the companion guide on ${shortTitle}`,
          `see ${shortTitle} next`,
          `compare your results with ${shortTitle}`,
        ]
      : [
          `see the related guide on ${shortTitle}`,
          `open ${shortTitle} for the adjacent fix`,
          `read ${shortTitle} for the next variable`,
        ]),
    shortTitle,
  ];

  const selected = variants.find((variant) => !usedAnchors.has(variant.toLowerCase())) || `${shortTitle} guide`;
  usedAnchors.add(selected.toLowerCase());
  return selected;
}

function compactTitle(title) {
  return title
    .replace(/^[^:]+:\s*/, "")
    .replace(/\s+for\s+spring hosting$/i, "")
    .replace(/\s+without.*$/i, "")
    .trim();
}

function pickPillarLinks(source, pillarMap, usedAnchors) {
  const options = ((pillarMap[source.category] || {})[source.cluster] || []).slice(0, 2);
  return options.map((item) => {
    const anchorText = choosePillarAnchor(item.anchorVariants || [], item.title, usedAnchors);
    return {
      href: item.href,
      title: item.title,
      anchorText,
      reason: `Surfaces a pillar page so this article keeps feeding the broader ${source.category} architecture.`,
    };
  });
}

function choosePillarAnchor(variants, title, usedAnchors) {
  const selected = variants.find((variant) => !usedAnchors.has(variant.toLowerCase())) || title;
  usedAnchors.add(selected.toLowerCase());
  return selected;
}

function buildRelatedReadingIntro(source, contextualLinks, pillarLinks) {
  const contextualLead = contextualLinks[0]?.title || "the next practical guide";
  const pillarLead = pillarLinks[0]?.title || "the main hub";
  return `Start with ${contextualLead}, then use ${pillarLead} if you want the wider cluster instead of another one-off answer.`;
}

function clusterLead(cluster) {
  if (cluster === "Espresso troubleshooting") return "Espresso";
  if (cluster === "Pour-over recipes") return "Pour-over";
  if (cluster === "Milk drinks and cafe-style drinks") return "Milk-drink";
  if (cluster === "Refreshing highballs and spritzes") return "Highball";
  return cluster.replace(/s$/i, "");
}

export function selectSampleRecords(liveArticles, strategyArticles) {
  const sampleCoffeeLive = liveArticles.filter((item) => item.category === "coffee").slice(0, 6);
  const sampleCocktailLive = liveArticles.filter((item) => item.category === "cocktails").slice(0, 6);
  const sampleCoffeeStrategy = strategyArticles.filter((item) => item.category === "coffee").slice(0, 4);
  const sampleCocktailStrategy = strategyArticles.filter((item) => item.category === "cocktails").slice(0, 4);

  return {
    coffee: [...sampleCoffeeLive, ...sampleCoffeeStrategy],
    cocktails: [...sampleCocktailLive, ...sampleCocktailStrategy],
  };
}

export function toRuntimeJson(plans) {
  return plans
    .filter((plan) => plan.source === "live")
    .map((plan) => ({
      slug: plan.slug,
      category: plan.category,
      cluster: plan.cluster,
      relatedReadingHeading: plan.relatedReadingHeading,
      relatedReadingIntro: plan.relatedReadingIntro,
      contextualLinks: plan.contextualLinks,
      pillarLinks: plan.pillarLinks,
      relatedReading: plan.relatedReading,
      editorialNotes: plan.editorialNotes,
      manualOverrideUsed: plan.manualOverrideUsed,
    }));
}

export function toMarkdownReport(samplePlans) {
  const lines = [
    "# Internal Linking Strategy",
    "",
    "## What the engine does",
    "",
    "- Scores same-cluster links first, then adjacent-cluster links, then broader same-category options.",
    "- Forces pillar-page coverage so every article can climb back up to a hub.",
    "- Rotates anchor-text patterns to reduce repetitive phrasing in recommendation blocks.",
    "- Lets editors force, block, or re-anchor links with `content/linking/manual-overrides.json`.",
    "",
    "## Coffee sample output",
    "",
    "| Article | Cluster | Contextual links | Pillar pages | Editorial notes |",
    "| --- | --- | --- | --- | --- |",
    ...samplePlans.coffee.map((plan) => formatPlanRow(plan)),
    "",
    "## Cocktail sample output",
    "",
    "| Article | Cluster | Contextual links | Pillar pages | Editorial notes |",
    "| --- | --- | --- | --- | --- |",
    ...samplePlans.cocktails.map((plan) => formatPlanRow(plan)),
    "",
  ];

  return lines.join("\n");
}

function formatPlanRow(plan) {
  const contextual = plan.contextualLinks
    .slice(0, 3)
    .map((item) => `${item.anchorText} -> ${item.title}`)
    .join(" <br> ");
  const pillars = plan.pillarLinks.map((item) => `${item.anchorText} -> ${item.title}`).join(" <br> ");
  const notes = plan.editorialNotes.length ? plan.editorialNotes.join(" <br> ") : "-";
  return `| ${plan.title} | ${plan.cluster} | ${contextual} | ${pillars} | ${notes} |`;
}
