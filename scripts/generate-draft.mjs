import fs from "node:fs";
import path from "node:path";
import {
  buildDraftFromBrief,
  findBrief,
  loadBriefLibrary,
  renderSystemPrompt,
  renderUserPrompt,
  validateDraftText,
} from "./article-workflow-utils.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.join("=")];
  }),
);

const briefLibraryPath = args.briefLibrary || path.join(process.cwd(), "content", "briefs", "sample-briefs.json");
const selector = args.brief || args.slug || args.title;

if (!selector) {
  throw new Error("Pass --brief=<recommendedUrlSlug|slug|workingTitle> to generate a draft from a brief.");
}

const briefs = loadBriefLibrary(briefLibraryPath);
const brief = findBrief(briefs, selector);

if (!brief) {
  throw new Error(`Brief not found for selector: ${selector}`);
}

const { draft, score } = buildDraftFromBrief(brief);
validateDraftText(draft);

const slug = brief.recommendedUrlSlug.split("/").pop();
const outputDir = path.join(process.cwd(), "content", "drafts");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, `${slug}.md`), draft);
fs.writeFileSync(
  path.join(outputDir, `${slug}.quality.json`),
  JSON.stringify(
    {
      brief: brief.workingTitle,
      recommendedUrlSlug: brief.recommendedUrlSlug,
      score,
      systemPrompt: renderSystemPrompt(),
      userPrompt: renderUserPrompt(brief),
    },
    null,
    2,
  ) + "\n",
);

console.log(`Draft created: ${path.join(outputDir, `${slug}.md`)}`);
