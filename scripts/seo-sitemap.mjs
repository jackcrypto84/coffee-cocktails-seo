import { formatXmlUrl, getRouteInventory, writeText } from "./seo-utils.mjs";

const { routes } = getRouteInventory();
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => formatXmlUrl(route.canonical, route.lastModified)),
  '</urlset>',
].join("\n");

await writeText("sitemap.xml", `${xml}\n`);

console.log(`Wrote sitemap for ${routes.length} routes to content/seo/sitemap.xml`);
