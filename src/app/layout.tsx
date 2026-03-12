import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Coffee brewing guides and original cocktails`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={websiteSchema} />
        <div className="site-shell">
          <header className="sticky top-0 z-20 border-b border-white/50 bg-cream/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-4 sm:px-8">
              <Link href="/" className="max-w-sm">
                <span className="section-label">Coffee + cocktails</span>
                <span className="mt-3 block font-heading text-3xl font-semibold tracking-tight text-ink">Grounded & Stirred</span>
                <span className="mt-1 block text-sm text-stone-600">A serious enthusiast publication for brewing, balance, and flavor structure.</span>
              </Link>
              <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-stone-700">
                <Link href="/coffee" className="rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm transition hover:bg-white">Coffee</Link>
                <Link href="/cocktails" className="rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm transition hover:bg-white">Cocktails</Link>
                <Link href="/guides" className="rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm transition hover:bg-white">Guides</Link>
                <Link href="/search" className="rounded-full bg-stone-950 px-4 py-2 text-white transition hover:bg-stone-800">Search</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="relative overflow-hidden border-t border-stone-200 bg-stone-950 text-stone-200">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <div className="absolute -left-12 top-12 h-40 w-40 rounded-full bg-coffee/25 blur-3xl" />
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cocktail/20 blur-3xl" />
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
              <div className="relative z-10">
                <span className="section-label border-white/10 bg-white/6 text-stone-300 before:bg-gold">Editorial system</span>
                <h2 className="mt-4 font-heading text-3xl text-white">Designed to look curated, not auto-filled.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-stone-300">
                  Named authorship, testing notes, citations, internal linking, and visual hierarchy all work together here so the site reads like a publication, not a content farm.
                </p>
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Explore</h3>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/coffee">Coffee hub</Link>
                  <Link href="/cocktails">Cocktail hub</Link>
                  <Link href="/guides">Programmatic guides</Link>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Editorial</h3>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/editorial-policy">Editorial policy</Link>
                  <Link href="/testing-methodology">Testing methodology</Link>
                  <Link href="/corrections-policy">Corrections policy</Link>
                  <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
                </div>
              </div>
              <div id="newsletter" className="relative z-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Newsletter</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{siteConfig.newsletterCta}</p>
                <form className="mt-4 flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-full border border-stone-700 bg-stone-900 px-4 py-3 text-sm outline-none placeholder:text-stone-500"
                  />
                  <button className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-stone-950">Subscribe</button>
                </form>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
