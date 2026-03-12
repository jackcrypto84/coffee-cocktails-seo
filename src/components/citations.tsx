import Link from "next/link";
import { Citation } from "@/lib/content-types";
import { EditorialPanel } from "@/components/editorial-panel";

export function Citations({ citations }: { citations: Citation[] }) {
  return (
    <EditorialPanel title="Citations" eyebrow="Fact-based sections">
      <div className="space-y-4">
        {citations.map((citation) => (
          <div key={`${citation.section}-${citation.sourceTitle}`} className="rounded-[1.25rem] bg-white p-4">
            <div className="text-sm font-semibold text-ink">{citation.section}</div>
            <p className="mt-1 text-sm text-stone-600">
              <Link href={citation.url} className="font-semibold text-cocktail">
                {citation.sourceTitle}
              </Link>{" "}
              from {citation.publisher}
            </p>
            <p className="mt-2 text-sm text-stone-700">{citation.note}</p>
          </div>
        ))}
      </div>
    </EditorialPanel>
  );
}
