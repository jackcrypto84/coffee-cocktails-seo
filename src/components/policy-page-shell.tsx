import Link from "next/link";
import { ReactNode } from "react";

export function PolicyPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <section className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_60px_rgba(32,24,18,0.08)] sm:p-12">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</div>
        <h1 className="mt-4 font-heading text-5xl text-ink sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{description}</p>
      </section>
      <div className="prose prose-stone mt-8 max-w-none rounded-[2.5rem] bg-white p-8 shadow-[0_20px_60px_rgba(32,24,18,0.08)] sm:p-12">
        {children}
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-cocktail">
        <Link href="/editorial-policy">Editorial policy</Link>
        <Link href="/testing-methodology">Testing methodology</Link>
        <Link href="/corrections-policy">Corrections policy</Link>
        <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
      </div>
    </div>
  );
}
