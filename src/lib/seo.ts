import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  imagePath?: string;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, type = "article", imagePath = "/opengraph-image", noindex = false }: MetaInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(imagePath, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [imageUrl],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
