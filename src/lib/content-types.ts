export type ContentCategory = "coffee" | "cocktails";
export type ContentStatus = "published" | "draft";
export type VisualStatus = "image-ready" | "prompt-ready" | "needs-visual-brief" | "needs-review";

export type RichSection =
  | {
      type: "paragraphs";
      title: string;
      paragraphs: string[];
    }
  | {
      type: "steps";
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "checklist";
      title: string;
      items: string[];
    };

export type FAQ = {
  question: string;
  answer: string;
};

export type ComparisonItem = {
  label: string;
  bestFor: string;
  why: string;
};

export type FeaturedProduct = {
  name: string;
  category: string;
  bestFor: string;
  affiliateLabel: string;
  notes: string;
};

export type NotesBlock = {
  summary: string;
  items: string[];
};

export type SourceReference = {
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type Citation = {
  section: string;
  sourceTitle: string;
  publisher: string;
  url: string;
  note: string;
};

export type SeoSettings = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  noindex?: boolean;
  schemaType?: "Article" | "Recipe";
};

export type Article = {
  slug: string;
  category: ContentCategory;
  status: ContentStatus;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  heroKicker: string;
  authorSlug: string;
  tags: string[];
  featured: boolean;
  searchIntent: "informational" | "commercial" | "mixed";
  beanNotes?: string[];
  brewingMethods?: string[];
  flavorProfiles?: string[];
  spiritBases?: string[];
  occasions?: string[];
  seasons?: string[];
  ingredients?: string[];
  verificationNotes: string[];
  intro: string[];
  sections: RichSection[];
  faq: FAQ[];
  imageAlt?: string;
  imagePrompt?: string;
  imagePath?: string;
  imageCaption?: string;
  visualStatus?: VisualStatus;
  glassware?: string;
  garnish?: string;
  drinkColor?: string;
  iceStyle?: string;
  hotOrIced?: "hot" | "iced" | "room-temperature";
  foamTexture?: string;
  milkTexture?: string;
  vesselType?: string;
  settingMood?: string;
  styleTags?: string[];
  layeringNotes?: string;
  needsImageGeneration?: boolean;
  visualValidationIssues?: string[];
  ogImagePath?: string;
  comparison?: {
    title: string;
    intro: string;
    items: ComparisonItem[];
  };
  featuredProducts?: FeaturedProduct[];
  reviewedBySlugs?: string[];
  testedBySlugs?: string[];
  lastReviewedAt?: string;
  affiliateDisclosure?: string;
  testingNotes?: NotesBlock;
  tastingNotes?: NotesBlock;
  equipmentUsed?: string[];
  recipeIterationNotes?: string[];
  sourceReferences?: SourceReference[];
  citations?: Citation[];
  seo?: SeoSettings;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  domainExpertise: string[];
  credentials: string[];
  reviewFocus: string;
  testingMethodology: string;
  disclosure: string;
};

export type Ingredient = {
  slug: string;
  name: string;
  description: string;
  angle: string;
};

export type BrewingMethod = {
  slug: string;
  name: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  description: string;
};

export type FlavorProfile = {
  slug: string;
  name: string;
  description: string;
  appliesTo: ("coffee" | "cocktails")[];
};
