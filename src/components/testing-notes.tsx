import { NotesBlock } from "@/lib/content-types";
import { EditorialPanel } from "@/components/editorial-panel";

export function TestingNotes({ notes }: { notes: NotesBlock }) {
  return (
    <EditorialPanel title="Testing notes" eyebrow="Methodology">
      <p>{notes.summary}</p>
      <ul className="mt-4 space-y-3 pl-5">
        {notes.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </EditorialPanel>
  );
}
