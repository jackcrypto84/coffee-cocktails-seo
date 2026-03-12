import fs from "node:fs";
import path from "node:path";
import { buildDraftFromBrief, findBrief, loadBriefLibrary, validateDraftText } from "./article-workflow-utils.mjs";

const briefs = loadBriefLibrary(path.join(process.cwd(), "content", "briefs", "sample-briefs.json"));
const selectors = ["/coffee/v60-recipe-for-hard-water", "/cocktails/how-to-build-a-sesame-whiskey-cocktail"];
const outputDir = path.join(process.cwd(), "content", "drafts", "samples");
fs.mkdirSync(outputDir, { recursive: true });

for (const selector of selectors) {
  const brief = findBrief(briefs, selector);
  if (!brief) throw new Error(`Sample brief not found: ${selector}`);
  const { draft, score } = buildDraftFromBrief(brief);
  validateDraftText(draft);
  const slug = brief.recommendedUrlSlug.split("/").pop();
  fs.writeFileSync(path.join(outputDir, `${slug}.md`), draft);
  fs.writeFileSync(path.join(outputDir, `${slug}.quality.json`), JSON.stringify(score, null, 2) + "\n");
}

console.log("Sample drafts generated.");
