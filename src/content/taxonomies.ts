import {
  BrewingMethod,
  FlavorProfile,
  Ingredient,
} from "@/lib/content-types";

export const ingredients: Ingredient[] = [
  {
    slug: "gin",
    name: "Gin",
    description: "A botanical base that plays especially well with citrus, herbs, tea, and savory accents.",
    angle: "Use gin pages to cluster martini riffs, gimlets, spritzes, and botanical highballs.",
  },
  {
    slug: "rye-whiskey",
    name: "Rye Whiskey",
    description: "Peppery, dry, and structure-driven, rye supports stirred cocktails with spice and length.",
    angle: "Ideal for twists on old fashioneds, Manhattans, and aromatic sours.",
  },
  {
    slug: "coffee-beans",
    name: "Coffee Beans",
    description: "Whole bean quality, roast development, and freshness shape extraction more than gadget hype ever will.",
    angle: "Use ingredient hubs to connect origin, roast, flavor note, and brew-method education.",
  },
  {
    slug: "citrus",
    name: "Citrus",
    description: "Fresh citrus controls brightness, aroma, and perceived sweetness in both coffee-adjacent drinks and cocktails.",
    angle: "Great for tying together gimlets, sours, citrus-led spritzes, and flavor balance guides.",
  },
];

export const brewingMethods: BrewingMethod[] = [
  {
    slug: "pour-over",
    name: "Pour-Over",
    skillLevel: "beginner",
    description: "A clean, transparent method that rewards steady pours and small grind changes.",
  },
  {
    slug: "espresso",
    name: "Espresso",
    skillLevel: "advanced",
    description: "A concentrated brew method where dose, yield, time, and puck prep all visibly affect the cup.",
  },
  {
    slug: "milk-drinks",
    name: "Milk Drinks",
    skillLevel: "intermediate",
    description: "Texture and temperature matter as much as espresso quality when building cappuccinos and lattes.",
  },
];

export const flavorProfiles: FlavorProfile[] = [
  {
    slug: "chocolatey",
    name: "Chocolatey",
    description: "Round, comforting, and lower-acid profiles that often appeal to classic coffee drinkers and whiskey fans alike.",
    appliesTo: ["coffee", "cocktails"],
  },
  {
    slug: "citrus-forward",
    name: "Citrus-Forward",
    description: "Bright aromatics and lifted acidity that make drinks taste lively rather than sharp when balanced properly.",
    appliesTo: ["coffee", "cocktails"],
  },
  {
    slug: "floral",
    name: "Floral",
    description: "Perfumed, delicate notes that need restraint in recipe design to avoid tasting soapy or diffuse.",
    appliesTo: ["coffee", "cocktails"],
  },
  {
    slug: "bittersweet",
    name: "Bittersweet",
    description: "Structured, aperitivo-style balance where bitterness is present but not punishing.",
    appliesTo: ["cocktails"],
  },
];

