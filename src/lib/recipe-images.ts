import fs from "node:fs";
import path from "node:path";
import { Article, ContentCategory, VisualStatus } from "@/lib/content-types";

const promptTemplates: Record<ContentCategory, string> = {
  coffee:
    "Photorealistic premium coffee photography of {title}. Show the final drink exactly as served: {drinkColor}, {temperatureNote}, in {vesselType}, with milk texture {milkTexture}, foam texture {foamTexture}, layering {layeringNotes}, garnish {garnish}, mood {settingMood}. Style cues: {styleTags}. Realistic lighting, realistic liquid texture, realistic layering where relevant, clean composition, visually appetizing, no text, no logos, no surreal styling, no inaccurate vessel.",
  cocktails:
    "Photorealistic premium cocktail photography of {title}. Show the final drink exactly as served: {drinkColor}, in {glassware}, ice style {iceStyle}, garnish {garnish}, mood {settingMood}. Flavor cues should visually fit the recipe and feel believable for {baseCue}. Style cues: {styleTags}. Realistic lighting, realistic ice and liquid texture, accurate glassware, accurate garnish, premium editorial drink photography, no text, no logos, no fantasy styling.",
};

const garnishRequiredKeywords = ["gimlet", "old fashioned", "spritz", "sour", "paloma", "martini", "highball"];
const layeringRequiredKeywords = ["dirty latte", "layered", "espresso tonic"];

function normalizeText(value?: string) {
  return value && value.trim().length ? value.trim() : undefined;
}

function defaultImagePath(article: Article) {
  return `/images/${article.category}/${article.slug}.jpg`;
}

function defaultDrinkColor(article: Article) {
  return article.category === "coffee" ? "rich coffee-brown tones" : "a recipe-accurate cocktail color";
}

function defaultVesselType(article: Article) {
  if (article.category === "coffee") return normalizeText(article.vesselType) ?? "clear or ceramic coffee serving vessel";
  return normalizeText(article.vesselType) ?? normalizeText(article.glassware) ?? "recipe-appropriate cocktail glassware";
}

function defaultSettingMood(article: Article) {
  return normalizeText(article.settingMood) ?? (article.category === "coffee" ? "clean premium cafe setting" : "clean upscale bar setting");
}

function defaultStyleTags(article: Article) {
  const base = article.category === "coffee"
    ? ["photorealistic", "premium coffee photography", "clean composition", "minimal clutter"]
    : ["photorealistic", "premium cocktail photography", "clean composition", "minimal clutter"];
  return Array.from(new Set([...base, ...article.tags.slice(0, 4)])).slice(0, 8);
}

function buildTemperatureNote(article: Article) {
  if (article.category !== "coffee") return "served at the intended temperature";
  if (article.hotOrIced === "iced") return "served cold over recipe-appropriate ice if visible";
  if (article.hotOrIced === "room-temperature") return "served at room temperature";
  return "served hot";
}

function buildBaseCue(article: Article) {
  if (article.category === "coffee") return "specialty coffee";
  return normalizeText(article.spiritBases?.join(", ")) ?? "the stated cocktail base spirit";
}

export function doesImageExist(publicPath: string) {
  const relativePath = publicPath.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}

export function buildImageAlt(article: Article) {
  if (article.category === "coffee") {
    const vesselType = defaultVesselType(article);
    const drinkColor = normalizeText(article.drinkColor) ?? defaultDrinkColor(article);
    const layering = normalizeText(article.layeringNotes);
    return layering
      ? `${article.title} in ${vesselType}, ${drinkColor}, showing ${layering}.`
      : `${article.title} shown as a ${drinkColor} drink in ${vesselType}.`;
  }

  const glassware = normalizeText(article.glassware) ?? defaultVesselType(article);
  const garnish = normalizeText(article.garnish) ?? "recipe-accurate garnish";
  return `${article.title} served in a ${glassware} with ${garnish}.`;
}

export function buildImageCaption(article: Article) {
  if (article.category === "coffee") {
    const vesselType = defaultVesselType(article);
    const layering = normalizeText(article.layeringNotes);
    return layering ? `${article.title} served in ${vesselType} with ${layering}.` : `${article.title} served in ${vesselType}.`;
  }

  const glassware = normalizeText(article.glassware) ?? defaultVesselType(article);
  const garnish = normalizeText(article.garnish) ?? "a recipe-accurate garnish";
  return `${article.title} in ${glassware} with ${garnish}.`;
}

export function buildImagePrompt(article: Article) {
  const template = promptTemplates[article.category];
  return template
    .replace("{title}", article.title)
    .replace("{drinkColor}", normalizeText(article.drinkColor) ?? defaultDrinkColor(article))
    .replace("{temperatureNote}", buildTemperatureNote(article))
    .replace("{vesselType}", defaultVesselType(article))
    .replace("{milkTexture}", normalizeText(article.milkTexture) ?? "none or not visually dominant")
    .replace("{foamTexture}", normalizeText(article.foamTexture) ?? "minimal or recipe-accurate")
    .replace("{layeringNotes}", normalizeText(article.layeringNotes) ?? "no dramatic layering")
    .replace("{garnish}", normalizeText(article.garnish) ?? "none")
    .replace("{settingMood}", defaultSettingMood(article))
    .replace("{styleTags}", (article.styleTags?.length ? article.styleTags : defaultStyleTags(article)).join(", "))
    .replace("{glassware}", normalizeText(article.glassware) ?? defaultVesselType(article))
    .replace("{iceStyle}", normalizeText(article.iceStyle) ?? "recipe-appropriate ice or served up")
    .replace("{baseCue}", buildBaseCue(article));
}

export function validateRecipeVisual(article: Article) {
  const issues: string[] = [];
  const prompt = normalizeText(article.imagePrompt) ?? "";
  const title = article.title.toLowerCase();

  if (!normalizeText(article.imagePath)) issues.push("Missing imagePath.");
  if (!normalizeText(article.imageAlt)) issues.push("Missing imageAlt.");
  if (!normalizeText(article.imageCaption)) issues.push("Missing imageCaption.");
  if (!normalizeText(article.imagePrompt)) issues.push("Missing imagePrompt.");
  if (!article.styleTags?.length) issues.push("Missing styleTags.");
  if (!normalizeText(article.settingMood)) issues.push("Missing settingMood.");
  if (!normalizeText(article.drinkColor)) issues.push("Missing drinkColor.");

  if (article.category === "cocktails") {
    if (!normalizeText(article.glassware)) issues.push("Cocktail visual is missing glassware.");
    if (!normalizeText(article.iceStyle)) issues.push("Cocktail visual is missing iceStyle.");
    if (!normalizeText(article.garnish)) issues.push("Cocktail visual is missing garnish.");
    if (garnishRequiredKeywords.some((keyword) => title.includes(keyword)) && !normalizeText(article.garnish)) {
      issues.push("This cocktail style depends on garnish cues but garnish is missing.");
    }
  }

  if (article.category === "coffee") {
    if (!normalizeText(article.hotOrIced)) issues.push("Coffee visual is missing hotOrIced.");
    if (!normalizeText(article.vesselType)) issues.push("Coffee visual is missing vesselType.");
    if (/(latte|cappuccino|flat white|cortado)/i.test(article.title)) {
      if (!normalizeText(article.milkTexture)) issues.push("Milk-based coffee visual is missing milkTexture.");
      if (!normalizeText(article.foamTexture)) issues.push("Milk-based coffee visual is missing foamTexture.");
    }
    if (layeringRequiredKeywords.some((keyword) => title.includes(keyword)) && !normalizeText(article.layeringNotes)) {
      issues.push("Layered coffee visual is missing layeringNotes.");
    }
  }

  if (prompt) {
    if (!prompt.toLowerCase().includes(article.title.toLowerCase().split(":")[0].trim().toLowerCase())) {
      issues.push("Image prompt does not explicitly name the drink.");
    }
    if (/recipe-accurate cocktail color|recipe-appropriate cocktail glassware|clean coffee serving vessel/i.test(prompt)) {
      issues.push("Image prompt still contains generic fallback language.");
    }
  }

  return issues;
}

export function resolveVisualStatus(article: Article, issues: string[], hasImage: boolean): VisualStatus {
  if (hasImage && issues.length === 0) return "image-ready";
  if (hasImage && issues.length > 0) return "needs-review";
  if (!hasImage && issues.length === 0) return "prompt-ready";
  return "needs-visual-brief";
}

export function getRecipeImageMeta(article: Article): Article {
  const hydrated: Article = {
    ...article,
    imagePath: normalizeText(article.imagePath) ?? defaultImagePath(article),
    drinkColor: normalizeText(article.drinkColor) ?? defaultDrinkColor(article),
    vesselType: defaultVesselType(article),
    settingMood: defaultSettingMood(article),
    styleTags: article.styleTags?.length ? article.styleTags : defaultStyleTags(article),
  };

  hydrated.imageAlt = normalizeText(hydrated.imageAlt) ?? buildImageAlt(hydrated);
  hydrated.imageCaption = normalizeText(hydrated.imageCaption) ?? buildImageCaption(hydrated);
  hydrated.imagePrompt = normalizeText(hydrated.imagePrompt) ?? buildImagePrompt(hydrated);

  const hasImage = doesImageExist(hydrated.imagePath ?? "");
  const visualValidationIssues = validateRecipeVisual(hydrated);
  const visualStatus = resolveVisualStatus(hydrated, visualValidationIssues, hasImage);

  return {
    ...hydrated,
    visualValidationIssues,
    visualStatus,
    needsImageGeneration: !hasImage,
    ogImagePath: hasImage ? hydrated.imagePath : `/${article.category}/${article.slug}/opengraph-image`,
  };
}

export function getImagePromptTemplate(category: ContentCategory) {
  return promptTemplates[category];
}
