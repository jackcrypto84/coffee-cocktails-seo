import { Author } from "@/lib/content-types";

export const authors: Author[] = [
  {
    slug: "maya-chen",
    name: "Maya Chen",
    role: "Coffee Editor",
    bio: "Maya tests home-brewing workflows with an emphasis on repeatability, sensory clarity, and honest troubleshooting for everyday setups.",
    expertise: ["Pour-over", "Espresso dialing", "Milk texturing", "Coffee education"],
    domainExpertise: ["Brew recipe design", "Extraction troubleshooting", "Home espresso workflow", "Milk drink structure"],
    credentials: [
      "Develops side-by-side brew tests for home equipment",
      "Documents recipe changes with taste and drawdown notes",
      "Reviews education-focused coffee content before publication",
    ],
    reviewFocus: "Looks for unsupported flavor claims, vague recipe advice, and technique steps that are not reproducible on common home setups.",
    testingMethodology:
      "Uses repeated brew runs, controlled ratio and grind adjustments, and side-by-side sensory comparisons before practical recommendations are finalized.",
    disclosure:
      "Editorial judgments come first. Product mentions are included only when they clarify a real brewing decision or workflow bottleneck.",
  },
  {
    slug: "julian-vale",
    name: "Julian Vale",
    role: "Cocktail Editor",
    bio: "Julian develops original drinks with a chef-minded approach to aroma, acidity, dilution, and seasonal ingredient pairings.",
    expertise: ["Original cocktails", "Home bar technique", "Flavor design", "Zero-filler recipe development"],
    domainExpertise: ["Cocktail structure", "Dilution and texture", "Riff development", "Ingredient pairing logic"],
    credentials: [
      "Builds iterative tasting rounds before finalizing recipes",
      "Reviews recipes for realistic home-bar execution",
      "Documents substitutions that preserve structure instead of just ingredients",
    ],
    reviewFocus: "Checks for balance drift, implausible substitutions, and recipes that sound creative but do not stay coherent in the glass.",
    testingMethodology:
      "Bench-tests drinks across dilution windows, garnish changes, and sweetness adjustments so final recipes read clearly from first sip to finish.",
    disclosure:
      "Recommendations favor drinks and techniques worth repeating at home, not novelty for its own sake or filler built around affiliate slots.",
  },
];
