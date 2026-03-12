import fs from "node:fs";
import path from "node:path";
import { renderIntro, renderPageMarkdown, validatePage, writeJson, MINIMUM_THRESHOLDS } from "./programmatic-seo-utils.mjs";

const templateModels = [
  {
    id: "coffee-beans-by-flavor-note",
    routePattern: "/coffee/beans/flavor-note/[note]",
    purpose: "Curate bean choices and brew guidance by flavor note without pretending tasting notes are universal.",
    requiredFields: ["subjectLabel", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "brew-methods-by-difficulty",
    routePattern: "/brewing-method/[method]/[difficulty]",
    purpose: "Explain how brew difficulty changes workflow, consistency, and expected payoff.",
    requiredFields: ["subjectLabel", "difficulty", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "drinks-by-occasion",
    routePattern: "/guides/drinks-for-[occasion]",
    purpose: "Curate drinks by hosting context, pacing, and service practicality.",
    requiredFields: ["subjectLabel", "occasion", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "cocktails-by-base-spirit",
    routePattern: "/cocktails/base-spirit/[spirit]",
    purpose: "Turn base-spirit hubs into useful flavor and structure guides rather than thin archives.",
    requiredFields: ["subjectLabel", "spirit", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "cocktails-by-flavor-profile",
    routePattern: "/cocktails/flavor-profile/[profile]",
    purpose: "Cluster cocktails by practical flavor outcome and substitution logic.",
    requiredFields: ["subjectLabel", "profile", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "coffee-drinks-by-milk-texture",
    routePattern: "/coffee/milk-texture/[texture]",
    purpose: "Link milk texture to drink identity, drink choice, and home-steaming reality.",
    requiredFields: ["subjectLabel", "texture", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
  {
    id: "ingredient-pairing-pages",
    routePattern: "/guides/pairings/[ingredient-a]-with-[ingredient-b]",
    purpose: "Create sensory pairing pages that teach structure, not just idea lists.",
    requiredFields: ["subjectLabel", "pairing", "recommendations", "distinctiveInsights", "faq", "editorialNotes", "humanCommentaryPrompt"],
  },
];

const generationRules = {
  principles: [
    "Prefer fewer, better pages over exhaustive combinations.",
    "Every page must include at least three distinctive insights that a generic AI list page would probably miss.",
    "No page should publish without real curation, internal links, and a reason to exist independent of keyword shape.",
  ],
  minimumThresholds: MINIMUM_THRESHOLDS,
  antiThinPageChecks: [
    "Reject pages with fewer than 3 curated recommendations.",
    "Reject pages with fewer than 3 internal links.",
    "Reject pages with fewer than 3 FAQ items.",
    "Reject pages with fewer than 3 distinctive insights.",
    "Reject pages whose intro is too short or duplicated.",
    "Flag FAQ blocks with high overlap for manual review.",
    "Flag any page that relies on tasting-note certainty, brewing claims, or sourcing claims without human review notes.",
  ],
  uniquenessRules: [
    "Intro copy must be generated from template-specific logic, not reused boilerplate.",
    "FAQ sets must differ by page intent, not just by swapped nouns.",
    "Recommendations must be curated for the page use case rather than inherited from a global list.",
  ],
  manualReviewTriggers: [
    "Firsthand tasting or brewing claims not yet added",
    "Fact-heavy sourcing or safety concerns",
    "Weak recommendation count or repetitive FAQ structure",
    "Pages whose value depends on real sensory comparisons",
  ],
};

const sampleSeeds = [
  {
    template: "coffee-beans-by-flavor-note",
    routePattern: "/coffee/beans/flavor-note/[note]",
    slug: "/coffee/beans/flavor-note/chocolatey",
    title: "Chocolatey Coffee Beans for Espresso, Milk Drinks, and Comfort-First Cups",
    subjectLabel: "Chocolatey coffee beans",
    recommendations: [
      "Recommend medium-roast beans with cocoa, nougat, or roasted-nut descriptors for lattes and cappuccinos.",
      "Direct readers toward lower-agitation pour-over recipes if they want chocolate notes without roast heaviness.",
      "Suggest espresso drinkers test a slightly tighter ratio before buying darker beans they may not actually enjoy.",
    ],
    distinctiveInsights: [
      "Chocolatey does not always mean dark roast; many medium roasts show cocoa best when the finish stays sweet rather than smoky.",
      "Milk drinks amplify comfort but suppress delicate top notes, so readers should buy for persistence, not romance-copy tasting notes.",
      "A chocolatey bean can still taste flat if the brew runs too long and turns dry instead of sweet.",
    ],
    internalLinks: ["/coffee/coffee-beans-and-roast-levels", "/coffee/best-beans-for-milk-drinks-chocolate-caramel", "/coffee/espresso-yield-ratios-explained"],
    faq: [
      { question: "Do chocolatey beans have to be dark roast?", answer: "No. Many medium roasts show cocoa more cleanly than darker roasts once bitterness stays under control. [VERIFY FACT]" },
      { question: "Are chocolatey beans best only for espresso?", answer: "No. They often work well in espresso, milk drinks, and lower-agitation filter brews where sweetness stays intact." },
      { question: "Why do some chocolate-note coffees taste woody instead of comforting?", answer: "Usually the roast is too developed for the recipe, or the extraction pushes the finish past sweetness into dryness." },
    ],
    editorialNotes: [
      "Human tasting notes should compare at least one espresso and one filter example before publication.",
      "Avoid pretending all cocoa-note coffees are interchangeable; origin, roast development, and brew method matter.",
    ],
    humanCommentaryPrompt: "Add a short editor note comparing how the note appears in espresso versus milk.",
    flags: ["Needs human tasting verification before naming real bean examples"],
  },
  {
    template: "coffee-beans-by-flavor-note",
    routePattern: "/coffee/beans/flavor-note/[note]",
    slug: "/coffee/beans/flavor-note/citrus-forward",
    title: "Citrus-Forward Coffee Beans for Pour-Over Drinkers Who Still Want Sweetness",
    subjectLabel: "Citrus-forward coffee beans",
    recommendations: [
      "Point readers toward washed coffees and lighter roast styles when they want vivid citrus without ferment-heavy funk.",
      "Recommend V60 or clean flat-bottom brews that let acidity stay articulate instead of crowded.",
      "Tell readers to protect sweetness with bloom and agitation control rather than only grinding finer.",
    ],
    distinctiveInsights: [
      "Citrus-forward beans fail when readers chase brightness so hard that the cup loses sweetness and body.",
      "Water quality often matters more here because hard water can flatten citrus notes into generic sharpness.",
      "A citrus note in filter coffee often behaves more like lifted acidity plus aroma than like literal fruit juice.",
    ],
    internalLinks: ["/coffee/v60-recipe-for-hard-water", "/coffee/v60-bloom-timing-guide", "/coffee/coffee-water-and-filtration"],
    faq: [
      { question: "Are citrus-forward beans always sour?", answer: "No. Good citrus-forward coffees should still carry sweetness and a clean finish, not just sharp acidity." },
      { question: "What brew method shows citrus notes best?", answer: "Usually cleaner filter methods do, especially when agitation and water quality stay under control. [VERIFY FACT]" },
      { question: "Why do citrus-note coffees taste flat in my setup?", answer: "Water hardness, stale coffee, and overagitation can all flatten the effect before the bean itself is the real problem." },
    ],
    editorialNotes: [
      "Add a human note about how citrus reads differently in hot versus cooled cups.",
      "Name real bean examples only after tasting them on more than one brew setup.",
    ],
    humanCommentaryPrompt: "Add an editor paragraph on how citrus notes changed between two brew temperatures.",
    flags: ["Needs human brewing comparison before publishing named recommendations"],
  },
  {
    template: "brew-methods-by-difficulty",
    routePattern: "/brewing-method/[method]/[difficulty]",
    slug: "/brewing-method/pour-over/beginner",
    title: "Beginner Pour-Over Methods That Still Teach Good Brewing Habits",
    subjectLabel: "Pour-over",
    difficulty: "beginner",
    recommendations: [
      "Position flat-bottom brewers as friendlier first tools when readers want balance without precise kettle control.",
      "Recommend a simple notebook or dial-in card before recommending more accessories.",
      "Route readers into one stable beginner recipe instead of overwhelming them with every possible dripper pattern.",
    ],
    distinctiveInsights: [
      "Beginner-friendly does not mean simplistic; it means the method punishes mistakes less brutally while still teaching extraction logic.",
      "The right beginner method is often the one that makes inconsistency visible without making every brew feel fragile.",
      "A calmer method can build better long-term taste memory than a highly expressive method a reader cannot repeat yet.",
    ],
    internalLinks: ["/coffee/coffee-brewing-fundamentals", "/coffee/pour-over-recipes", "/coffee/grind-size-basics"],
    faq: [
      { question: "Is V60 the best beginner pour-over method?", answer: "Not always. It is capable, but some readers learn faster on methods with a little more forgiveness." },
      { question: "What matters most in a first pour-over setup?", answer: "Usually grinder consistency and a repeatable workflow matter more than owning multiple brewers." },
      { question: "Should beginners chase bright tasting notes first?", answer: "Usually no. Sweetness and consistency teach more than constantly chasing flashy cups." },
    ],
    editorialNotes: [
      "This page should include one human-tested beginner recipe and one realistic note about common first-week mistakes.",
      "Do not let the recommendations drift into prestige gear language.",
    ],
    humanCommentaryPrompt: "Add a short editor note about which pour-over mistake improved fastest during teaching or self-testing.",
    flags: ["Needs firsthand brewing note for the recommended beginner workflow"],
  },
  {
    template: "brew-methods-by-difficulty",
    routePattern: "/brewing-method/[method]/[difficulty]",
    slug: "/brewing-method/espresso/advanced",
    title: "Advanced Espresso Methods for Home Baristas Who Already Understand the Basics",
    subjectLabel: "Espresso",
    difficulty: "advanced",
    recommendations: [
      "Center workflow control, puck prep consistency, and note-taking before recommending more expensive accessories.",
      "Guide readers toward controlled ratio experiments rather than constant simultaneous variable changes.",
      "Use advanced pages to explain what precision helps and what only looks precise on social media.",
    ],
    distinctiveInsights: [
      "Advanced espresso is less about adding complexity and more about reducing hidden randomness.",
      "Readers often outgrow casual recipes before they outgrow sloppy puck prep, which is why 'advanced' should still return to basics.",
      "The payoff of advanced espresso comes from more honest feedback loops, not just narrower tolerances.",
    ],
    internalLinks: ["/coffee/espresso-troubleshooting", "/coffee/espresso-yield-ratios-explained", "/coffee/espresso-channeling-causes"],
    faq: [
      { question: "What makes espresso advanced at home?", answer: "Usually the need for more precise workflow, tighter repeatability, and better interpretation of shot feedback rather than more gadgets alone." },
      { question: "Should advanced users always pull lighter, longer shots?", answer: "No. Advanced technique should serve taste goals, not internet fashion. [VERIFY FACT]" },
      { question: "When do precision tools actually help?", answer: "They help most when they reduce a known bottleneck such as distribution, measurement drift, or basket fit." },
    ],
    editorialNotes: [
      "Human review needed on any mention of basket size, pressure behavior, or temperature control claims.",
      "The page should discourage complexity for its own sake.",
    ],
    humanCommentaryPrompt: "Add an editor note on one advanced workflow habit that actually improved repeatability in testing.",
    flags: ["Needs expert review on technical espresso claims"],
  },
  {
    template: "drinks-by-occasion",
    routePattern: "/guides/drinks-for-[occasion]",
    slug: "/guides/drinks-for-dinner-parties",
    title: "Drinks for Dinner Parties That Stay Interesting Past the First Round",
    subjectLabel: "Dinner party drinks",
    occasion: "dinner parties",
    recommendations: [
      "Lead with drinks that can be built or batched cleanly without stealing the host's attention.",
      "Recommend one stirred option, one bright aperitif option, and one lighter highball so pacing feels deliberate.",
      "Explain that the best dinner-party drink is the one that still tastes coherent with food, not the loudest signature serve.",
    ],
    distinctiveInsights: [
      "Dinner-party drinks fail less from bad recipes than from bad pacing and poor service temperature.",
      "A slightly drier drink often performs better across a whole meal because palate fatigue arrives slower.",
      "Guests remember smooth service and clear flavor more than they remember maximal ingredient complexity.",
    ],
    internalLinks: ["/cocktails/batchable-original-cocktails", "/cocktails/spirit-forward-cocktails", "/cocktails/highballs-and-spritzes"],
    faq: [
      { question: "Should dinner-party drinks be batched?", answer: "Often yes, if the format survives batching and the host wants cleaner pacing. Sparkling components should still be added at service. [VERIFY FACT]" },
      { question: "What style of drink works best before food arrives?", answer: "Usually something lighter, drier, and appetite-friendly rather than creamy or overly sweet." },
      { question: "How many drink styles should a small dinner party offer?", answer: "Usually fewer than people think. One or two well-chosen options are often better than a chaotic menu." },
    ],
    editorialNotes: [
      "A human host note should mention what actually held up over a full evening.",
      "No page should recommend complicated last-minute garnish work unless the host workflow supports it.",
    ],
    humanCommentaryPrompt: "Add an editor note on which drink style stayed most useful over an actual hosted dinner.",
    flags: ["Needs human hosting commentary for service realism"],
  },
  {
    template: "cocktails-by-base-spirit",
    routePattern: "/cocktails/base-spirit/[spirit]",
    slug: "/cocktails/base-spirit/gin",
    title: "Gin Cocktails for Home Bartenders Who Want Precision, Not Perfume",
    subjectLabel: "Gin",
    spirit: "gin",
    recommendations: [
      "Separate gin drinks by structural direction: highballs, gimlets, martini-style drinks, and bitter spritzes.",
      "Recommend cleaner citrus and tonic structures before heavily floral builds for readers still learning balance.",
      "Show which gin styles tolerate herbs, tea, and savory notes without turning the drink soapy.",
    ],
    distinctiveInsights: [
      "Gin is easiest to misuse when readers treat botanicals as a substitute for drink structure.",
      "A cleaner gin build often tastes more 'botanical' than an overdecorated one because the finish stays readable.",
      "Different gin styles change not just flavor but how much sweetness and dilution the drink can carry before it blurs.",
    ],
    internalLinks: ["/cocktails/yuzu-gimlet-riff", "/cocktails/gin-highballs-and-citrus-serves", "/guides/cocktail-flavor-pairing-guides"],
    faq: [
      { question: "What is the easiest gin cocktail family to start with?", answer: "Usually citrus-led and highball-style drinks because they make balance easier to read." },
      { question: "Do all gins work the same in original cocktails?", answer: "No. Some are dry and structural, while others read softer or more floral and need more restraint." },
      { question: "Why do some gin drinks taste perfumed instead of fresh?", answer: "Usually too many aromatic ingredients are competing, or the drink lacks enough acid, bitterness, or dilution control." },
    ],
    editorialNotes: [
      "Human tasting needed before naming specific gin styles or bottles.",
      "Keep the page focused on structural lessons, not shopping hype.",
    ],
    humanCommentaryPrompt: "Add an editor note comparing one drier gin and one softer gin in the same build.",
    flags: ["Needs human spirit comparison before bottle-specific commentary"],
  },
  {
    template: "cocktails-by-flavor-profile",
    routePattern: "/cocktails/flavor-profile/[profile]",
    slug: "/cocktails/flavor-profile/bittersweet",
    title: "Bittersweet Cocktails That Stay Structured Instead of Punishing",
    subjectLabel: "Bittersweet cocktails",
    profile: "bittersweet",
    recommendations: [
      "Curate drinks where bitterness arrives with texture and sweetness support rather than as a blunt finish.",
      "Recommend aperitivo-style drinks, coffee bitter riffs, and citrus-supported stirred drinks as distinct subgroups.",
      "Use the page to teach readers when dilution makes bitterness cleaner rather than weaker.",
    ],
    distinctiveInsights: [
      "Bittersweet is not the same thing as aggressively bitter; the useful version still has movement and contrast.",
      "Many home bartenders over-sweeten bitter drinks because they are trying to hide rough bitterness instead of cleaning it up.",
      "A bittersweet drink often improves with colder service and better dilution discipline because harsh edges show less and structure shows more.",
    ],
    internalLinks: ["/cocktails/cold-brew-negroni-riff", "/cocktails/spirit-forward-cocktails", "/guides/cocktail-flavor-pairing-guides"],
    faq: [
      { question: "What makes a cocktail bittersweet instead of just bitter?", answer: "Usually a drink has enough sweetness, dilution, and aroma to make the bitterness feel layered rather than punishing." },
      { question: "Are bittersweet cocktails always aperitif drinks?", answer: "No. They often overlap with aperitivo styles, but they can also show up in spirit-forward or coffee-accented builds." },
      { question: "How do I make bitter drinks more balanced without making them sweet?", answer: "Work on dilution, citrus lift, and the quality of the bitter component before adding more sugar." },
    ],
    editorialNotes: [
      "A human tasting note should compare a cleaner bittersweet drink with a muddier one.",
      "Avoid equating bitterness with sophistication by default.",
    ],
    humanCommentaryPrompt: "Add an editor note on how dilution changed bitterness in one tested cocktail.",
    flags: ["Needs human tasting note on bitterness and texture interplay"],
  },
  {
    template: "coffee-drinks-by-milk-texture",
    routePattern: "/coffee/milk-texture/[texture]",
    slug: "/coffee/milk-texture/glossy-microfoam",
    title: "Coffee Drinks That Benefit Most From Glossy Microfoam",
    subjectLabel: "Glossy microfoam coffee drinks",
    texture: "glossy microfoam",
    recommendations: [
      "Recommend flat whites, smaller lattes, and cappuccino-adjacent drinks where texture materially changes the drink identity.",
      "Direct readers to drinks that reward integrated milk rather than thick dry foam.",
      "Explain which drinks still work acceptably with weaker home steam wands and which do not.",
    ],
    distinctiveInsights: [
      "Milk texture changes perceived sweetness and coffee definition at the same time, which is why it is not just a presentation issue.",
      "Glossy microfoam often makes a drink taste more complete even when the espresso recipe has not changed.",
      "The wrong milk texture can make a drink taste flat not because the coffee is bad, but because the drink identity has shifted into something thinner or drier than intended.",
    ],
    internalLinks: ["/coffee/microfoam-at-home", "/coffee/why-my-latte-tastes-flat", "/coffee/milk-drinks-and-cafe-style-coffee"],
    faq: [
      { question: "What drinks need glossy microfoam most?", answer: "Usually drinks where milk texture is part of the identity, such as flat whites and tighter milk drinks rather than large airy drinks." },
      { question: "Can a weak steam wand still make the right texture?", answer: "Sometimes, but the drink choice should match the machine's realistic texture ceiling." },
      { question: "Why does better milk texture make coffee taste sweeter?", answer: "It changes texture integration and how the coffee shows through the milk [VERIFY FACT]." },
    ],
    editorialNotes: [
      "Human steaming notes are required before speaking confidently about specific texture results.",
      "The page should connect texture to drink choice, not just texture to latte art.",
    ],
    humanCommentaryPrompt: "Add an editor note on one drink that improved clearly when milk texture improved.",
    flags: ["Needs firsthand steaming note"],
  },
  {
    template: "ingredient-pairing-pages",
    routePattern: "/guides/pairings/[ingredient-a]-with-[ingredient-b]",
    slug: "/guides/pairings/coffee-with-orange",
    title: "Coffee and Orange Pairing Guide for Brewing and Cocktails",
    subjectLabel: "Coffee and orange",
    pairing: "coffee and orange",
    recommendations: [
      "Recommend orange in small aromatic roles for coffee drinks before pushing it into full juice-driven recipes.",
      "Show how orange peel works differently from orange juice in coffee cocktails and milk drinks.",
      "Use pairing recommendations that distinguish chocolatey coffees from high-acid coffees, because the pair behaves differently in each case.",
    ],
    distinctiveInsights: [
      "Orange is often better as aroma and edge than as volume when coffee is involved.",
      "Coffee and orange pair most cleanly when bitterness is articulate; muddy bitterness makes the pairing taste stale fast.",
      "Milk can soften the pairing into comfort, while tonic or amaro can sharpen it into something more aperitif-like.",
    ],
    internalLinks: ["/cocktails/espresso-tonic-with-citrus-liqueur-twist", "/coffee/coffee-beans-and-roast-levels", "/guides/flavor-pairing-guides"],
    faq: [
      { question: "Why do coffee and orange sometimes taste clean together and sometimes taste stale?", answer: "The result depends on bitterness quality, sweetness, and whether the orange is acting as aroma or bulk acid." },
      { question: "Is orange better with espresso or filter coffee?", answer: "Both can work, but the expression changes. Espresso often gives more density, while filter coffee can feel brighter. [VERIFY FACT]" },
      { question: "Should I use juice or peel first?", answer: "Usually peel first if you want a cleaner, more controlled pairing." },
    ],
    editorialNotes: [
      "Human tasting needed before making stronger claims about different coffee styles with orange.",
      "Pairing guidance should stay practical and avoid poetic filler.",
    ],
    humanCommentaryPrompt: "Add an editor note comparing orange peel versus orange juice in one coffee application.",
    flags: ["Needs human tasting comparison"],
  },
  {
    template: "ingredient-pairing-pages",
    routePattern: "/guides/pairings/[ingredient-a]-with-[ingredient-b]",
    slug: "/guides/pairings/rum-with-pineapple",
    title: "Rum and Pineapple Pairing Guide for Highballs, Sours, and Tropical Riffs",
    subjectLabel: "Rum and pineapple",
    pairing: "rum and pineapple",
    recommendations: [
      "Separate clean highball uses from richer sour-style uses so the pairing does not default to sweet tropics every time.",
      "Recommend drier rum styles when the goal is refreshment and fuller rum styles only when bitterness or spice can support them.",
      "Encourage readers to think about pineapple as texture as well as aroma, especially in shaken drinks.",
    ],
    distinctiveInsights: [
      "Pineapple is often more of a texture problem than a flavor problem once a drink starts feeling heavy.",
      "Rum and pineapple taste freshest when bitterness, acid, or carbonation keeps the pairing from turning sleepy.",
      "A tropical note feels more adult when the finish stays dry enough that the second sip is easier than the first.",
    ],
    internalLinks: ["/cocktails/clarified-pineapple-highball", "/cocktails/amaro-and-pineapple-cocktail-dry", "/guides/cocktail-flavor-pairing-guides"],
    faq: [
      { question: "What kind of rum works best with pineapple?", answer: "It depends on the drink. Cleaner rum styles usually work best in lighter drinks, while fuller styles need more structure around them." },
      { question: "Why do pineapple cocktails go syrupy so fast?", answer: "Because pineapple brings body as well as sweetness, so the rest of the recipe needs more tension than many readers expect." },
      { question: "Is clarified pineapple worth it?", answer: "Sometimes. It can make tropical drinks feel cleaner and more carbonated-friendly, but the extra step is not always necessary. [VERIFY FACT]" },
    ],
    editorialNotes: [
      "A human note should compare fresh pineapple builds with clarified or lighter-texture approaches.",
      "Avoid defaulting to tiki logic when the page is trying to teach structure.",
    ],
    humanCommentaryPrompt: "Add an editor note about how pineapple texture changed the drink more than the flavor itself.",
    flags: ["Needs human tasting and clarification note"],
  },
  {
    template: "cocktails-by-base-spirit",
    routePattern: "/cocktails/base-spirit/[spirit]",
    slug: "/cocktails/base-spirit/rye-whiskey",
    title: "Rye Whiskey Cocktails for Drinkers Who Like Spice and Definition",
    subjectLabel: "Rye whiskey",
    spirit: "rye whiskey",
    recommendations: [
      "Curate stirred drinks, aromatic sours, and savory riffs where rye's edge remains useful rather than abrasive.",
      "Recommend rye when readers need spine against citrus, sesame, smoke, or bitters rather than simply more strength.",
      "Use the page to explain when bourbon is softer and when rye is more articulate, not just 'bolder.'",
    ],
    distinctiveInsights: [
      "Rye often feels drier not only because of spice but because it narrows the finish in a useful way.",
      "A rye drink can tolerate a little sweetness better than many readers expect because the finish still stays defined.",
      "The wrong smoke or fruit modifier can make rye feel sharp instead of structured, which is why supporting notes matter.",
    ],
    internalLinks: ["/cocktails/sesame-orange-old-fashioned", "/cocktails/smoked-cherry-sour", "/guides/cocktail-flavor-pairing-guides"],
    faq: [
      { question: "Why choose rye over bourbon in a cocktail?", answer: "Usually because rye keeps the finish more defined and can hold its shape better against sugar or aromatic modifiers." },
      { question: "Is rye always harsher than bourbon?", answer: "Not always. In some cocktails it actually reads cleaner because it keeps sweetness from spreading too far." },
      { question: "What flavors pair best with rye?", answer: "Bitter orange, spice, smoke, stone fruit, and some savory notes often work well when used with restraint. [VERIFY FACT]" },
    ],
    editorialNotes: [
      "Need human tasting before naming bottles or stronger pair claims.",
      "This page should explain structural reasons to pick rye, not just use clich� spice language.",
    ],
    humanCommentaryPrompt: "Add an editor note comparing rye and bourbon in one shared template drink.",
    flags: ["Needs human spirit comparison"],
  },
  {
    template: "cocktails-by-flavor-profile",
    routePattern: "/cocktails/flavor-profile/[profile]",
    slug: "/cocktails/flavor-profile/citrusy-refreshing",
    title: "Citrusy Refreshing Cocktails That Stay Precise Instead of Thin",
    subjectLabel: "Citrusy refreshing cocktails",
    profile: "citrusy refreshing",
    recommendations: [
      "Curate drinks where citrus supports structure, not just acidity.",
      "Include one highball, one gimlet-style drink, and one spritz so the page teaches different refreshing formats.",
      "Recommend drinks that keep sweetness moderate because refreshment drops fast once sugar rises.",
    ],
    distinctiveInsights: [
      "Refreshing cocktails are easiest to ruin when dilution and sweetness are treated as separate problems instead of the same one.",
      "A citrus-forward drink still needs a center; without bitter or spirit structure it just tastes cold and fleeting.",
      "Temperature and carbonation often change perceived citrus precision more than an extra few milliliters of juice.",
    ],
    internalLinks: ["/cocktails/gin-highball-with-citrus-and-herbs", "/cocktails/yuzu-gimlet-riff", "/cocktails/highballs-and-spritzes"],
    faq: [
      { question: "What makes a citrusy cocktail feel precise instead of watery?", answer: "Usually a strong enough center from spirit, bitterness, or carbonation, plus controlled sweetness and temperature." },
      { question: "Do refreshing cocktails always need soda?", answer: "No. Some stay refreshing because of acidity and dilution rather than bubbles." },
      { question: "Why do my citrus drinks taste sharp but not refreshing?", answer: "Often the sweetness, dilution, or temperature is off, so the acid has nothing to balance against." },
    ],
    editorialNotes: [
      "A human note should compare one shaken and one carbonated drink in this profile.",
      "Avoid padding the page with nearly identical sour templates.",
    ],
    humanCommentaryPrompt: "Add an editor note on how carbonation changed the feeling of refreshment in testing.",
    flags: ["Needs human tasting note on texture and refreshment"],
  },
  {
    template: "drinks-by-occasion",
    routePattern: "/guides/drinks-for-[occasion]",
    slug: "/guides/drinks-for-weekend-brunch",
    title: "Weekend Brunch Drinks That Taste Deliberate, Not Sugary",
    subjectLabel: "Weekend brunch drinks",
    occasion: "weekend brunch",
    recommendations: [
      "Curate one sparkling option, one coffee-adjacent option, and one low-lift batchable option for hosts.",
      "Recommend drinks that stay lively before noon rather than dark, heavy, spirit-forward serves.",
      "Use brunch pages to teach pacing, glassware simplicity, and ingredient prep that does not take over the kitchen.",
    ],
    distinctiveInsights: [
      "Brunch drinks fail when they taste louder than the food and conversation around them.",
      "A good brunch drink often needs aroma and lift more than alcohol weight.",
      "Batchability matters more at brunch because the host is usually managing food timing at the same time.",
    ],
    internalLinks: ["/cocktails/spring-brunch-cocktail-with-apricot", "/cocktails/highballs-and-spritzes", "/guides/drinks-for-dinner-parties"],
    faq: [
      { question: "What makes a drink work for brunch?", answer: "Usually brightness, moderate weight, and service ease matter more than complexity." },
      { question: "Should brunch drinks be lower in alcohol?", answer: "Often yes, or at least they should drink lighter and cleaner than evening cocktails." },
      { question: "Can coffee cocktails work at brunch?", answer: "Yes, if they stay refreshing or structured rather than dessert-like." },
    ],
    editorialNotes: [
      "Need a human host note about what actually stayed appealing over a full brunch window.",
      "Do not overload the page with mimosa-adjacent sameness.",
    ],
    humanCommentaryPrompt: "Add an editor note on which brunch drink style guests finished most consistently.",
    flags: ["Needs hosting commentary"],
  },
];

const selectedSlugs = new Set([
  '/coffee/beans/flavor-note/chocolatey',
  '/coffee/beans/flavor-note/citrus-forward',
  '/brewing-method/pour-over/beginner',
  '/brewing-method/espresso/advanced',
  '/guides/drinks-for-dinner-parties',
  '/cocktails/base-spirit/gin',
  '/cocktails/flavor-profile/bittersweet',
  '/coffee/milk-texture/glossy-microfoam',
  '/guides/pairings/coffee-with-orange',
  '/guides/pairings/rum-with-pineapple'
]);

const pages = sampleSeeds.filter((seed) => selectedSlugs.has(seed.slug)).map((seed) => ({
  ...seed,
  intro: renderIntro(seed),
}));

const validations = pages.map((page) => ({ slug: page.slug, ...validatePage(page, pages) }));
const enrichedPages = pages.map((page) => ({ ...page, validation: validations.find((item) => item.slug === page.slug) }));

const programmaticDir = path.join(process.cwd(), "content", "programmatic");
const pagesDir = path.join(programmaticDir, "pages");
fs.rmSync(pagesDir, { recursive: true, force: true });
fs.mkdirSync(pagesDir, { recursive: true });

writeJson(path.join(programmaticDir, "template-models.json"), { templates: templateModels });
writeJson(path.join(programmaticDir, "generation-rules.json"), generationRules);
writeJson(path.join(programmaticDir, "sample-pages.json"), { total: enrichedPages.length, pages: enrichedPages });

for (const page of enrichedPages) {
  const fileName = `${page.slug.split("/").filter(Boolean).join("--")}.md`;
  fs.writeFileSync(path.join(pagesDir, fileName), renderPageMarkdown(page, page.validation));
}

const md = [
  "# Programmatic SEO System",
  "",
  "This system is designed to create selective programmatic pages without drifting into low-value archives.",
  "",
  "## Templates",
  ...templateModels.map((template) => `- ${template.id}: ${template.routePattern} - ${template.purpose}`),
  "",
  "## Generation Rules",
  ...generationRules.principles.map((item) => `- ${item}`),
  "",
  "## Anti-Thin-Page Checks",
  ...generationRules.antiThinPageChecks.map((item) => `- ${item}`),
  "",
  "## Uniqueness Rules",
  ...generationRules.uniquenessRules.map((item) => `- ${item}`),
  "",
  "## Sample Pages",
  ...enrichedPages.map((page) => `- ${page.title} (${page.slug})`),
].join("\n");

fs.writeFileSync(path.join(process.cwd(), "docs", "programmatic-seo-system.md"), md);
console.log("Programmatic SEO system generated.");


