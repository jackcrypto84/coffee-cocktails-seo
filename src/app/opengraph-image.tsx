import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return buildOgImage({
    category: "site",
    title: "Coffee brewing guides and original cocktails",
    description: "SEO-ready content architecture built for editorial quality, internal linking, and scalable programmatic hubs.",
  });
}
