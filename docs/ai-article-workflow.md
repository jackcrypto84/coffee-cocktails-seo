# AI Article Workflow

## Overview
This workflow turns structured briefs into placeholder-aware drafts that can be reviewed, scored, and advanced toward publication without hiding uncertainty.

## Steps
1. Start with a structured brief in `content/briefs/sample-briefs.json` or a new brief generated from `npm run brief`.
2. Feed the brief into the draft workflow using:
   - `prompts/article-draft-system.md`
   - `prompts/article-draft-user-template.md`
3. Generate a draft with `npm run draft -- --brief=/coffee/v60-recipe-for-hard-water` or another valid brief selector.
4. Let the script score the draft on usefulness, originality, specificity, credibility, search intent match, and readability.
5. Reject the draft if the score is weak or if required placeholders are missing.
6. Move accepted drafts into human review using the review and publish checklists.

## Quality gate behavior
The workflow rejects drafts when:
- the overall quality score falls below 7.5
- any rubric category falls below 7
- required placeholders are missing
- the draft includes banned generic filler language
- the draft lacks sufficient verification markers

## Placeholder policy
Use placeholders to protect editorial integrity, not as decoration.
- `[VERIFY FACT]` for claims, numbers, gear specifics, chemistry, history, or anything not yet verified
- `[ADD FIRSTHAND TEST NOTE]` where tasting, brewing, batching, texture, or substitution outcomes should come from human observation
- `[ADD ORIGINAL PHOTO]` where the article should show real gear, process, or finished-drink imagery
- `[CITE SOURCE]` where outside support is required

## Output files
- Draft markdown: `content/drafts/*.md`
- Draft quality report: `content/drafts/*.quality.json`
- Sample drafts: `content/drafts/samples/`
