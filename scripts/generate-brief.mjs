import path from "node:path";
import { buildBriefRecord, renderBriefMarkdown } from "./brief-utils.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.join("=")];
  }),
);

const title = args.title || "New Article Brief";
const category = args.category || "coffee";
const keyword = args.keyword || title.toLowerCase();
const slug = args.slug || `/${category}/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const brief = buildBriefRecord({
  category,
  primaryKeyword: keyword,
  searchIntent: args.intent || "informational",
  readerPersona: args.persona || "Engaged home enthusiast who wants practical, tested guidance",
  angleOfDifferentiation:
    args.angle ||
    "Push beyond generic SEO summaries with practical adjustments, explicit tradeoffs, and notes that tell the editor what must be tested or verified.",
  workingTitle: title,
  metaTitle: args.metaTitle || `${title} | Grounded & Stirred`,
  metaDescription:
    args.metaDescription ||
    "Create a tested, distinctive article brief with practical adjustments, troubleshooting logic, and human-verification checkpoints.",
  recommendedUrlSlug: slug,
  h1: args.h1 || title,
  outline: [
    {
      h2: "What problem this page should solve",
      h3: [
        "State the exact reader frustration or decision",
        "Explain why generic advice usually misses the useful nuance",
      ],
    },
    {
      h2: "Practical framework or recipe logic",
      h3: [
        "Show what to change first",
        "Explain what sensory outcome each change should produce",
        "Call out the most common mistake",
      ],
    },
    {
      h2: "Troubleshooting and edge cases",
      h3: [
        "What to do when the first fix does not work",
        "When gear, ingredients, or water quality change the answer",
      ],
    },
  ],
  faqIdeas: [
    "What is the most common mistake with this topic?",
    "How should the reader adjust for different gear or ingredients?",
    "What needs hands-on testing before publication?",
  ],
  internalLinks: ["/coffee", "/cocktails", "/guides"],
  externalEvidenceNeeded: [
    "Any factual chemistry, safety, or historical claims",
    "Any named product specifications or availability statements",
  ],
  productAffiliateOpportunities: [
    "One best-for comparison block tied to a real bottleneck",
    "One featured tool or ingredient slot only if it directly helps the reader solve the problem",
  ],
  originalityNotes: [
    "Add at least one side-by-side test or workflow comparison.",
    "Explain not just what to do, but what sensory change the reader should notice.",
    "Include one non-obvious mistake or tradeoff that generic AI copy usually skips.",
  ],
  sectionsRequiringHumanExpertiseOrTesting: [
    "Any recipe, brew parameter, tasting note, or sensory claim",
    "Any product-performance recommendation",
    "Any food-safety or shelf-life guidance",
  ],
  imageIdeas: [
    "Process photo of the key adjustment or setup",
    "Annotated diagram showing the main decision point",
  ],
  ctaIdeas: [
    "Invite the reader to subscribe for tested recipes and troubleshooting notes",
    "Offer a related gear or ingredient guide only if it advances the workflow",
  ],
});

const markdown = renderBriefMarkdown(brief);
const outputPath = path.join(process.cwd(), "content", "briefs", `${brief.recommendedUrlSlug.split("/").pop()}.md`);
await import("node:fs").then(({ default: fs }) => {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, markdown);
});

console.log(`Brief created: ${outputPath}`);
