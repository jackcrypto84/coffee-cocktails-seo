import Link from "next/link";
import { SourceReference } from "@/lib/content-types";
import { EditorialPanel } from "@/components/editorial-panel";

export function SourceReferences({ references }: { references: SourceReference[] }) {
  return (
    <EditorialPanel title="Source references" eyebrow="Verification">
      <div className="space-y-4">
        {references.map((reference) => (
          <div key={`${reference.title}-${reference.url}`} className="rounded-[1.25rem] bg-white p-4">
            <div className="text-sm font-semibold text-ink">{reference.title}</div>
            <p className="mt-1 text-sm text-stone-600">{reference.publisher}</p>
            <p className="mt-2 text-sm text-stone-700">{reference.note}</p>
            <Link href={reference.url} className="mt-3 inline-block text-sm font-semibold text-cocktail">
              Open source
            </Link>
          </div>
        ))}
      </div>
    </EditorialPanel>
  );
}
