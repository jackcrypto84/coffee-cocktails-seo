import fs from "node:fs";
import path from "node:path";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ensureDistinctiveInsights(brief) {
  if (!Array.isArray(brief.originalityNotes) || brief.originalityNotes.length < 3) {
    throw new Error(`Brief \"${brief.workingTitle}\" must include at least 3 originality notes.`);
  }
}

function toBulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderOutline(outline) {
  return outline
    .map((section) => {
      const heading = `## ${section.h2}`;
      const subheadings = section.h3?.length
        ? section.h3.map((item) => `- ${item}`).join("\n")
        : "- No H3s specified";
      return `${heading}\n${subheadings}`;
    })
    .join("\n\n");
}

export function buildBriefRecord(input) {
  const brief = {
    ...input,
    recommendedUrlSlug: input.recommendedUrlSlug || `/${input.category}/${slugify(input.workingTitle)}`,
  };

  ensureDistinctiveInsights(brief);
  return brief;
}

export function renderBriefMarkdown(brief) {
  ensureDistinctiveInsights(brief);

  return `# ${brief.workingTitle}\n\n- Primary keyword: ${brief.primaryKeyword}\n- Search intent: ${brief.searchIntent}\n- Reader persona: ${brief.readerPersona}\n- Recommended URL slug: ${brief.recommendedUrlSlug}\n- H1: ${brief.h1}\n\n## Angle of Differentiation\n${brief.angleOfDifferentiation}\n\n## Metadata\n- Meta title: ${brief.metaTitle}\n- Meta description: ${brief.metaDescription}\n\n## Outline\n${renderOutline(brief.outline)}\n\n## FAQ Ideas\n${toBulletList(brief.faqIdeas)}\n\n## Internal Links to Include\n${toBulletList(brief.internalLinks)}\n\n## External Evidence Needed\n${toBulletList(brief.externalEvidenceNeeded)}\n\n## Product / Affiliate Opportunities\n${toBulletList(brief.productAffiliateOpportunities)}\n\n## Originality Notes\n${toBulletList(brief.originalityNotes)}\n\n## Sections Requiring Human Expertise or Testing\n${toBulletList(brief.sectionsRequiringHumanExpertiseOrTesting)}\n\n## Image Ideas\n${toBulletList(brief.imageIdeas)}\n\n## CTA Ideas\n${toBulletList(brief.ctaIdeas)}\n`;
}

export function writeBriefOutputs({ briefs, outputDir, combinedMarkdownPath, jsonPath }) {
  fs.mkdirSync(outputDir, { recursive: true });
  const records = briefs.map(buildBriefRecord);

  fs.writeFileSync(jsonPath, JSON.stringify({ total: records.length, briefs: records }, null, 2) + "\n");

  const combinedMarkdown = [
    "# Sample Content Briefs",
    "",
    `Total briefs: **${records.length}**`,
    "",
    ...records.map((brief) => renderBriefMarkdown(brief)),
  ].join("\n\n");

  fs.writeFileSync(combinedMarkdownPath, combinedMarkdown);

  for (const brief of records) {
    const fileName = `${slugify(brief.workingTitle)}.md`;
    fs.writeFileSync(path.join(outputDir, fileName), renderBriefMarkdown(brief));
  }
}
