import fs from "node:fs";
import { absoluteUrl, getCanonicalPath, getRouteInventory, seoOutputPath, writeJson, writeText } from "./seo-utils.mjs";

const STATE_PATH = seoOutputPath("new-urls-state.json");
const { siteConfig, articles } = getRouteInventory();

let previousState = { exportedKeys: [] };
if (fs.existsSync(STATE_PATH)) {
  previousState = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

const exportedKeys = new Set(previousState.exportedKeys ?? []);
const freshArticles = articles.filter((article) => !exportedKeys.has(`${article.category}:${article.slug}`));
const urls = freshArticles.map((article) => absoluteUrl(siteConfig.url, getCanonicalPath(article)));

await writeText("new-urls.txt", `${urls.join("\n")}${urls.length ? "\n" : ""}`);
await writeJson("new-urls.json", {
  generatedAt: new Date().toISOString(),
  count: urls.length,
  urls,
  articles: freshArticles.map((article) => ({
    slug: article.slug,
    category: article.category,
    publishedAt: article.publishedAt,
    url: absoluteUrl(siteConfig.url, getCanonicalPath(article)),
  })),
});
await writeJson("new-urls-state.json", {
  generatedAt: new Date().toISOString(),
  exportedKeys: [...exportedKeys, ...freshArticles.map((article) => `${article.category}:${article.slug}`)],
});

console.log(`New URLs queued for Search Console submission: ${urls.length}`);
console.log("Wrote content/seo/new-urls.txt, content/seo/new-urls.json, and content/seo/new-urls-state.json");
