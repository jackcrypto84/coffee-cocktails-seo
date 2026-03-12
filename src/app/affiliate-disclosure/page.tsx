import { PolicyPageShell } from "@/components/policy-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "How Grounded & Stirred handles affiliate-ready product placements and monetization disclosures.",
  path: "/affiliate-disclosure",
  type: "website",
});

export default function AffiliateDisclosurePage() {
  return (
    <PolicyPageShell
      eyebrow="Disclosure"
      title="Affiliate disclosure"
      description="Grounded & Stirred may use affiliate links in the future, but the site is designed so monetization does not outrank usefulness."
    >
      <h2>What this means</h2>
      <p>
        Some gear blocks, product comparisons, or recommendation modules may contain affiliate links. If they do, the site may earn a commission when readers make a qualifying purchase.
      </p>
      <h2>What this does not mean</h2>
      <p>
        Affiliate availability does not decide whether a product or technique appears in an article. We do not want the publication to read like a thin affiliate site, and we avoid padding articles with gear just to create monetization inventory.
      </p>
      <h2>How we handle recommendations</h2>
      <p>
        Product mentions should solve a real bottleneck. If a page is about bloom timing, milk texture, dilution, or recipe structure, the editorial answer may simply be technique rather than another purchase.
      </p>
      <h2>Reader-first standard</h2>
      <p>
        If there is tension between what earns more and what helps the reader more, the reader-first answer is the editorial standard we want this site to be judged by.
      </p>
    </PolicyPageShell>
  );
}
