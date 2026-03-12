import { PolicyPageShell } from "@/components/policy-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corrections Policy",
  description: "How Grounded & Stirred handles corrections, updates, and factual errors.",
  path: "/corrections-policy",
  type: "website",
});

export default function CorrectionsPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Corrections"
      title="Corrections policy"
      description="We would rather correct a page clearly than quietly pretend it was always right."
    >
      <h2>When we update a page</h2>
      <p>
        We update articles when a recommendation becomes outdated, a technical claim needs revision, a better firsthand test changes the advice, or readers surface a real factual problem.
      </p>
      <h2>How corrections appear</h2>
      <p>
        The site shows updated dates and reviewed dates on article pages. Material corrections should also change the relevant note, citation, or explanation rather than hiding the change in invisible copy edits.
      </p>
      <h2>Reader trust standard</h2>
      <p>
        If an error affects how someone brews, buys, or mixes a drink, we treat it as important. Small style edits are one thing. Advice that changes the result in the cup or glass deserves a visible correction mindset.
      </p>
      <h2>How to report an issue</h2>
      <p>
        Readers can contact the editorial team through the newsletter or site contact channels once those are fully wired. In the meantime, the policy exists to make our expectations explicit: factual accuracy matters more than preserving appearances.
      </p>
    </PolicyPageShell>
  );
}
