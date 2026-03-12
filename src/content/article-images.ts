import articleImageOverridesJson from "@/content/article-images.json";
import { Article } from "@/lib/content-types";

export const articleImageOverrides = articleImageOverridesJson as Record<string, Partial<Article>>;
