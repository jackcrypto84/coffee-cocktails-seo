import { EditorialPanel } from "@/components/editorial-panel";

export function EquipmentUsed({ items }: { items: string[] }) {
  return (
    <EditorialPanel title="Equipment used" eyebrow="Workflow context">
      <ul className="space-y-3 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </EditorialPanel>
  );
}
