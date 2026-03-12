import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildRecommendationsForPool,
  loadLinkingInputs,
  selectSampleRecords,
  toMarkdownReport,
  toRuntimeJson,
} from "./internal-linking-utils.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeOutputPath = path.join(rootDir, "src", "content", "generated", "internal-links.json");
const sampleOutputPath = path.join(rootDir, "content", "linking", "sample-link-recommendations.json");
const reportOutputPath = path.join(rootDir, "docs", "internal-linking-strategy.md");

async function main() {
  const { rules, overrides, liveArticles, strategyArticles } = await loadLinkingInputs();
  const runtimePlans = buildRecommendationsForPool(liveArticles, rules, overrides);
  const sampleRecords = selectSampleRecords(liveArticles, strategyArticles);
  const samplePool = {
    coffee: [
      ...liveArticles.filter((item) => item.category === "coffee"),
      ...strategyArticles.filter((item) => item.category === "coffee").slice(0, 14),
    ],
    cocktails: [
      ...liveArticles.filter((item) => item.category === "cocktails"),
      ...strategyArticles.filter((item) => item.category === "cocktails").slice(0, 14),
    ],
  };

  const samplePlans = {
    coffee: sampleRecords.coffee.map((record) => buildRecommendationsForPool([record, ...samplePool.coffee.filter((item) => item.slug !== record.slug)], rules, overrides)[0]),
    cocktails: sampleRecords.cocktails.map((record) => buildRecommendationsForPool([record, ...samplePool.cocktails.filter((item) => item.slug !== record.slug)], rules, overrides)[0]),
  };

  await fs.writeFile(runtimeOutputPath, JSON.stringify(toRuntimeJson(runtimePlans), null, 2));
  await fs.writeFile(sampleOutputPath, JSON.stringify(samplePlans, null, 2));
  await fs.writeFile(reportOutputPath, toMarkdownReport(samplePlans));

  console.log(`Generated ${runtimePlans.length} live internal link plans.`);
  console.log(`Wrote sample output for ${samplePlans.coffee.length} coffee and ${samplePlans.cocktails.length} cocktail articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
