# Content Brief System

## Purpose
This system creates editorial-first content briefs for Grounded & Stirred without drifting into generic SEO scaffolding. It is designed to enforce specificity, originality, and explicit human-review requirements.

## Files
- `scripts/brief-utils.mjs`: shared brief schema helpers, validation, and markdown rendering
- `scripts/generate-brief.mjs`: creates a single reusable brief from CLI inputs
- `scripts/generate-sample-briefs.mjs`: renders the 20 curated sample briefs
- `content/briefs/sample-briefs.json`: machine-readable brief library
- `content/briefs/samples/`: one markdown file per sample brief
- `docs/sample-briefs.md`: combined markdown output for human review

## Required fields per brief
- Primary keyword
- Search intent
- Reader persona
- Angle of differentiation
- Working title
- Meta title
- Meta description
- Recommended URL slug
- H1
- H2/H3 outline
- FAQ ideas
- Internal links to include
- External evidence needed
- Product or affiliate opportunities
- Originality notes
- Sections requiring human expertise or testing
- Image ideas
- CTA ideas

## Quality guardrails
- Every brief must include at least 3 originality notes.
- Those notes should push beyond generic AI patterns by requiring practical adjustments, flavor logic, texture or dilution reasoning, substitution logic, or realistic troubleshooting.
- Any recipe, brew parameter, tasting note, safety guidance, history, chemistry, or product-performance claim should be flagged for human review where relevant.
- Commercial opportunities should solve a real bottleneck rather than padding the page with affiliate clutter.

## Suggested workflow
1. Use `npm run brief -- --title="..." --category=coffee --keyword="..."` for a new blank brief.
2. Use `npm run briefs:sample` to regenerate the curated sample brief library.
3. Review the generated markdown in `content/briefs/samples/` or `docs/sample-briefs.md`.
4. Convert an approved brief into a draft or directly into structured site content.

## Tradeoffs
- The brief system favors depth and editorial specificity over mass template generation.
- Some fields repeat across briefs by design because consistency matters for operations.
- The sample briefs are intentionally strong on testing and verification flags; this makes them slower to publish, but it protects the site from fabricated confidence and interchangeable SEO copy.
