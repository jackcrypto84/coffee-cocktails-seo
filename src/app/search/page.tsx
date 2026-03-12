import { SearchClient } from "@/components/search-client";
import { getSearchIndex } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search coffee brewing guides and original cocktail ideas by topic, ingredient, or flavor profile.",
  path: "/search",
  type: "website",
});

export default function SearchPage() {
  return <SearchClient items={getSearchIndex()} />;
}

