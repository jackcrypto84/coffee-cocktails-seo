import fs from "node:fs";
import path from "node:path";

const coffeeSeeds = [
  { slug: "v60-bloom-timing-guide", title: "V60 Bloom Timing Guide", drinkColor: "clear amber black coffee", vesselType: "white ceramic V60 dripper over a clear glass server", garnish: "none", hotOrIced: "hot", styleTags: ["pour-over", "premium coffee photography", "natural window light", "editorial setup"] },
  { slug: "espresso-yield-ratios-explained", title: "Espresso Yield Ratios Explained", drinkColor: "deep caramel espresso with hazelnut crema", vesselType: "espresso cup beside shot glass and scale", garnish: "none", hotOrIced: "hot", styleTags: ["espresso", "close-up", "crema texture", "precision"] },
  { slug: "microfoam-at-home", title: "Microfoam at Home", drinkColor: "soft tan milk coffee", vesselType: "ceramic latte cup", garnish: "simple latte art", hotOrIced: "hot", styleTags: ["latte", "microfoam", "clean cafe composition", "warm light"] },
  { slug: "decaf-for-espresso-milk-drinks", title: "Decaf for Espresso Milk Drinks", drinkColor: "warm tan drink with chestnut crema accents", vesselType: "small cappuccino cup", garnish: "simple tulip latte art", hotOrIced: "hot", styleTags: ["decaf latte", "milk drink", "premium cafe photography", "balanced foam"] },
  { slug: "how-to-fix-bitter-pour-over-coffee", title: "How to Fix Bitter Pour Over Coffee", drinkColor: "dark brown brewed coffee with amber highlights", vesselType: "glass server with tasting cup", garnish: "none", hotOrIced: "hot", styleTags: ["pour-over", "troubleshooting", "clean editorial", "realistic kettle setup"] },
  { slug: "best-water-for-coffee-brewing", title: "Best Water for Coffee Brewing", drinkColor: "clear brewed coffee beside clean water glasses", vesselType: "glass dripper and server", garnish: "none", hotOrIced: "hot", styleTags: ["coffee water", "minimal still life", "bright daylight", "brewing gear"] },
  { slug: "why-my-latte-tastes-flat", title: "Why My Latte Tastes Flat", drinkColor: "muted tan latte with soft microfoam", vesselType: "ceramic latte cup", garnish: "subtle latte art", hotOrIced: "hot", styleTags: ["latte", "texture", "realistic milk foam", "editorial cafe shot"] },
  { slug: "v60-recipe-for-medium-roast-beans", title: "V60 Recipe for Medium Roast Beans", drinkColor: "clear chestnut-brown brewed coffee", vesselType: "V60 dripper and clear server", garnish: "none", hotOrIced: "hot", styleTags: ["medium roast", "pour-over", "steam", "clean countertop"] },
  { slug: "dirty-latte", title: "Dirty Latte", drinkColor: "white milk base with dark espresso top layer", vesselType: "clear tumbler glass", garnish: "none", hotOrIced: "iced", styleTags: ["dirty latte", "layered drink", "iced coffee", "natural cafe light"] },
  { slug: "iced-honey-cinnamon-latte", title: "Iced Honey Cinnamon Latte", drinkColor: "light tan iced latte with cinnamon tones", vesselType: "tall glass with ice", garnish: "light cinnamon dust or cinnamon stick", hotOrIced: "iced", styleTags: ["iced latte", "honey", "cinnamon", "summer coffee"] },
  { slug: "cortado-recipe-at-home", title: "Cortado Recipe at Home", drinkColor: "warm hazelnut-brown espresso and milk", vesselType: "small Gibraltar glass", garnish: "none", hotOrIced: "hot", styleTags: ["cortado", "espresso", "minimal", "clean cafe style"] },
  { slug: "flat-white-vs-latte", title: "Flat White vs Latte", drinkColor: "two milk coffee drinks with distinct foam depth", vesselType: "ceramic cup and tulip cup", garnish: "simple latte art", hotOrIced: "hot", styleTags: ["comparison", "milk drinks", "foam texture", "editorial side by side"] },
  { slug: "iced-maple-oat-latte", title: "Iced Maple Oat Latte", drinkColor: "creamy beige iced latte", vesselType: "tall glass with clear ice", garnish: "light grated nutmeg", hotOrIced: "iced", styleTags: ["oat milk", "maple", "iced latte", "soft daylight"] },
  { slug: "espresso-channeling-causes", title: "Espresso Channeling Causes", drinkColor: "espresso stream with mottled crema", vesselType: "bottomless portafilter and shot glass", garnish: "none", hotOrIced: "hot", styleTags: ["espresso", "diagnostic", "close-up", "barista station"] },
  { slug: "coffee-tonic-with-orange", title: "Coffee Tonic With Orange", drinkColor: "dark espresso layer over pale tonic", vesselType: "tall highball glass", garnish: "orange peel", hotOrIced: "iced", styleTags: ["coffee tonic", "layered", "sparkling", "bright studio light"] },
  { slug: "pour-over-ratio-chart", title: "Pour Over Ratio Chart", drinkColor: "brewed coffee staged with scale and cups", vesselType: "server and tasting cups", garnish: "none", hotOrIced: "hot", styleTags: ["brewing guide", "minimal still life", "clean composition", "daylight"] },
  { slug: "cappuccino-at-home", title: "Cappuccino at Home", drinkColor: "warm chestnut-and-cream cappuccino", vesselType: "small cappuccino cup", garnish: "classic foam cap or simple art", hotOrIced: "hot", styleTags: ["cappuccino", "microfoam", "cafe style", "realistic texture"] },
  { slug: "flash-brew-iced-coffee", title: "Flash Brew Iced Coffee", drinkColor: "clear amber coffee over ice", vesselType: "glass tumbler", garnish: "orange twist", hotOrIced: "iced", styleTags: ["flash brew", "iced coffee", "clarity", "summer drink"] },
  { slug: "aeropress-iced-latte", title: "AeroPress Iced Latte", drinkColor: "light caramel iced milk coffee", vesselType: "short glass with ice", garnish: "none", hotOrIced: "iced", styleTags: ["aeropress", "iced latte", "home setup", "clean counter"] },
  { slug: "vanilla-cardamom-latte", title: "Vanilla Cardamom Latte", drinkColor: "creamy tan latte with warm spice cues", vesselType: "ceramic mug", garnish: "light cardamom dust", hotOrIced: "hot", styleTags: ["spiced latte", "cozy", "premium cafe style", "soft lighting"] },
];

const cocktailSeeds = [
  { slug: "sesame-orange-old-fashioned", title: "Sesame Orange Old Fashioned", drinkColor: "deep amber", glassware: "double rocks glass", garnish: "expressed orange peel and subtle toasted sesame accent", iceStyle: "one large clear cube", settingMood: "moody bar light", styleTags: ["old fashioned", "stirred", "moody bar light", "premium cocktail photography"], baseSpirit: "whiskey" },
  { slug: "yuzu-gimlet-riff", title: "Yuzu Gimlet Riff", drinkColor: "pale yellow-green", glassware: "elegant coupe glass", garnish: "thin yuzu twist", iceStyle: "served up, no ice", settingMood: "refined studio bar light", styleTags: ["gimlet", "citrus", "clean composition", "premium cocktail photography"], baseSpirit: "gin" },
  { slug: "clarified-pineapple-highball", title: "Clarified Pineapple Highball", drinkColor: "pale gold transparent liquid", glassware: "tall highball glass", garnish: "restrained pineapple leaf accent", iceStyle: "clear highball ice", settingMood: "bright modern daylight", styleTags: ["highball", "clarified", "bubbles", "modern editorial"], baseSpirit: "gin" },
  { slug: "rosemary-apricot-spritz", title: "Rosemary Apricot Spritz", drinkColor: "apricot peach sparkling drink", glassware: "large wine glass over ice", garnish: "rosemary sprig and orange slice", iceStyle: "cold cubed ice", settingMood: "bright spring aperitivo table", styleTags: ["spritz", "apricot", "aperitivo", "bright natural light"], baseSpirit: "gin" },
  { slug: "cold-brew-negroni-riff", title: "Cold Brew Negroni Riff", drinkColor: "deep garnet brown", glassware: "double rocks glass over a large clear cube", garnish: "orange peel", iceStyle: "one large clear cube", settingMood: "moody editorial bar setup", styleTags: ["negroni riff", "coffee cocktail", "stirred", "moody editorial"], baseSpirit: "gin" },
  { slug: "smoked-cherry-sour", title: "Smoked Cherry Sour", drinkColor: "deep ruby red", glassware: "double rocks glass", garnish: "brandied cherry and lemon peel", iceStyle: "fresh cold rocks ice", settingMood: "dramatic low-light nightcap bar", styleTags: ["sour", "smoke", "dramatic low light", "premium cocktail photography"], baseSpirit: "rye whiskey" },
  { slug: "pandan-coconut-rum-highball", title: "Pandan Coconut Rum Highball", drinkColor: "clear pale green-gold highball", glassware: "tall highball glass", garnish: "lime peel and pandan leaf knot", iceStyle: "long cold cubes", settingMood: "clean tropical daylight bar", styleTags: ["rum highball", "tropical", "sparkling", "clean composition"], baseSpirit: "rum" },
  { slug: "espresso-tonic-with-citrus-liqueur-twist", title: "Espresso Tonic With Citrus Liqueur Twist", drinkColor: "dark espresso layer over pale tonic", glassware: "tall highball glass", garnish: "orange peel", iceStyle: "clear cubed ice", settingMood: "bright editorial light", styleTags: ["espresso tonic", "layered", "sparkling", "bright editorial light"], baseSpirit: "vodka" },
  { slug: "smoky-pineapple-whisky-sour", title: "Smoky Pineapple Whisky Sour", drinkColor: "golden amber with soft foam edge", glassware: "double rocks glass", garnish: "lemon peel and subtle smoke cue", iceStyle: "one large clear cube", settingMood: "evening bar mood", styleTags: ["whisky sour", "pineapple", "smoky", "evening bar mood"], baseSpirit: "whisky" },
  { slug: "salt-honey-cold-brew-cocktail", title: "Salt-Honey Cold Brew Cocktail", drinkColor: "dark coffee brown with amber highlights", glassware: "double rocks glass over a large cube", garnish: "orange peel", iceStyle: "one large clear cube", settingMood: "moody coffee-cocktail editorial light", styleTags: ["mezcal coffee cocktail", "smoky", "short drink", "moody editorial"], baseSpirit: "mezcal" },
  { slug: "passionfruit-amaro-spritz", title: "Passionfruit Amaro Spritz", drinkColor: "sunset orange-gold sparkling drink", glassware: "large wine glass with ice", garnish: "grapefruit peel", iceStyle: "cubed ice", settingMood: "sunny aperitivo terrace light", styleTags: ["spritz", "amaro", "passionfruit", "aperitivo"], baseSpirit: "amaro" },
  { slug: "fig-black-pepper-manhattan", title: "Fig Black Pepper Manhattan", drinkColor: "deep mahogany", glassware: "Nick and Nora glass", garnish: "expressed orange peel", iceStyle: "served up, no ice", settingMood: "dark polished bar", styleTags: ["manhattan riff", "fig", "pepper", "moody bar light"], baseSpirit: "whiskey" },
  { slug: "cucumber-shiso-gin-fizz", title: "Cucumber Shiso Gin Fizz", drinkColor: "pale green fizz", glassware: "Collins glass", garnish: "cucumber ribbon and shiso leaf", iceStyle: "clear cubed ice", settingMood: "fresh daylight patio light", styleTags: ["gin fizz", "green", "fresh", "daylight"], baseSpirit: "gin" },
  { slug: "grapefruit-rosemary-paloma-riff", title: "Grapefruit Rosemary Paloma Riff", drinkColor: "cloudy blush pink", glassware: "highball glass with ice", garnish: "grapefruit wedge and rosemary sprig", iceStyle: "cubed ice", settingMood: "sunlit weekend patio", styleTags: ["paloma riff", "grapefruit", "sparkling", "sunlit"], baseSpirit: "tequila" },
  { slug: "blackberry-basil-spritz", title: "Blackberry Basil Spritz", drinkColor: "deep berry violet-red", glassware: "large wine glass", garnish: "basil leaf and blackberry", iceStyle: "cubed ice", settingMood: "summer aperitivo light", styleTags: ["spritz", "berry", "basil", "summer aperitivo"], baseSpirit: "amaro" },
  { slug: "coconut-lime-daiquiri-riff", title: "Coconut Lime Daiquiri Riff", drinkColor: "pale ivory-green", glassware: "Nick and Nora glass", garnish: "lime wheel", iceStyle: "served up, no ice", settingMood: "bright tropical studio light", styleTags: ["daiquiri riff", "coconut", "crisp", "studio light"], baseSpirit: "rum" },
  { slug: "pear-cardamom-whiskey-sour", title: "Pear Cardamom Whiskey Sour", drinkColor: "soft gold with pale foam cap", glassware: "double rocks glass", garnish: "thin pear slice", iceStyle: "one large clear cube", settingMood: "autumn bar light", styleTags: ["whiskey sour", "pear", "spice", "autumn"], baseSpirit: "whiskey" },
  { slug: "strawberry-campari-collins", title: "Strawberry Campari Collins", drinkColor: "bright coral red", glassware: "Collins glass with clear ice", garnish: "strawberry slice and lemon peel", iceStyle: "clear cubed ice", settingMood: "fresh afternoon daylight", styleTags: ["collins", "campari", "fruit", "fresh light"], baseSpirit: "campari" },
  { slug: "charred-lemon-martini-riff", title: "Charred Lemon Martini Riff", drinkColor: "clear pale yellow", glassware: "coupe glass", garnish: "charred lemon twist", iceStyle: "served up, no ice", settingMood: "clean luxury bar light", styleTags: ["martini riff", "citrus", "minimal", "clean editorial"], baseSpirit: "vodka" },
  { slug: "plum-sage-bourbon-smash", title: "Plum Sage Bourbon Smash", drinkColor: "rich plum-brown", glassware: "short rocks glass over crushed ice", garnish: "sage leaf and plum slice", iceStyle: "crushed ice", settingMood: "seasonal low afternoon light", styleTags: ["bourbon smash", "plum", "herbal", "seasonal"], baseSpirit: "bourbon" },
];

function inferCoffee(seed) {
  const lower = seed.title.toLowerCase();
  const milkDrink = /latte|cappuccino|flat white|cortado/.test(lower);
  const layered = /dirty latte|layered|tonic/.test(lower);
  const foamTexture = milkDrink ? (lower.includes("cappuccino") ? "thicker milk foam" : lower.includes("iced") || seed.hotOrIced === "iced" ? "minimal foam" : "glossy microfoam") : "no foam";
  const milkTexture = milkDrink ? (seed.hotOrIced === "iced" ? "cold milk base" : "silky steamed milk") : "none";
  const layeringNotes = layered
    ? lower.includes("dirty latte")
      ? "clear visual separation between cold milk base and dark espresso top layer"
      : lower.includes("tonic")
        ? "clear visual contrast between dark coffee layer and pale sparkling base"
        : "visible layered drink structure"
    : undefined;
  const settingMood = seed.hotOrIced === "iced" ? "clean daylight cafe table" : "premium cafe or brew-bar daylight";
  const styleTags = Array.from(new Set(["photorealistic", "premium coffee photography", "clean composition", ...seed.styleTags]));
  const imagePath = `/images/coffee/${seed.slug}.jpg`;
  const imageAlt = layeringNotes
    ? `${seed.title} in ${seed.vesselType}, ${seed.drinkColor}, showing ${layeringNotes}.`
    : `${seed.title} shown as a ${seed.drinkColor} drink in ${seed.vesselType}.`;
  const imageCaption = layeringNotes ? `${seed.title} served in ${seed.vesselType} with ${layeringNotes}.` : `${seed.title} served in ${seed.vesselType}.`;
  const imagePrompt = `Photorealistic premium coffee photography of ${seed.title}. Show the final drink exactly as served: ${seed.drinkColor}, served ${seed.hotOrIced}, in ${seed.vesselType}, with milk texture ${milkTexture}, foam texture ${foamTexture}, layering ${layeringNotes ?? "no dramatic layering"}, garnish ${seed.garnish}, mood ${settingMood}. Style cues: ${styleTags.join(", ")}. Realistic lighting, realistic liquid texture, realistic layering where relevant, clean composition, visually appetizing, no text, no logos, no surreal styling, no inaccurate vessel.`;

  return {
    title: seed.title,
    slug: seed.slug,
    category: "coffee",
    hotOrIced: seed.hotOrIced,
    milkTexture,
    foamTexture,
    vesselType: seed.vesselType,
    drinkColor: seed.drinkColor,
    garnish: seed.garnish,
    layeringNotes,
    settingMood,
    styleTags,
    imagePath,
    visualStatus: "prompt-ready",
    imageAlt,
    imageCaption,
    imagePrompt,
  };
}

function inferCocktail(seed) {
  const styleTags = Array.from(new Set(["photorealistic", "premium cocktail photography", "clean composition", ...seed.styleTags]));
  const imagePath = `/images/cocktails/${seed.slug}.jpg`;
  const imageAlt = `${seed.title} served in a ${seed.glassware} with ${seed.garnish}.`;
  const imageCaption = `A ${seed.drinkColor} ${seed.title} with ${seed.garnish} in ${seed.glassware}.`;
  const imagePrompt = `Photorealistic premium cocktail photography of ${seed.title}. Show the final drink exactly as served: ${seed.drinkColor}, in ${seed.glassware}, ice style ${seed.iceStyle}, garnish ${seed.garnish}, mood ${seed.settingMood}. Flavor cues should visually fit the recipe and feel believable for ${seed.baseSpirit}. Style cues: ${styleTags.join(", ")}. Realistic lighting, realistic ice and liquid texture, accurate glassware, accurate garnish, premium editorial drink photography, no text, no logos, no fantasy styling.`;

  return {
    title: seed.title,
    slug: seed.slug,
    category: "cocktails",
    glassware: seed.glassware,
    garnish: seed.garnish,
    drinkColor: seed.drinkColor,
    iceStyle: seed.iceStyle,
    vesselType: seed.glassware,
    settingMood: seed.settingMood,
    styleTags,
    imagePath,
    visualStatus: "prompt-ready",
    imageAlt,
    imageCaption,
    imagePrompt,
  };
}

const coffeeSamples = coffeeSeeds.map(inferCoffee);
const cocktailSamples = cocktailSeeds.map(inferCocktail);

const outDir = path.join(process.cwd(), "content", "image-prompts");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "coffee-image-prompts.json"), JSON.stringify(coffeeSamples, null, 2));
fs.writeFileSync(path.join(outDir, "cocktail-image-prompts.json"), JSON.stringify(cocktailSamples, null, 2));

const markdown = [
  "# Image Prompt Library",
  "",
  "## Coffee Sample Metadata",
  ...coffeeSamples.flatMap((item) => [
    `### ${item.title}`,
    '```json',
    JSON.stringify(item, null, 2),
    '```',
    "",
  ]),
  "## Cocktail Sample Metadata",
  ...cocktailSamples.flatMap((item) => [
    `### ${item.title}`,
    '```json',
    JSON.stringify(item, null, 2),
    '```',
    "",
  ]),
].join("\n");
fs.writeFileSync(path.join(outDir, "image-prompt-library.md"), markdown);

console.log(`Wrote ${coffeeSamples.length} coffee metadata objects and ${cocktailSamples.length} cocktail metadata objects.`);
