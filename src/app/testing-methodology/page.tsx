import { PolicyPageShell } from "@/components/policy-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Testing Methodology",
  description: "How Grounded & Stirred tests brew recipes, cocktail riffs, and gear-adjacent advice before publication.",
  path: "/testing-methodology",
  type: "website",
});

export default function TestingMethodologyPage() {
  return (
    <PolicyPageShell
      eyebrow="Methodology"
      title="Testing methodology"
      description="We treat testing notes as part of the article, not as backstage trivia. The point is to show how conclusions were reached and where they still need human verification."
    >
      <h2>Coffee workflow</h2>
      <p>
        Coffee guides are built around controlled changes. We try to hold dose, ratio, and major recipe structure steady while changing one main variable at a time, then compare cup clarity, sweetness, finish, drawdown behavior, or shot flow before making a recommendation.
      </p>
      <h2>Cocktail workflow</h2>
      <p>
        Cocktail recipes are tested across dilution windows, garnish changes, sweetness adjustments, and substitution scenarios. A drink should still make sense after the first sip, not just in the first thirty seconds after it is poured.
      </p>
      <h2>What gets flagged</h2>
      <p>
        We flag any claim that depends on precise chemistry, broad sensory certainty, historical assertion, or product performance outside what we have actually tested. Those items stay visible for human review instead of getting quietly smoothed into confident copy.
      </p>
      <h2>Why the notes matter</h2>
      <p>
        Readers should be able to tell whether a recommendation came from repeated comparison, a narrower personal test, or external sourcing. That makes the site more honest and also makes future updates easier when new evidence changes the best answer.
      </p>
    </PolicyPageShell>
  );
}
