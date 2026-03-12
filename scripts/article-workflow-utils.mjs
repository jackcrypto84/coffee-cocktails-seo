import fs from "node:fs";

const REQUIRED_PLACEHOLDERS = [
  "[VERIFY FACT]",
  "[ADD FIRSTHAND TEST NOTE]",
  "[ADD ORIGINAL PHOTO]",
  "[CITE SOURCE]",
];

const BANNED_GENERIC_PHRASES = [
  "in today's world",
  "when it comes to",
  "delve into",
  "elevate your",
  "game changer",
  "rich tapestry",
  "journey through",
];

export function loadBriefLibrary(filePath) {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return raw.briefs || [];
}

export function findBrief(briefs, selector) {
  return briefs.find((brief) =>
    brief.recommendedUrlSlug === selector ||
    brief.workingTitle === selector ||
    brief.recommendedUrlSlug.split("/").pop() === selector,
  );
}

export function renderSystemPrompt() {
  return [
    "You are writing a draft for Grounded & Stirred.",
    "Voice: knowledgeable enthusiast, concise but vivid, practical, no hype.",
    "Do not invent testing, tasting, credentials, history, science, or product claims.",
    "If a fact, tasting note, or claim needs support, insert one of the required placeholders instead of pretending.",
    `Required placeholders: ${REQUIRED_PLACEHOLDERS.join(", ")}`,
    "Every draft must be specific, grounded, and aligned to the brief. The brief is the source of truth.",
  ].join("\n");
}

export function renderUserPrompt(brief) {
  return [
    `Primary keyword: ${brief.primaryKeyword}`,
    `Search intent: ${brief.searchIntent}`,
    `Reader persona: ${brief.readerPersona}`,
    `Angle of differentiation: ${brief.angleOfDifferentiation}`,
    `Working title: ${brief.workingTitle}`,
    `Meta title: ${brief.metaTitle}`,
    `Meta description: ${brief.metaDescription}`,
    `URL slug: ${brief.recommendedUrlSlug}`,
    `H1: ${brief.h1}`,
    "Outline:",
    ...brief.outline.flatMap((section) => [
      `- ${section.h2}`,
      ...(section.h3 || []).map((item) => `  - ${item}`),
    ]),
    "FAQ ideas:",
    ...brief.faqIdeas.map((item) => `- ${item}`),
    "Internal links:",
    ...brief.internalLinks.map((item) => `- ${item}`),
    "External evidence needed:",
    ...brief.externalEvidenceNeeded.map((item) => `- ${item}`),
    "Product opportunities:",
    ...brief.productAffiliateOpportunities.map((item) => `- ${item}`),
    "Originality notes:",
    ...brief.originalityNotes.map((item) => `- ${item}`),
    "Human expertise or testing required:",
    ...brief.sectionsRequiringHumanExpertiseOrTesting.map((item) => `- ${item}`),
    "Image ideas:",
    ...brief.imageIdeas.map((item) => `- ${item}`),
    "CTA ideas:",
    ...brief.ctaIdeas.map((item) => `- ${item}`),
  ].join("\n");
}

export function buildDraftFromBrief(brief) {
  const intro = [
    `${brief.h1} is usually underserved because generic search content explains the topic without telling the reader what to actually change, notice, or avoid.`,
    `${brief.angleOfDifferentiation} [VERIFY FACT] [CITE SOURCE]`,
    `[ADD FIRSTHAND TEST NOTE] Add one concise observation from brewing, tasting, or batching that immediately makes the article feel lived-in.`,
  ];

  const sections = brief.outline.map((section) => ({
    h2: section.h2,
    h3: (section.h3 || []).map((item, index) => ({
      title: item,
      body: [
        `${item} should be explained in plain language with a direct tie to the reader's decision or mistake pattern.`,
        `Add one concrete adjustment, tradeoff, or sensory outcome here so the section does not read like a summary.`,
        index === 0
          ? `[ADD FIRSTHAND TEST NOTE] Add a real comparison, tasting note, or workflow observation for \"${item}\".`
          : `[VERIFY FACT] [CITE SOURCE]`,
      ],
    })),
  }));

  const faq = brief.faqIdeas.map((question) => ({
    question,
    answer: `[VERIFY FACT] Answer this with a concise, high-confidence response tied to the article's angle. [CITE SOURCE]`,
  }));

  const score = scoreDraft({ brief });
  const verdict = rejectWeakDraft(score);
  if (!verdict.passed) {
    throw new Error(`Draft rejected: ${verdict.reason}`);
  }

  return {
    draft: renderDraftMarkdown({ brief, intro, sections, faq, score }),
    score,
  };
}

function renderDraftMarkdown({ brief, intro, sections, faq, score }) {
  return `---
title: ${brief.workingTitle}
slug: ${brief.recommendedUrlSlug.split("/").pop()}
category: ${brief.category}
status: draft
primary_keyword: ${brief.primaryKeyword}
search_intent: ${brief.searchIntent}
reader_persona: ${brief.readerPersona}
quality_score_overall: ${score.overall}
---

# ${brief.h1}

## Draft Notes
- This draft was generated from the approved brief and should not drift from it.
- Required placeholders must stay visible until a human resolves them.
- Voice target: knowledgeable enthusiast, concise but vivid, practical, no hype.

## Introduction
${intro.map((item) => `- ${item}`).join("\n")}

${sections
  .map((section) => `## ${section.h2}\n\n${section.h3
    .map((sub) => `### ${sub.title}\n${sub.body.map((line) => `- ${line}`).join("\n")}`)
    .join("\n\n")}`)
  .join("\n\n")}

## FAQ
${faq.map((item) => `### ${item.question}\n- ${item.answer}`).join("\n\n")}

## Internal Links to Add
${brief.internalLinks.map((item) => `- ${item}`).join("\n")}

## External Evidence Log
${brief.externalEvidenceNeeded.map((item) => `- ${item} [CITE SOURCE]`).join("\n")}

## Product and CTA Opportunities
${brief.productAffiliateOpportunities.map((item) => `- ${item}`).join("\n")}
${brief.ctaIdeas.map((item) => `- CTA: ${item}`).join("\n")}

## Originality Requirements
${brief.originalityNotes.map((item) => `- ${item}`).join("\n")}

## Human Review and Media
${brief.sectionsRequiringHumanExpertiseOrTesting.map((item) => `- ${item}`).join("\n")}
${brief.imageIdeas.map((item) => `- ${item} [ADD ORIGINAL PHOTO]`).join("\n")}

## Quality Rubric
- Usefulness: ${score.usefulness}/10
- Originality: ${score.originality}/10
- Specificity: ${score.specificity}/10
- Credibility: ${score.credibility}/10
- Search intent match: ${score.searchIntentMatch}/10
- Readability: ${score.readability}/10
- Overall: ${score.overall}/10
`;
}

export function scoreDraft({ brief }) {
  const outlineDepth = brief.outline.reduce((sum, section) => sum + (section.h3?.length || 0), 0);
  const usefulness = Math.min(10, 5 + Math.min(brief.internalLinks.length, 3) + Math.min(brief.faqIdeas.length, 2));
  const originality = Math.min(10, 4 + Math.min(brief.originalityNotes.length, 4) + (brief.angleOfDifferentiation.length > 140 ? 2 : 1));
  const specificity = Math.min(10, 4 + Math.min(outlineDepth, 4) + Math.min(brief.externalEvidenceNeeded.length, 2));
  const credibility = Math.min(10, 4 + Math.min(brief.sectionsRequiringHumanExpertiseOrTesting.length, 3) + REQUIRED_PLACEHOLDERS.length - 1);
  const searchIntentMatch = Math.min(10, 5 + (brief.searchIntent ? 2 : 0) + (brief.primaryKeyword ? 2 : 0) + (brief.h1 ? 1 : 0));
  const readability = 8;
  const overall = Number(((usefulness + originality + specificity + credibility + searchIntentMatch + readability) / 6).toFixed(1));

  return { usefulness, originality, specificity, credibility, searchIntentMatch, readability, overall };
}

export function rejectWeakDraft(score) {
  if (score.overall < 7.5) {
    return { passed: false, reason: `overall score too low (${score.overall})` };
  }

  const lowest = Math.min(
    score.usefulness,
    score.originality,
    score.specificity,
    score.credibility,
    score.searchIntentMatch,
    score.readability,
  );

  if (lowest < 7) {
    return { passed: false, reason: `one or more rubric dimensions fell below 7/10` };
  }

  return { passed: true };
}

export function validateDraftText(draftText) {
  for (const token of REQUIRED_PLACEHOLDERS) {
    if (!draftText.includes(token)) {
      throw new Error(`Draft missing required placeholder: ${token}`);
    }
  }

  const lowered = draftText.toLowerCase();
  for (const phrase of BANNED_GENERIC_PHRASES) {
    if (lowered.includes(phrase)) {
      throw new Error(`Draft contains generic phrase: ${phrase}`);
    }
  }

  if ((lowered.match(/\[verify fact\]/g) || []).length < 2) {
    throw new Error("Draft must contain multiple explicit verification placeholders.");
  }

  return true;
}
