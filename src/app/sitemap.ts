import type { MetadataRoute } from "next";
import { getPublishedArticles, taxonomies } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/coffee", "/cocktails", "/guides", "/search"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getPublishedArticles().map((article) => ({
    url: `${siteConfig.url}/${article.category}/${article.slug}`,
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

