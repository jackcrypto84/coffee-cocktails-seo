import { EditorialPanel } from "@/components/editorial-panel";

export function RecipeIterationNotes({ items }: { items: string[] }) {
  return (
    <EditorialPanel title="Recipe iteration notes" eyebrow="Editorial process">
      <ul className="space-y-3 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </EditorialPanel>
  );
}
