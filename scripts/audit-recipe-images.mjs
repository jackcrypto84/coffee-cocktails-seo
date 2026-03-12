import fs from "node:fs";
import path from "node:path";

const source = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "content", "article-images.json"), "utf8"));

const garnishKeywords = ["gimlet", "old fashioned", "spritz", "sour", "paloma", "martini", "highball"];
const layeringKeywords = ["dirty latte", "layered", "espresso tonic"];

function inferCategory(entry) {
  if (entry.imagePath?.includes("/cocktails/")) return "cocktails";
  return "coffee";
}

function fileExists(imagePath) {
  return fs.existsSync(path.join(process.cwd(), "public", imagePath.replace(/^\//, "")));
}

function validate(slug, entry) {
  const issues = [];
  const category = inferCategory(entry);
  const title = slug.replace(/-/g, " ");
  if (!entry.imagePath) issues.push("Missing imagePath.");
  if (!entry.imageAlt) issues.push("Missing imageAlt.");
  if (!entry.imageCaption) issues.push("Missing imageCaption.");
  if (!entry.imagePrompt) issues.push("Missing imagePrompt.");
  if (!entry.drinkColor) issues.push("Missing drinkColor.");
  if (!entry.settingMood) issues.push("Missing settingMood.");
  if (!entry.styleTags || entry.styleTags.length === 0) issues.push("Missing styleTags.");
  if (category === "cocktails") {
    if (!entry.glassware) issues.push("Cocktail missing glassware.");
    if (!entry.iceStyle) issues.push("Cocktail missing iceStyle.");
    if (!entry.garnish) issues.push("Cocktail missing garnish.");
    if (garnishKeywords.some((keyword) => slug.includes(keyword)) && !entry.garnish) issues.push("Style depends on garnish but garnish is missing.");
  } else {
    if (!entry.hotOrIced) issues.push("Coffee visual missing hotOrIced.");
    if (!entry.vesselType) issues.push("Coffee visual missing vesselType.");
    if (/latte|cappuccino|flat white|cortado/.test(slug)) {
      if (!entry.milkTexture) issues.push("Milk-based coffee missing milkTexture.");
      if (!entry.foamTexture) issues.push("Milk-based coffee missing foamTexture.");
    }
    if (layeringKeywords.some((keyword) => slug.includes(keyword)) && !entry.layeringNotes) issues.push("Layered coffee visual missing layeringNotes.");
  }
  if (entry.imagePrompt && !entry.imagePrompt.toLowerCase().includes(title.split(" ")[0])) {
    issues.push("Prompt may be too generic for the recipe title.");
  }
  return issues;
}

const report = Object.entries(source).map(([slug, entry]) => {
  const category = inferCategory(entry);
  const issues = validate(slug, entry);
  const hasImage = entry.imagePath ? fileExists(entry.imagePath) : false;
  const visualStatus = hasImage ? (issues.length ? "needs-review" : "image-ready") : (issues.length ? "needs-visual-brief" : "prompt-ready");
  return {
    slug,
    category,
    imagePath: entry.imagePath,
    hasImage,
    visualStatus,
    issues,
  };
});

const outDir = path.join(process.cwd(), "content", "image-prompts");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "live-image-audit.json"), JSON.stringify(report, null, 2));
const markdown = [
  "# Live Recipe Image Audit",
  "",
  ...report.map((item) => [
    `## ${item.slug}`,
    `- Category: ${item.category}`,
    `- Image path: ${item.imagePath}`,
    `- File present: ${item.hasImage ? "yes" : "no"}`,
    `- Visual status: ${item.visualStatus}`,
    ...(item.issues.length ? item.issues.map((issue) => `- Issue: ${issue}`) : ["- Issue: none"]),
    "",
  ].join("\n")),
].join("\n");
fs.writeFileSync(path.join(outDir, "live-image-audit.md"), markdown);
console.log(`Audited ${report.length} live recipe image entries.`);
