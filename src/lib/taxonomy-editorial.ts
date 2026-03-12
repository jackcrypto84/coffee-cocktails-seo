import { ContentCategory } from "@/lib/content-types";

export type TaxonomyEditorial = {
  intro: string;
  whyItMatters: string;
  whatReadersNeed: string[];
  faq: { question: string; answer: string }[];
  recommendedLinks: { href: string; label: string; note: string }[];
};

const brewingMethodEditorial: Record<string, TaxonomyEditorial> = {
  "pour-over": {
    intro:
      "Pour-over pages should earn their keep by helping readers control extraction, not by romanticizing hand-poured coffee. The strongest content here solves sweetness, clarity, and repeatability problems with practical recipe choices.",
    whyItMatters:
      "This cluster is where new brewers often build trust in the site. It should connect beginner-friendly recipes with deeper troubleshooting pages so readers can move from 'what recipe should I use?' to 'what changed in the cup?' without leaving the cluster.",
    whatReadersNeed: [
      "A baseline recipe they can repeat before changing variables.",
      "Troubleshooting guidance for bitterness, flat cups, and bloom problems.",
      "Clear next-step links into grind, water, and bean-selection topics.",
    ],
    faq: [
      {
        question: "What should a good pour-over hub actually help with?",
        answer:
          "It should help readers choose a recipe, diagnose why a cup tastes off, and understand which variables matter most before they chase more gear.",
      },
      {
        question: "When does a pour-over topic deserve its own article?",
        answer:
          "When the page can teach a distinct adjustment or solve a recurring brew problem. If it only repeats generic ratio advice, it is not strong enough yet.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/v60-bloom-timing-guide", label: "V60 bloom timing guide", note: "Best next read for saturation and drawdown issues." },
      { href: "/coffee/why-your-pour-over-tastes-bitter", label: "Bitter pour-over fixes", note: "Useful when a baseline recipe still finishes harsh or muddy." },
      { href: "/ingredients/coffee-beans", label: "Coffee beans hub", note: "Use this when the recipe is stable but bean choice is the limiter." },
    ],
  },
  espresso: {
    intro:
      "Espresso content has a high bar because readers usually arrive with a real problem: channeling, thin shots, sour-bitter confusion, or ratio drift. The cluster should feel diagnostic, not dogmatic.",
    whyItMatters:
      "This is one of the strongest authority clusters on the site because it attracts motivated readers who are willing to test changes immediately. Pages here should connect yield, puck prep, milk drinks, and workflow repeatability.",
    whatReadersNeed: [
      "Actionable diagnosis rather than abstract espresso theory.",
      "Logical next-step articles for ratio, puck prep, and milk integration.",
      "Clear signals about what still needs firsthand testing or machine-specific verification.",
    ],
    faq: [
      {
        question: "What makes an espresso hub more useful than a generic beginner guide?",
        answer:
          "It should help readers tell one problem from another. Fast shots, bitter shots, and channeling can overlap, but they do not always need the same fix.",
      },
      {
        question: "Should espresso cluster pages target beginners or enthusiasts?",
        answer:
          "Mostly intermediate and enthusiast readers, but the writing still needs to stay practical enough for someone improving a home workflow rather than chasing cafe-level jargon.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/espresso-yield-ratios-explained", label: "Espresso yield ratios explained", note: "Start here if the shot structure itself is unclear." },
      { href: "/coffee/microfoam-at-home", label: "Microfoam at home", note: "Useful once shot quality meets milk-drink technique." },
      { href: "/coffee", label: "Coffee hub", note: "Broader route back to gear, beans, and troubleshooting clusters." },
    ],
  },
  "milk-drinks": {
    intro:
      "Milk-drink pages need to bridge espresso quality and milk texture instead of treating them as separate worlds. Readers usually want a better latte or cappuccino, not a lecture about foam.",
    whyItMatters:
      "This cluster can capture beginners and intermediate home baristas who care about cafe-style drinks, but it only works if the pages explain how milk volume, foam quality, and shot structure change the final cup.",
    whatReadersNeed: [
      "Texture guidance that works on ordinary home steam wands.",
      "Clear links between espresso strength and milk dilution.",
      "Comparisons between common drink styles rather than vague cafe language.",
    ],
    faq: [
      {
        question: "What should milk-drink pages cover besides steaming technique?",
        answer:
          "They should also explain drink size, shot structure, milk-to-espresso balance, and how bean choice changes what still shows through the milk.",
      },
      {
        question: "Why do milk-drink pages often turn thin?",
        answer:
          "Because they stop at latte art or foam language instead of helping readers fix the actual drink in the cup.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/microfoam-at-home", label: "Microfoam at home", note: "Best first read for texture problems." },
      { href: "/coffee/decaf-for-espresso-milk-drinks", label: "Decaf for espresso milk drinks", note: "Shows how bean choice changes milk-drink results." },
      { href: "/coffee/espresso-yield-ratios-explained", label: "Espresso yield ratios", note: "Helpful when the milk is fine but the shot disappears." },
    ],
  },
};

const ingredientEditorial: Record<string, TaxonomyEditorial> = {
  gin: {
    intro:
      "Gin hubs work best when they separate botanical brightness from generic 'refreshing cocktail' language. The cluster should explain where gin behaves crisply, where it turns perfumed, and what ingredients sharpen or soften it.",
    whyItMatters:
      "Gin gives the site a practical way to connect gimlets, highballs, and bitter riffs without treating every recipe as a martini cousin.",
    whatReadersNeed: [
      "Clear paths into citrus-led drinks, spritzes, and spirit-forward structures.",
      "Guidance on when a clean London dry works better than a softer modern gin.",
      "More original recipes before the hub tries to scale aggressively.",
    ],
    faq: [
      {
        question: "What makes a gin ingredient page useful?",
        answer:
          "It should help readers understand where gin brings structure, where it needs support, and which related drinks solve a nearby flavor problem.",
      },
      {
        question: "Should this page cover every gin style?",
        answer:
          "Not until the content set is larger. It is better to connect a few strong recipe families than pretend the cluster is broader than it is.",
      },
    ],
    recommendedLinks: [
      { href: "/cocktails/yuzu-gimlet-riff", label: "Yuzu gimlet riff", note: "Strong fit for citrus-led gin readers." },
      { href: "/cocktails/clarified-pineapple-highball", label: "Clarified pineapple highball", note: "Shows gin in a drier tall-drink format." },
      { href: "/flavor-profile/citrus-forward", label: "Citrus-forward flavor hub", note: "Useful for readers following brightness rather than base spirit." },
    ],
  },
  "rye-whiskey": {
    intro:
      "Rye whiskey pages should emphasize structure, spice, and finish. The strongest angle is not just 'whiskey cocktails' but why rye keeps stirred and sour builds tighter than softer bases.",
    whyItMatters:
      "This cluster supports spirit-forward riffs, smoke-adjacent sours, and savory flavor pairing articles. It is commercially useful too, but only if the editorial angle stays specific.",
    whatReadersNeed: [
      "Examples of where rye improves definition instead of just adding booziness.",
      "Internal links into old fashioned riffs and sour structures.",
      "Better depth before broad roundup-style pages go live.",
    ],
    faq: [
      {
        question: "Why does rye deserve its own ingredient hub?",
        answer:
          "Because its dry spice profile changes drink structure in ways readers can actually use when choosing between whiskey styles.",
      },
      {
        question: "Is rye only for stirred drinks?",
        answer:
          "No. It can also sharpen sours and smoke-led cocktails, provided the fruit and sweetness stay controlled.",
      },
    ],
    recommendedLinks: [
      { href: "/cocktails/sesame-orange-old-fashioned", label: "Sesame orange old fashioned", note: "Best fit for readers interested in savory-spiced stirred drinks." },
      { href: "/cocktails/smoked-cherry-sour", label: "Smoked cherry sour", note: "Shows rye in a brighter, more aromatic template." },
      { href: "/flavor-profile/bittersweet", label: "Bittersweet flavor hub", note: "Useful for readers following structure rather than just spirit choice." },
    ],
  },
  "coffee-beans": {
    intro:
      "A coffee-beans hub should help readers buy and brew more intelligently, not just romanticize origin language. The strongest version ties roast development, freshness, and brew-fit together.",
    whyItMatters:
      "This page can become one of the site's best commercial and educational bridges if it connects bean selection to real cup outcomes instead of generic tasting-note language.",
    whatReadersNeed: [
      "Clear links between bean choice and brew method behavior.",
      "Practical next steps for roast style, decaf, and milk-drink fit.",
      "More supporting articles on freshness, roast levels, and flavor-note logic.",
    ],
    faq: [
      {
        question: "What should a coffee-beans hub solve first?",
        answer:
          "It should help readers choose beans that fit their brew method and flavor goals before it chases broad origin education.",
      },
      {
        question: "Why is bean-selection content easy to make generic?",
        answer:
          "Because it often repeats bag-note language without explaining what those choices actually change in extraction or in milk drinks.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/decaf-for-espresso-milk-drinks", label: "Decaf for espresso milk drinks", note: "Strong buying-intent page tied to real drink outcomes." },
      { href: "/coffee/v60-bloom-timing-guide", label: "V60 bloom timing guide", note: "Useful when bean age and gas release are changing the brew." },
      { href: "/coffee", label: "Coffee hub", note: "Route back to the broader brewing and troubleshooting archive." },
    ],
  },
  citrus: {
    intro:
      "Citrus pages need a real point of view because citrus is too broad to carry a taxonomy page on volume alone. The useful angle is how citrus changes balance, aroma, and perceived dryness in drinks.",
    whyItMatters:
      "Right now this hub is more of a bridge node than a destination. It becomes worthwhile when more citrus-led cocktail pages and balance guides exist around it.",
    whatReadersNeed: [
      "A clear split between citrus as acid, citrus as aroma, and citrus as sweetness perception.",
      "Links into gimlets, spritzes, and bittersweet drinks where citrus does different jobs.",
      "Editorial restraint so the page does not duplicate the citrus-forward flavor hub.",
    ],
    faq: [
      {
        question: "Should citrus be an ingredient hub or a flavor hub?",
        answer:
          "It can be both, but only if the ingredient page focuses on balance mechanics while the flavor page focuses on taste profile and reader intent.",
      },
      {
        question: "When should this page be consolidated?",
        answer:
          "If the article count stays low and the page cannot say anything distinct from the citrus-forward flavor hub, consolidation is the stronger editorial move.",
      },
    ],
    recommendedLinks: [
      { href: "/cocktails/yuzu-gimlet-riff", label: "Yuzu gimlet riff", note: "Best example of citrus precision in the current library." },
      { href: "/cocktails/rosemary-apricot-spritz", label: "Rosemary apricot spritz", note: "Shows citrus working as lift rather than the main flavor center." },
      { href: "/flavor-profile/citrus-forward", label: "Citrus-forward flavor hub", note: "Use this when the reader is chasing profile rather than ingredient logic." },
    ],
  },
};

const flavorProfileEditorial: Record<string, TaxonomyEditorial> = {
  chocolatey: {
    intro:
      "Chocolatey pages should distinguish comfort and structure from dullness. The useful editorial angle is why these profiles often perform well in milk drinks, bitter cocktails, and beginner-friendly coffee choices without becoming flat.",
    whyItMatters:
      "This profile bridges both site halves and can become a strong monetization-supportive cluster once more bean guides and dessert-adjacent drinks are live.",
    whatReadersNeed: [
      "Examples of where chocolatey profiles feel comforting versus muddy.",
      "Clear pathways into beans, espresso, and bitter cocktail riffs.",
      "More support content before broad roundup language appears.",
    ],
    faq: [
      {
        question: "Why do chocolatey profiles matter for both coffee and cocktails?",
        answer:
          "Because they often signal structure, roundness, and lower-acid appeal in both categories, making them a useful cross-site bridge for readers.",
      },
      {
        question: "What is the risk with chocolatey content?",
        answer:
          "It can become generic quickly if the page only repeats comforting tasting-note language without showing how those notes behave in the cup or glass.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/decaf-for-espresso-milk-drinks", label: "Decaf for milk drinks", note: "Useful for readers choosing cocoa-forward coffee profiles." },
      { href: "/cocktails/cold-brew-negroni-riff", label: "Cold brew negroni riff", note: "Shows chocolate-adjacent bitterness in a stirred cocktail context." },
      { href: "/ingredients/coffee-beans", label: "Coffee beans hub", note: "Helpful when the reader wants the buying logic behind the flavor profile." },
    ],
  },
  "citrus-forward": {
    intro:
      "Citrus-forward pages work when they explain lift, aroma, and finish rather than reducing everything to 'bright.' Readers need to know whether the brightness comes from acidity, peel aroma, or bitter structure.",
    whyItMatters:
      "This is one of the most natural bridges between coffee and cocktails on the site, but it only feels authoritative if the page connects those meanings carefully instead of flattening them into one descriptor.",
    whatReadersNeed: [
      "Examples of citrus showing up differently in brew flavor versus mixed-drink structure.",
      "Paths into gimlets, spritzes, bloom timing, and other lift-oriented topics.",
      "Language that separates lively from sharp or perfumed.",
    ],
    faq: [
      {
        question: "Does citrus-forward always mean acidic?",
        answer:
          "No. In cocktails it may come more from peel aroma or bitter-citrus structure, while in coffee it can show up as both aroma and acidity.",
      },
      {
        question: "Why is this profile good for internal linking?",
        answer:
          "Because readers following brightness often move naturally between pour-over clarity, gin drinks, spritzes, and citrus-balance guides.",
      },
    ],
    recommendedLinks: [
      { href: "/coffee/v60-bloom-timing-guide", label: "V60 bloom timing guide", note: "Good fit for readers chasing cleaner, brighter cups." },
      { href: "/cocktails/yuzu-gimlet-riff", label: "Yuzu gimlet riff", note: "Strong example of citrus precision in cocktails." },
      { href: "/ingredients/citrus", label: "Citrus ingredient hub", note: "Use when the reader needs ingredient logic rather than profile logic." },
    ],
  },
  floral: {
    intro:
      "Floral pages should be careful, because floral is one of the easiest descriptors to make vague. The page becomes useful only when it explains restraint, fragility, and the line between elegant and perfumed.",
    whyItMatters:
      "This cluster is high-risk for thinness right now, so the editorial job is to keep the page honest about where the library is still growing.",
    whatReadersNeed: [
      "Examples of where floral notes add lift and where they collapse into soapiness.",
      "Links into yuzu, apricot, and lighter coffee guidance that uses floral notes carefully.",
      "Editorial guardrails against overclaiming complexity where the archive is still shallow.",
    ],
    faq: [
      {
        question: "Why is floral content so easy to get wrong?",
        answer:
          "Because the descriptor sounds premium, so weak pages often use it without explaining intensity, restraint, or how it changes recipe choices.",
      },
      {
        question: "Should the floral hub scale quickly?",
        answer:
          "No. It is better to keep the page modest and accurate until there are enough strong supporting articles to justify expansion.",
      },
    ],
    recommendedLinks: [
      { href: "/cocktails/yuzu-gimlet-riff", label: "Yuzu gimlet riff", note: "Best current example of keeping bright floral-adjacent notes precise." },
      { href: "/cocktails/rosemary-apricot-spritz", label: "Rosemary apricot spritz", note: "Shows how aromatic lift needs structure to stay coherent." },
      { href: "/coffee", label: "Coffee hub", note: "Broader route back to coffee pages while the floral cluster is still growing." },
    ],
  },
  bittersweet: {
    intro:
      "Bittersweet pages should emphasize control, not punishment. The value here is helping readers understand how bitterness can create structure when sweetness and dilution stay disciplined.",
    whyItMatters:
      "This is currently the strongest flavor taxonomy angle on the cocktail side because it connects stirred drinks, coffee cocktails, and smoke-adjacent builds without losing editorial coherence.",
    whatReadersNeed: [
      "A distinction between articulate bitterness and blunt harshness.",
      "Links into Negroni-style riffs, old fashioned variations, and smoke-led drinks.",
      "More examples of how bitterness changes finish and repeatability.",
    ],
    faq: [
      {
        question: "What makes a bittersweet page useful instead of generic?",
        answer:
          "It should explain why bitterness improves structure in some drinks and ruins balance in others, with links to concrete examples.",
      },
      {
        question: "Is bittersweet only a cocktail concept?",
        answer:
          "Mostly on this site right now, but the same logic about finish and restraint can support coffee-cocktail crossovers too.",
      },
    ],
    recommendedLinks: [
      { href: "/cocktails/cold-brew-negroni-riff", label: "Cold brew negroni riff", note: "Best current example of layered, dry bitterness." },
      { href: "/cocktails/sesame-orange-old-fashioned", label: "Sesame orange old fashioned", note: "Shows bittersweet structure in a savory-spiced direction." },
      { href: "/cocktails/smoked-cherry-sour", label: "Smoked cherry sour", note: "Useful for readers who want bitterness with more acidity and aroma." },
    ],
  },
};

export function getBrewingMethodEditorial(slug: string) {
  return brewingMethodEditorial[slug];
}

export function getIngredientEditorial(slug: string) {
  return ingredientEditorial[slug];
}

export function getFlavorProfileEditorial(slug: string) {
  return flavorProfileEditorial[slug];
}

export function formatAppliesTo(categories: ContentCategory[]) {
  return categories.length === 2 ? "coffee and cocktails" : categories[0];
}
