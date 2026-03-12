import Link from "next/link";
import { EditorialPanel } from "@/components/editorial-panel";

export function AffiliateDisclosure({ disclosure }: { disclosure: string }) {
  return (
    <EditorialPanel title="Affiliate disclosure" eyebrow="Transparency">
      <p>{disclosure}</p>
      <Link href="/affiliate-disclosure" className="mt-4 inline-block font-semibold text-cocktail">
        Read the full disclosure
      </Link>
    </EditorialPanel>
  );
}
