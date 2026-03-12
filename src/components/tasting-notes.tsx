import { NotesBlock } from "@/lib/content-types";
import { EditorialPanel } from "@/components/editorial-panel";

export function TastingNotes({ notes }: { notes: NotesBlock }) {
  return (
    <EditorialPanel title="Tasting notes" eyebrow="Sensory">
      <p>{notes.summary}</p>
      <ul className="mt-4 space-y-3 pl-5">
        {notes.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </EditorialPanel>
  );
}
