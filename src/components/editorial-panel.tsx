import { ReactNode } from "react";

export function EditorialPanel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 rounded-[2rem] border border-stone-200 bg-stone-50 p-6">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</div> : null}
      <h2 className="mt-2 font-heading text-3xl text-ink">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-stone-700">{children}</div>
    </section>
  );
}
