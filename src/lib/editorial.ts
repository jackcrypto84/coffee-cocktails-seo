import { Article, Citation, NotesBlock, SourceReference } from "@/lib/content-types";

const coffeeEquipment = [
  "Burr grinder with recorded grind setting",
  "Gooseneck kettle or temperature-stable kettle",
  "Scale with timer",
  "Primary brewer and paper filter used during testing",
];

const cocktailEquipment = [
  "Jigger with consistent measurement marks",
  "Mixing glass or shaker appropriate to the build",
  "Bar spoon or strainer used in final testing round",
  "Ice format noted during tasting and dilution checks",
];

const coffeeSources: SourceReference[] = [
  {
    title: "Specialty Coffee Association",
    publisher: "SCA",
    url: "https://sca.coffee/",
    note: "Use for standards-adjacent coffee education and terminology checks before publishing technique claims.",
  },
  {
    title: "World Coffee Research",
    publisher: "World Coffee Research",
    url: "https://worldcoffeeresearch.org/",
    note: "Useful for coffee variety, sensory, and green-coffee context when a guide moves beyond pure workflow advice.",
  },
];

const cocktailSources: SourceReference[] = [
  {
    title: "Difford's Guide",
    publisher: "Difford's Guide",
    url: "https://www.diffordsguide.com/",
    note: "Useful for cross-checking classic structures, technique terminology, and family resemblance when building riffs.",
  },
  {
    title: "IBA Official Cocktails",
    publisher: "International Bartenders Association",
    url: "https://iba-world.com/",
    note: "Useful when an article references classic templates, ratios, or widely accepted naming conventions.",
  },
];

export function buildAffiliateDisclosure(article: Article) {
  if (!article.featuredProducts?.length) {
    return "Grounded & Stirred may include future affiliate-ready recommendation slots, but editorial decisions and technique advice are written independently of monetization opportunities.";
  }

  return "Some gear or product blocks on this page may become affiliate links after editorial review. Recommendations are included only when they help solve the specific workflow problem discussed in the article.";
}

export function buildTestingNotes(article: Article): NotesBlock {
  if (article.category === "coffee") {
    const method = article.brewingMethods?.[0] || "home brewing";
    return {
      summary: `Recommendations were framed for repeatable ${method} workflows rather than one-off hero brews.` ,
      items: [
        "Hold dose and brew ratio steady while changing only one main variable at a time.",
        "Record drawdown time, agitation changes, and finish quality across at least two comparison brews before locking advice.",
        "Flag any grinder-specific, roast-specific, or water-specific claims for human verification before publication.",
      ],
    };
  }

  return {
    summary: "Recipe notes assume iterative home-bar testing instead of a single pass from concept to final copy.",
    items: [
      "Taste the drink at first sip and after a short dilution window to check whether balance collapses over time.",
      "Retest garnish, sweetness, and dilution separately so one adjustment does not hide another.",
      "Mark any claims about ingredient equivalence, batching stability, or spirit substitution for human verification before publishing.",
    ],
  };
}

export function buildTastingNotes(article: Article): NotesBlock {
  if (article.category === "coffee") {
    return {
      summary: "Sensory notes should describe what changed in the cup, not just whether the result was 'better.'",
      items: [
        "Note whether the finish becomes cleaner, drier, muddier, or more hollow after each adjustment.",
        "Separate sweetness, acidity, and texture observations so troubleshooting advice stays specific.",
        "If tasting notes depend on a particular coffee origin or roast style, add a human-tested note before publication.",
      ],
    };
  }

  return {
    summary: "Cocktail tasting notes should track aroma, entry, mid-palate, and finish so riffs stay structurally honest.",
    items: [
      "Check whether sweetness lands first or whether the base spirit still holds the center of the drink.",
      "Taste again after dilution changes to confirm the drink remains coherent instead of merely softer.",
      "If garnish or aroma claims materially change the drink, add a firsthand tasting note before publication.",
    ],
  };
}

export function buildRecipeIterationNotes(article: Article) {
  if (article.category === "coffee") {
    return [
      "Log the reset recipe first, then note what happened when grind, temperature, or agitation changed independently.",
      "Keep at least one failed version in the editorial notes so readers see what overcorrection looked like in practice.",
      "If a recommendation only worked for one roast style, label that limitation clearly instead of presenting it as universal.",
    ];
  }

  return [
    "Document the version that tasted too sweet, too smoky, or too soft so the final recipe shows intentional restraint.",
    "Track how ice format and dilution changed the finish before adjusting syrup or acid again.",
    "If a substitution changes the drink family, say so directly instead of pretending it is a drop-in replacement.",
  ];
}

export function buildEquipmentUsed(article: Article) {
  return article.category === "coffee" ? coffeeEquipment : cocktailEquipment;
}

export function buildSourceReferences(article: Article) {
  return article.category === "coffee" ? coffeeSources : cocktailSources;
}

export function buildCitations(article: Article): Citation[] {
  if (article.category === "coffee") {
    return [
      {
        section: "Fact-based brewing standards and terminology",
        sourceTitle: "Specialty Coffee Association",
        publisher: "SCA",
        url: "https://sca.coffee/",
        note: "Use when checking standards language, brewing terminology, and education-adjacent technical claims.",
      },
      {
        section: "Coffee variety and sensory context",
        sourceTitle: "World Coffee Research",
        publisher: "World Coffee Research",
        url: "https://worldcoffeeresearch.org/",
        note: "Use when a section relies on variety, sensory vocabulary, or coffee-production context rather than direct brew testing.",
      },
    ];
  }

  return [
    {
      section: "Classic structures and naming conventions",
      sourceTitle: "IBA Official Cocktails",
      publisher: "International Bartenders Association",
      url: "https://iba-world.com/",
      note: "Use when a section compares an original drink against a classic family or accepted template.",
    },
    {
      section: "Technique cross-checks and recipe-family context",
      sourceTitle: "Difford's Guide",
      publisher: "Difford's Guide",
      url: "https://www.diffordsguide.com/",
      note: "Use when validating terminology, cocktail families, and practical technique references.",
    },
  ];
}
