# Programmatic SEO System

This system is designed to create selective programmatic pages without drifting into low-value archives.

## Templates
- coffee-beans-by-flavor-note: /coffee/beans/flavor-note/[note] - Curate bean choices and brew guidance by flavor note without pretending tasting notes are universal.
- brew-methods-by-difficulty: /brewing-method/[method]/[difficulty] - Explain how brew difficulty changes workflow, consistency, and expected payoff.
- drinks-by-occasion: /guides/drinks-for-[occasion] - Curate drinks by hosting context, pacing, and service practicality.
- cocktails-by-base-spirit: /cocktails/base-spirit/[spirit] - Turn base-spirit hubs into useful flavor and structure guides rather than thin archives.
- cocktails-by-flavor-profile: /cocktails/flavor-profile/[profile] - Cluster cocktails by practical flavor outcome and substitution logic.
- coffee-drinks-by-milk-texture: /coffee/milk-texture/[texture] - Link milk texture to drink identity, drink choice, and home-steaming reality.
- ingredient-pairing-pages: /guides/pairings/[ingredient-a]-with-[ingredient-b] - Create sensory pairing pages that teach structure, not just idea lists.

## Generation Rules
- Prefer fewer, better pages over exhaustive combinations.
- Every page must include at least three distinctive insights that a generic AI list page would probably miss.
- No page should publish without real curation, internal links, and a reason to exist independent of keyword shape.

## Anti-Thin-Page Checks
- Reject pages with fewer than 3 curated recommendations.
- Reject pages with fewer than 3 internal links.
- Reject pages with fewer than 3 FAQ items.
- Reject pages with fewer than 3 distinctive insights.
- Reject pages whose intro is too short or duplicated.
- Flag FAQ blocks with high overlap for manual review.
- Flag any page that relies on tasting-note certainty, brewing claims, or sourcing claims without human review notes.

## Uniqueness Rules
- Intro copy must be generated from template-specific logic, not reused boilerplate.
- FAQ sets must differ by page intent, not just by swapped nouns.
- Recommendations must be curated for the page use case rather than inherited from a global list.

## Sample Pages
- Chocolatey Coffee Beans for Espresso, Milk Drinks, and Comfort-First Cups (/coffee/beans/flavor-note/chocolatey)
- Citrus-Forward Coffee Beans for Pour-Over Drinkers Who Still Want Sweetness (/coffee/beans/flavor-note/citrus-forward)
- Beginner Pour-Over Methods That Still Teach Good Brewing Habits (/brewing-method/pour-over/beginner)
- Advanced Espresso Methods for Home Baristas Who Already Understand the Basics (/brewing-method/espresso/advanced)
- Drinks for Dinner Parties That Stay Interesting Past the First Round (/guides/drinks-for-dinner-parties)
- Gin Cocktails for Home Bartenders Who Want Precision, Not Perfume (/cocktails/base-spirit/gin)
- Bittersweet Cocktails That Stay Structured Instead of Punishing (/cocktails/flavor-profile/bittersweet)
- Coffee Drinks That Benefit Most From Glossy Microfoam (/coffee/milk-texture/glossy-microfoam)
- Coffee and Orange Pairing Guide for Brewing and Cocktails (/guides/pairings/coffee-with-orange)
- Rum and Pineapple Pairing Guide for Highballs, Sours, and Tropical Riffs (/guides/pairings/rum-with-pineapple)