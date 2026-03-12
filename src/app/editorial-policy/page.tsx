import { PolicyPageShell } from "@/components/policy-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Editorial Policy",
  description: "How Grounded & Stirred handles authorship, sourcing, testing, and editorial review.",
  path: "/editorial-policy",
  type: "website",
});

export default function EditorialPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Editorial standards"
      title="Editorial policy"
      description="Grounded & Stirred publishes coffee and cocktail guidance with named authorship, editorial review, and visible testing limitations."
    >
      <h2>What we publish</h2>
      <p>
        We focus on practical brewing guides, original cocktail recipes, and programmatic pages that still offer real editorial value. If a page cannot say something specific, tested, or genuinely clarifying, it does not belong in the publishing queue.
      </p>
      <h2>Authorship and review</h2>
      <p>
        Every article carries a named author, last-updated date, last-reviewed date, and reviewed-by or tested-by context when relevant. We want readers to know who is accountable for the page and what kind of expertise shaped it.
      </p>
      <h2>Sourcing rules</h2>
      <p>
        Fact-based sections should cite primary sources, recognized industry organizations, manufacturer documentation, or firsthand testing notes. We do not present unsupported folklore, fake tasting notes, invented history, or made-up scientific certainty as settled fact.
      </p>
      <h2>AI use</h2>
      <p>
        AI can help structure briefs and early drafts, but it is not treated as a final authority. Any output that sounds generic, unsupported, repetitive, or overly smooth without evidence is rejected or rewritten during editorial review.
      </p>
      <h2>Commercial independence</h2>
      <p>
        Monetization blocks may exist on the site, but article recommendations are intended to solve reader problems first. We would rather publish a narrower, more useful page than inflate a roundup or force product mentions where they do not belong.
      </p>
    </PolicyPageShell>
  );
}
