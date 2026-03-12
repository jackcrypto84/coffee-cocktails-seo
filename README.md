# Grounded & Stirred

A production-ready Next.js 16 content site for two adjacent editorial niches:
- Coffee brewing guides
- Original cocktail ideas

It is structured to support high-quality long-form SEO, taxonomy-driven discovery, AI-assisted drafting, manual editorial review, and selective programmatic SEO without drifting into thin or spammy content.

## Stack
- Next.js 16 App Router with TypeScript
- Tailwind CSS v4
- File-based content registry in TypeScript
- Native Next metadata, `sitemap.ts`, and `robots.ts`

## Why I chose file-based content instead of a headless CMS
The simplest maintainable option for this repository is a Git-native, file-based content system. It keeps the implementation small, fast, and transparent while still giving you:
- Typed content models for articles, authors, and taxonomy hubs
- Clear separation between published content and AI-assisted drafts
- Zero database, auth, or webhook overhead
- Reviewable diffs for every content change
- An easy future migration path to MDX or a headless CMS if the editorial team grows

For this stage, a traditional CMS would add operational complexity without adding meaningful value to the publishing workflow.

## Content architecture
Core content lives in:
- `src/content/articles.ts`
- `src/content/authors.ts`
- `src/content/taxonomies.ts`

Supporting logic lives in:
- `src/lib/content.ts`
- `src/lib/content-types.ts`
- `src/lib/seo.ts`

Editorial support files live in:
- `scripts/generate-brief.mjs`
- `scripts/generate-draft.mjs`
- `scripts/generate-sample-briefs.mjs`
- `scripts/generate-sample-drafts.mjs`
- `scripts/generate-programmatic-seo-system.mjs`
- `scripts/brief-utils.mjs`
- `scripts/article-workflow-utils.mjs`
- `scripts/programmatic-seo-utils.mjs`
- `scripts/internal-linking-utils.mjs`
- `scripts/generate-link-recommendations.mjs`
- `docs/editorial-checklist.md`
- `docs/content-brief-system.md`
- `docs/ai-article-workflow.md`
- `docs/content-review-checklist.md`
- `docs/publish-ready-checklist.md`
- `docs/programmatic-seo-system.md`
- `docs/internal-linking-strategy.md`
- `content/briefs/`
- `content/drafts/`
- `content/programmatic/`
- `content/linking/`
- `src/content/generated/`
- `prompts/`

## URL structure
Implemented routes:
- `/coffee/`
- `/coffee/[slug]`
- `/cocktails/`
- `/cocktails/[slug]`
- `/guides/`
- `/ingredients/[slug]`
- `/brewing-method/[slug]`
- `/flavor-profile/[slug]`
- `/authors/[slug]`
- `/search/`

## What is implemented
- Homepage with category hubs and taxonomy-led discovery
- Coffee and cocktail hub pages
- Long-form article template with:
  - canonical metadata
  - Open Graph and Twitter metadata
  - FAQ schema
  - breadcrumb schema
  - human verification callouts
  - related article recommendations
  - comparison blocks
  - affiliate-ready featured product blocks
- Internal linking engine based on cluster proximity, taxonomy overlap, pillar surfacing, and manual editorial overrides
- Author archive pages
- Search page with local client-side filtering
- Programmatic taxonomy pages for ingredient, flavor profile, and brewing method clusters
- Sitemap and robots generation
- Dynamic Open Graph image route
- Seed content for 12 article pages plus supporting taxonomy and author pages

## Internal linking engine
The linking engine is built to keep recommendations useful instead of auto-generated-looking. It generates contextual links for each live article, rotates anchor phrasing, surfaces pillar pages, and writes a related-reading block that editors can still override.

Core files:
- `scripts/internal-linking-utils.mjs`
- `scripts/generate-link-recommendations.mjs`
- `content/linking/internal-linking-rules.json`
- `content/linking/manual-overrides.json`
- `content/linking/sample-link-recommendations.json`
- `src/content/generated/internal-links.json`
- `docs/internal-linking-strategy.md`

Rules the engine follows:
- Prioritize same-cluster links before adjacent-cluster links.
- Always expose at least one pillar-page path back to a hub or archive.
- Reuse taxonomy overlap and title-token overlap as secondary signals, not the primary reason to link.
- Rotate anchor-text patterns so recommendation blocks do not repeat the same phrasing across a page.
- Support manual `forceLinks`, `blockLinks`, and per-target `customAnchors` overrides.
- Flag weak pages for editorial review when the engine cannot produce enough relevant contextual links.

Useful command:
```bash
npm run links:sample
```

Tradeoffs:
- The engine is intentionally generator-driven. That keeps runtime code simple and makes recommendations reviewable in Git, but it does mean you should refresh the generated file whenever article inventory changes.
- Sample output can pull from strategy titles as well as live content so editors can plan future internal-link paths before every article exists.
- Manual overrides are deliberately lightweight JSON rather than a CMS UI because this repo is still optimized for maintainability over tooling breadth.

## Programmatic SEO system
The programmatic layer is designed to generate selective hub pages only when they clear editorial and uniqueness thresholds.

Supported template families:
- coffee beans by flavor note
- brew methods by difficulty
- drinks by occasion
- cocktails by base spirit
- cocktails by flavor profile
- coffee drinks by milk texture
- ingredient pairing pages

Each generated page includes:
- unique intro logic
- unique FAQs
- curated recommendations
- internal links
- editorial notes
- room for human-added commentary
- at least 3 distinctive insights

Core files:
- `scripts/generate-programmatic-seo-system.mjs`
- `scripts/programmatic-seo-utils.mjs`
- `docs/programmatic-seo-system.md`
- `content/programmatic/template-models.json`
- `content/programmatic/generation-rules.json`
- `content/programmatic/sample-pages.json`
- `content/programmatic/pages/`

Useful command:
```bash
npm run programmatic:sample
```

Tradeoffs:
- The system intentionally rejects scale-first combinations and only keeps pages that can teach something distinct.
- Many pages still require human tasting, brewing, or fact verification before publication; the system flags that work instead of pretending it is solved.
- The generator prefers route families that create strong internal links and differentiated intros over large matrix expansions.

## Publishing workflow
### Manually reviewed content
1. Add or edit entries in `src/content/articles.ts`.
2. Review `verificationNotes` and remove unresolved claims before publishing.
3. Confirm the article is linked to relevant taxonomy pages.
4. Run lint and build.

### AI-assisted draft workflow
1. Start from a structured brief.
2. Generate a single brief scaffold if needed:
```bash
npm run brief -- --title="V60 recipe for hard water" --category=coffee --keyword="v60 recipe hard water"
```
3. Generate or refresh the curated brief library:
```bash
npm run briefs:sample
```
4. Generate a draft from a brief, using the brief as the source of truth:
```bash
npm run draft -- --brief=/coffee/v60-recipe-for-hard-water
```
5. Generate the sample workflow drafts:
```bash
npm run drafts:sample
```
6. Review the generated markdown and quality reports in `content/drafts/`.
7. Resolve placeholders before publication:
- `[VERIFY FACT]`
- `[ADD FIRSTHAND TEST NOTE]`
- `[ADD ORIGINAL PHOTO]`
- `[CITE SOURCE]`

The workflow rejects weak drafts that score too low or fail placeholder and anti-filler checks.

## Content brief system
The brief system is built to enforce specificity instead of generic SEO structure.

Key outputs per brief:
- primary keyword and intent
- reader persona and differentiating angle
- metadata and URL recommendations
- H2/H3 outline and FAQ ideas
- internal links and external evidence needs
- product opportunities and CTA ideas
- originality notes with a minimum of 3 distinctive insights
- explicit sections requiring human expertise or testing

Main files:
- `docs/content-brief-system.md`
- `docs/sample-briefs.md`
- `content/briefs/sample-briefs.json`
- `content/briefs/samples/`

## AI article generation workflow
Main files:
- `docs/ai-article-workflow.md`
- `docs/content-review-checklist.md`
- `docs/publish-ready-checklist.md`
- `prompts/article-draft-system.md`
- `prompts/article-draft-user-template.md`
- `content/drafts/samples/`

Quality rubric used by the draft workflow:
- usefulness
- originality
- specificity
- credibility
- search intent match
- readability

Tradeoffs:
- The system intentionally favors richer, slower briefs and drafts over mass generation.
- Placeholder-heavy drafts may feel less polished at first, but they protect editorial trust and make unsupported claims visible.
- The strongest pages in this niche usually require brewing, tasting, batching, or product-testing input, so the workflow surfaces that work instead of pretending AI can replace it.

## Credibility and trust signals
The site now includes an editorial trust layer intended to make pages feel like a serious enthusiast publication instead of anonymous AI content.

Implemented signals:
- Expanded author pages with domain expertise, credentials, review focus, testing methodology, and disclosures
- Article-level published, updated, reviewed, and tested metadata
- Editorial policy, testing methodology, corrections policy, and affiliate disclosure pages
- Reusable trust components for testing notes, tasting notes, equipment used, recipe iteration notes, citations, and source references
- Article-side affiliate disclosure language and fact-sensitive citation blocks

Core files:
- `src/lib/editorial.ts`
- `src/components/testing-notes.tsx`
- `src/components/tasting-notes.tsx`
- `src/components/equipment-used.tsx`
- `src/components/recipe-iteration-notes.tsx`
- `src/components/citations.tsx`
- `src/components/source-references.tsx`
- `src/app/editorial-policy/page.tsx`
- `src/app/testing-methodology/page.tsx`
- `src/app/corrections-policy/page.tsx`
- `src/app/affiliate-disclosure/page.tsx`

Tradeoffs:
- Much of the trust layer is generated from structured defaults so the whole archive benefits immediately, but the strongest version is still per-article hand-tuned notes and citations.
- Source-reference blocks are designed as editorial scaffolding: they make fact-sensitive sections easier to review, but they do not replace firsthand testing where the article promises it.

## Recipe image system
The recipe image layer is now part of the publishing workflow rather than an optional enhancement. It now generates missing hero images through Replicate and stores live metadata in:
- `src/content/article-images.json`
- `src/lib/recipe-images.ts`
- `src/components/recipe-hero-media.tsx`

What it does:
- Stores recipe-specific hero image metadata and prompts for coffee and cocktail pages
- Renders a local hero image automatically when the file exists in `public/images/coffee/` or `public/images/cocktails/`
- Falls back to a clean placeholder when the file is missing
- Prefers the real hero image for Open Graph sharing when present

Automatic generation workflow:
1. Add or review the recipe's `imagePrompt`, `imageAlt`, `imageCaption`, and serving metadata in `src/content/article-images.json`.
2. Add `REPLICATE_API_TOKEN=your_token_here` to `.env.local` or set it in your shell environment.
3. Run:
```bash
npm run generate:images
```
4. The generator scans all image-enabled recipe entries, skips any page that already has a local image file, generates only missing hero images, saves them into:
   - `public/images/coffee/[slug].jpg`
   - `public/images/cocktails/[slug].jpg`
5. It updates the image registry, writes a run log to `content/image-prompts/generated-image-log.json`, and the site starts rendering the final local image automatically on refresh.

Helpful options:
- `npm run generate:images -- --dry-run` to preview what would be generated without calling the API
- `npm run generate:images -- --only=yuzu-gimlet-riff` to generate one recipe
- `npm run generate:images -- --limit=3` to batch cautiously
- `npm run generate:images -- --batch-size=2` to process larger queues in smaller sequential batches
- `npm run generate:images -- --start-after=yuzu-gimlet-riff` to resume after a specific slug
- `npm run generate:images -- --max-retries=4 --retry-backoff-ms=5000` to retry transient API failures with exponential backoff
- `REPLICATE_IMAGE_DELAY_MS=4000 npm run generate:images` to slow the rate limit between calls
- `REPLICATE_IMAGE_MODEL=black-forest-labs/flux-schnell npm run generate:images` to override the default photorealistic model

Safety rules built into the generator:
- Skips recipes that already have an image file
- Skips entries without an `imagePrompt`
- Avoids overwriting existing local assets
- Sleeps between API calls to reduce burst traffic
- Retries transient Replicate API and download failures with exponential backoff
- Supports safer sequential batch runs for larger queues
- Writes a structured log for generated, skipped, and failed items

Publishing checklist for recipe pages:
- content complete
- metadata complete
- internal links complete
- unique hero image prompt complete
- final hero image present
- alt text complete
- caption complete

Tradeoffs:
- The generator is intentionally conservative: it only fills missing files and leaves hand-curated replacements alone.
- Prompt quality still matters. The automation removes manual generation steps, but it cannot fix weak visual briefs on its own.
- Final editorial review is still recommended for garnish accuracy, glassware accuracy, and visual match to the recipe.

## SEO and editorial tradeoffs
- File-based content is ideal for speed and simplicity, but non-technical editors may eventually prefer MDX or a CMS UI.
- Search is static and local right now, which is fast and maintenance-light, but it is not a full-text indexed search engine.
- Newsletter and affiliate blocks are UI-ready; they should be connected to a real ESP and vetted product data before monetization goes live.
- Programmatic pages are intentionally selective. They only become valuable when the connected content set is genuinely useful.

## Local setup
```bash
npm install
npm run dev
```

## Verification
Run:
```bash
npm run lint
npm run build
```

## Next improvements
See [TODO.md](./TODO.md).

## Topical Map and Strategy Files
Planning outputs for the 200+ page roadmap live in:
- `docs/topical-map.md`
- `content/strategy/topical-map.json`
- `content/strategy/content-architecture.json`
- `content/strategy/coffee-titles.json`
- `content/strategy/cocktail-titles.json`
- `content/strategy/programmatic-patterns.json`
- `content/strategy/buyer-intent-topics.json`

### Strategy tradeoffs for a small niche site
- The roadmap intentionally favors clusters where firsthand tasting, brewing tests, or workflow evidence can beat generic AI summaries.
- Programmatic pages are included, but they are constrained to patterns that can stay editorially useful with real curation and internal links.
- Some high-volume broad terms are intentionally not the core focus because a smaller site is more likely to win on specificity, troubleshooting depth, and taste-driven originality.
- Buyer-intent coverage is designed around real bottlenecks and best-for decisions instead of inflated roundup volume.
