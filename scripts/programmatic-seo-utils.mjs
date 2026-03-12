import fs from "node:fs";

export const MINIMUM_THRESHOLDS = {
  recommendations: 3,
  internalLinks: 3,
  faqItems: 3,
  editorialNotes: 2,
  distinctiveInsights: 3,
  introLength: 220,
};

export function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function faqSimilarity(a, b) {
  const left = new Set(a.map((item) => normalizeText(item.question)));
  const right = new Set(b.map((item) => normalizeText(item.question)));
  const intersection = [...left].filter((item) => right.has(item)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

export function renderIntro(page) {
  switch (page.template) {
    case "coffee-beans-by-flavor-note":
      return `${page.title} should help readers choose beans that actually deliver ${page.subjectLabel.toLowerCase()} character in the cup, not just on a bag label. This page works best when it connects roast level, brew method, and expectation-setting so a reader can tell whether the note will show as brightness, sweetness, or finish. [VERIFY FACT]`;
    case "brew-methods-by-difficulty":
      return `${page.title} should explain what gets harder, what gets easier, and what kind of mistake tolerance the method gives a home brewer. The point is not to rank gear by prestige. It is to show how workflow, repeatability, and sensory payoff change with difficulty level. [ADD FIRSTHAND TEST NOTE]`;
    case "drinks-by-occasion":
      return `${page.title} should feel curated for a real moment, not like a pile of vaguely related recipes. Occasion pages earn their keep when they explain service style, pacing, and what kinds of drinks stay appealing over a full gathering rather than just the first round. [ADD FIRSTHAND TEST NOTE]`;
    case "cocktails-by-base-spirit":
      return `${page.title} should teach readers how ${page.subjectLabel.toLowerCase()} shapes structure, aroma, and substitution choices across a family of drinks. It should not read like an archive dump. The value comes from showing which directions the spirit handles best and where it starts to fight the drink. [VERIFY FACT]`;
    case "cocktails-by-flavor-profile":
      return `${page.title} should decode the flavor profile in practical cocktail terms: what makes it feel sharp or soft, what kinds of base spirits support it, and how sweetness or dilution can ruin it. This makes the page useful even before the reader picks a specific recipe. [ADD FIRSTHAND TEST NOTE]`;
    case "coffee-drinks-by-milk-texture":
      return `${page.title} should help a reader connect milk texture to drink identity, not just latte art aesthetics. A useful page here explains what the texture does to sweetness, coffee definition, and perceived balance so the drink choice matches the equipment and skill of the brewer. [ADD FIRSTHAND TEST NOTE]`;
    case "ingredient-pairing-pages":
      return `${page.title} should explain why the pairing works in sensory terms and where it commonly fails. Pairing pages become thin when they only list combinations. They become useful when they show what each ingredient contributes, what to watch in dilution or extraction, and which applications are actually worth trying. [VERIFY FACT]`;
    default:
      return `${page.title} needs a unique editorial frame and a clear reason to exist. [VERIFY FACT]`;
  }
}

export function validatePage(page, allPages) {
  const issues = [];
  if ((page.recommendations?.length || 0) < MINIMUM_THRESHOLDS.recommendations) issues.push("Not enough curated recommendations");
  if ((page.internalLinks?.length || 0) < MINIMUM_THRESHOLDS.internalLinks) issues.push("Not enough internal links");
  if ((page.faq?.length || 0) < MINIMUM_THRESHOLDS.faqItems) issues.push("Not enough FAQ items");
  if ((page.editorialNotes?.length || 0) < MINIMUM_THRESHOLDS.editorialNotes) issues.push("Not enough editorial notes");
  if ((page.distinctiveInsights?.length || 0) < MINIMUM_THRESHOLDS.distinctiveInsights) issues.push("Not enough distinctive insights");
  if ((page.intro?.length || 0) < MINIMUM_THRESHOLDS.introLength) issues.push("Intro too short");

  const sameIntro = allPages.filter((candidate) => candidate.slug !== page.slug && normalizeText(candidate.intro) === normalizeText(page.intro));
  if (sameIntro.length) issues.push("Duplicate intro detected");

  const similarFaq = allPages.find(
    (candidate) => candidate.slug !== page.slug && faqSimilarity(candidate.faq || [], page.faq || []) > 0.66,
  );
  if (similarFaq) issues.push(`FAQ block too similar to ${similarFaq.slug}`);

  return {
    requiresManualReview: issues.length > 0 || (page.flags?.length || 0) > 0,
    issues,
  };
}

export function renderPageMarkdown(page, validation) {
  return `# ${page.title}

- Template: ${page.template}
- Route pattern: ${page.routePattern}
- Recommended URL: ${page.slug}
- Requires manual review: ${validation.requiresManualReview ? "yes" : "no"}

## Intro
${page.intro}

## Curated Recommendations
${page.recommendations.map((item) => `- ${item}`).join("\n")}

## Distinctive Insights
${page.distinctiveInsights.map((item) => `- ${item}`).join("\n")}

## Internal Links
${page.internalLinks.map((item) => `- ${item}`).join("\n")}

## FAQ
${page.faq.map((item) => `### ${item.question}\n- ${item.answer}`).join("\n\n")}

## Editorial Notes
${page.editorialNotes.map((item) => `- ${item}`).join("\n")}

## Human Commentary Slot
${page.humanCommentaryPrompt}

## Validation
${validation.issues.length ? validation.issues.map((item) => `- ${item}`).join("\n") : "- Passed automatic thresholds"}
`;
}

export function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}
