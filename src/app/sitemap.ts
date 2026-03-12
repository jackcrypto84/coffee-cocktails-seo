import type { MetadataRoute } from "next";
import { getPublishedArticles, taxonomies } from "@/lib/content";
import { getArticlePath, isNoindex } from "@/lib/indexing";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/coffee",
    "/cocktails",
    "/guides",
    "/search",
    "/affiliate-disclosure",
    "/editorial-policy",
    "/corrections-policy",
    "/testing-methodology",
  ].map((pathname) => ({
    url: `${siteConfig.url}${pathname}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getPublishedArticles()
    .filter((article) => !isNoindex(article))
    .map((article) => ({
      url: `${siteConfig.url}${getArticlePath(article)}`,
      lastModified: new Date(article.updatedAt),
    }));

  const ingredientRoutes = taxonomies.ingredients.map((item) => ({
    url: `${siteConfig.url}/ingredients/${item.slug}`,
    lastModified: new Date(),
  }));

  const brewingRoutes = taxonomies.brewingMethods.map((item) => ({
    url: `${siteConfig.url}/brewing-method/${item.slug}`,
    lastModified: new Date(),
  }));

  const flavorRoutes = taxonomies.flavorProfiles.map((item) => ({
    url: `${siteConfig.url}/flavor-profile/${item.slug}`,
    lastModified: new Date(),
  }));

  const authorRoutes = taxonomies.authors.map((item) => ({
    url: `${siteConfig.url}/authors/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...articleRoutes, ...ingredientRoutes, ...brewingRoutes, ...flavorRoutes, ...authorRoutes];
}
