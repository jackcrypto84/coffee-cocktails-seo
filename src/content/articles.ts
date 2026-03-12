import { Article } from "@/lib/content-types";

export const articles: Article[] = [
  {
    slug: "v60-bloom-timing-guide",
    category: "coffee",
    status: "published",
    title: "V60 Bloom Timing Guide: How Long to Bloom for Cleaner, Sweeter Cups",
    description: "A practical guide to bloom timing, degassing, and drawdown control for more consistent V60 brews.",
    eyebrow: "Pour-over fundamentals",
    publishedAt: "2026-02-02",
    updatedAt: "2026-03-05",
    readTime: "8 min read",
    heroKicker: "Fix flat, gassy cups without overcomplicating your recipe.",
    authorSlug: "maya-chen",
    tags: [
      "pour-over",
      "v60",
      "bloom",
      "brew recipes",
      "home brewing"
    ],
    featured: true,
    searchIntent: "informational",
    beanNotes: [
      "citrus-forward",
      "floral"
    ],
    brewingMethods: [
      "pour-over"
    ],
    flavorProfiles: [
      "citrus-forward",
      "floral"
    ],
    occasions: [
      "weekday brewing"
    ],
    seasons: [
      "spring"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Confirm roast-date storage advice against your current editorial standards.",
      "If adding grinder-specific settings, test them on real burr sets first."
    ],
    intro: [
      "Most V60 bloom advice sounds exact until you try it with beans that behave differently. Fresh, dense coffees often need more time to release trapped gas, while older or darker roasts can turn papery if you stretch the bloom too long.",
      "The useful question is not whether 30 seconds is universally correct. It is what bloom length helps your coffee settle, wet evenly, and start extracting without creating dry pockets."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What the bloom is actually doing",
        paragraphs: [
          "The bloom lets carbon dioxide escape before the main pour. If too much gas stays in the bed, water channels around the grounds and extraction gets patchy.",
          "In practice, bloom timing is a control knob for even saturation. You are buying yourself a calmer brew bed, not following a ritual for its own sake."
        ]
      },
      {
        type: "steps",
        title: "A simple timing framework",
        intro: "Use roast level and coffee age as your first clue, then adjust based on taste.",
        items: [
          "Start at 30 seconds for coffees rested 10 to 21 days and roasted light to medium.",
          "Extend toward 40 to 45 seconds when the bed visibly swells with gas or the first main pour stalls.",
          "Shorten toward 20 to 25 seconds for darker roasts or older beans that already smell muted.",
          "If cups taste both sour and hollow, focus on saturation first before changing grind size dramatically."
        ]
      },
      {
        type: "checklist",
        title: "Signs your bloom needs adjustment",
        items: [
          "Bubbles erupt aggressively long after the first pour stops.",
          "Dry islands remain at the edge of the filter.",
          "Drawdown is uneven from one brew to the next with the same grind.",
          "The cup tastes sharp up front but finishes thin."
        ]
      }
    ],
    faq: [
      {
        question: "Should I stir the bloom on every V60 brew?",
        answer: "Not always. Stirring can help dense, fresh coffees wet evenly, but too much agitation can push fines into the filter and slow the drawdown."
      },
      {
        question: "Does a longer bloom always increase sweetness?",
        answer: "No. A slightly longer bloom can improve evenness, but overextending it can flatten brighter coffees or cool the slurry too much."
      }
    ],
    comparison: {
      title: "Best Pour-Over Setup by Need",
      intro: "Choose gear based on what problem you are solving, not on prestige.",
      items: [
        {
          label: "Entry-level kettle",
          bestFor: "New brewers who need steadier pours",
          why: "A predictable stream improves repeatability faster than buying rare filters or accessories."
        },
        {
          label: "Mid-range burr grinder",
          bestFor: "People chasing cleaner cups from better beans",
          why: "Grind consistency usually improves sweetness and clarity more than changing drippers."
        },
        {
          label: "Scale with timer",
          bestFor: "Anyone trying to fix inconsistency",
          why: "It removes guesswork from water delivery and total brew time."
        }
      ]
    },
    featuredProducts: [
      {
        name: "Gooseneck Kettle",
        category: "Brewing gear",
        bestFor: "Controlled bloom pours",
        affiliateLabel: "Affiliate-ready slot",
        notes: "Use this block for a real product once the team approves a recommendation list."
      }
    ]
  },
  {
    slug: "espresso-yield-ratios-explained",
    category: "coffee",
    status: "published",
    title: "Espresso Yield Ratios Explained: When to Pull Short, Standard, or Long",
    description: "A grounded look at dose-to-yield ratios so home baristas can dial espresso based on taste instead of dogma.",
    eyebrow: "Espresso technique",
    publishedAt: "2026-01-22",
    updatedAt: "2026-03-04",
    readTime: "9 min read",
    heroKicker: "Yield ratios matter because they shape balance, not because a chart says so.",
    authorSlug: "maya-chen",
    tags: [
      "espresso",
      "ratio",
      "dialing in",
      "home espresso"
    ],
    featured: true,
    searchIntent: "informational",
    brewingMethods: [
      "espresso"
    ],
    flavorProfiles: [
      "chocolatey",
      "citrus-forward"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Human-check any references to basket sizes against the machines you actually recommend."
    ],
    intro: [
      "The fastest way to make espresso confusing is to talk about ratios as if they were laws. A 1:2 shot is useful because it is repeatable, not because it is always best.",
      "Different coffees open up at different yields. Nutty medium roasts may feel syrupy and balanced at shorter ratios, while high-acid washed coffees often need more yield to taste complete."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What ratio changes in the cup",
        paragraphs: [
          "Shorter shots emphasize body and concentration but can leave acidity underdeveloped.",
          "Longer shots often taste lighter and clearer, though they can turn woody if you push extraction too far."
        ]
      },
      {
        type: "steps",
        title: "How to test ratios without wasting beans",
        items: [
          "Lock your dose first so you only evaluate one variable at a time.",
          "Pull a baseline shot around 1:2 and record yield, time, and taste.",
          "Taste a shorter version if the shot feels thin or underwhelmingly sweet.",
          "Taste a longer version if the shot is intense but sour or cramped."
        ]
      }
    ],
    faq: [
      {
        question: "Is 1:2 always the best espresso ratio?",
        answer: "No. It is a practical baseline, but some coffees show better sweetness or clarity at shorter or longer yields."
      },
      {
        question: "Should I change grind and ratio at the same time?",
        answer: "Usually no. Change one main variable at a time so the result tells you something useful."
      }
    ],
    comparison: {
      title: "Best For Espresso Workflow",
      intro: "Spend where it most affects consistency.",
      items: [
        {
          label: "Precision basket",
          bestFor: "Dialing clarity and repeatable extractions",
          why: "It can help make your prep more honest by reducing random variance."
        },
        {
          label: "Solid tamper",
          bestFor: "Puck prep confidence",
          why: "A comfortable tamper encourages level, repeatable prep without overthinking force."
        }
      ]
    }
  },
  {
    slug: "microfoam-at-home",
    category: "coffee",
    status: "published",
    title: "How to Steam Microfoam at Home Without Turning Milk Into Hot Bubbles",
    description: "A practical microfoam guide for home espresso setups with clearer cues for stretching, polishing, pouring, and fixing common milk-texture mistakes.",
    eyebrow: "Milk drinks",
    publishedAt: "2026-01-12",
    updatedAt: "2026-02-28",
    readTime: "10 min read",
    heroKicker: "Texture first, latte art second.",
    authorSlug: "maya-chen",
    tags: [
      "milk drinks",
      "latte",
      "cappuccino",
      "espresso milk"
    ],
    featured: false,
    searchIntent: "informational",
    brewingMethods: [
      "milk-drinks",
      "espresso"
    ],
    flavorProfiles: [
      "chocolatey"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Add human-tested temperature guidance if the team wants thermometer-specific advice."
    ],
    intro: [
      "Good microfoam is not airy foam sitting on top of hot milk. It is glossy, integrated texture that sweetens milk and lets it pour as one fluid body.",
      "If your milk keeps turning into hot bubbles, the fix is usually timing and wand position rather than buying new gear. Home steam wands can make solid microfoam when you separate stretching from polishing and stop before the milk cooks."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What good microfoam should actually look like",
        paragraphs: [
          "The surface should look glossy rather than dry or frothy. When you swirl the pitcher, the milk should move like wet paint instead of separating into foam on top and thin milk below.",
          "In the cup, good texture makes the drink feel sweeter and more integrated. If the foam sits like a cap or collapses into bubbles immediately, the texture was never fully unified."
        ]
      },
      {
        type: "steps",
        title: "The three-part steaming workflow",
        intro: "Think in phases: stretch a little, polish thoroughly, then pour before the texture separates again.",
        items: [
          "Start with cold milk in a pitcher that gives you room for expansion and purge the wand before steaming.",
          "Keep the wand tip just below the surface early so you hear a gentle paper-tearing sound rather than violent splashing.",
          "After a short stretch, lower the tip slightly and build a whirlpool to fold the bubbles back into the body of the milk.",
          "Stop before the pitcher becomes painfully hot to hold, then tap once if needed and swirl immediately before pouring."
        ]
      },
      {
        type: "steps",
        title: "How to adjust for weak home steam wands",
        items: [
          "Use a slightly smaller milk volume so the wand can move the pitcher contents more effectively.",
          "Stretch a little earlier because weak wands often struggle to incorporate air once the milk is already warming up.",
          "Spend more time polishing than chasing extra foam. Weak steam usually rewards restraint more than ambition."
        ]
      },
      {
        type: "checklist",
        title: "What to troubleshoot first",
        items: [
          "Large visible bubbles mean you added air for too long or kept the tip too high.",
          "Dry foam on top means you stopped swirling the milk into itself.",
          "Thin milk with no body usually means you buried the wand too early and skipped the stretch phase.",
          "A flat, dull latte can also come from overheated milk even when the surface looks smooth."
        ]
      }
    ],
    faq: [
      {
        question: "Can I make latte art with any milk?",
        answer: "Different milks behave differently, but the bigger factor is texture quality. Even dairy milk will pour poorly if the foam is too dry or too thin."
      },
      {
        question: "Why does my milk look glossy in the pitcher but pour badly?",
        answer: "Usually because the texture separated while you hesitated. Swirl right before pouring and do not let the pitcher sit while you arrange the cup."
      },
      {
        question: "Should I steam hotter to get thicker foam?",
        answer: "Usually no. Hotter milk can taste flatter and does not automatically improve texture. Better timing and polishing matter more than extra heat."
      }
    ],
    comparison: {
      title: "Best For Milk Texture Practice",
      intro: "Use equipment that helps you repeat the motion cleanly rather than accessories that only look serious.",
      items: [
        {
          label: "Small pitcher",
          bestFor: "Single milk drinks and weak home steam wands",
          why: "A right-sized pitcher helps the milk roll properly instead of wandering around a half-empty vessel."
        },
        {
          label: "Thermometer clip",
          bestFor: "People who keep overheating milk",
          why: "Useful while learning, especially if you have not built reliable heat cues yet."
        },
        {
          label: "Plain espresso cup set",
          bestFor: "Practicing pour height and integration",
          why: "Consistent cup size makes it easier to judge milk volume and espresso-to-milk balance."
        }
      ]
    }
  },
  {
    slug: "hand-grinder-upgrade-guide",
    category: "coffee",
    status: "published",
    title: "When a Hand Grinder Upgrade Actually Improves Your Coffee",
    description: "A stronger grinder buyer guide that helps home brewers decide whether a hand grinder upgrade will actually improve cup quality or whether another bottleneck deserves the money first.",
    eyebrow: "Gear buying guide",
    publishedAt: "2026-02-18",
    updatedAt: "2026-03-01",
    readTime: "11 min read",
    heroKicker: "Buy the upgrade that changes the cup, not the one that just sounds serious.",
    authorSlug: "maya-chen",
    tags: [
      "grinders",
      "gear",
      "buying guide",
      "brew quality"
    ],
    featured: false,
    searchIntent: "commercial",
    brewingMethods: [
      "pour-over",
      "espresso"
    ],
    flavorProfiles: [
      "chocolatey",
      "citrus-forward"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Any named grinder examples should be manually reviewed before publishing."
    ],
    intro: [
      "A grinder upgrade is worth it when grind consistency is visibly limiting your brews. If your coffee is stale or your recipe is erratic, the grinder will not rescue the cup by itself.",
      "The most useful question is not whether a better hand grinder is 'worth it' in the abstract. It is whether your current cups are being limited by particle control, adjustment range, workflow friction, or simply by variables that a grinder cannot fix."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What a grinder upgrade should actually improve",
        paragraphs: [
          "A good grinder upgrade should make adjustments more predictable, reduce wild swings between brews, and help the same coffee taste more stable from one session to the next.",
          "It should not be expected to replace fresher beans, better note-taking, or a recipe you can actually repeat. If the workflow is chaotic, a premium grinder just gives chaos more precision."
        ]
      },
      {
        type: "steps",
        title: "The real signs your grinder is the bottleneck",
        items: [
          "Two brews with the same inputs swing from sharp to dull even when your pours and water volume stayed disciplined.",
          "One small click jumps from choked to watery, which usually means the adjustment range is not fine enough for your method.",
          "Your brews stall unpredictably or finish muddy even after you simplify the recipe and use good beans.",
          "You keep compensating for inconsistency by changing ratio, water temperature, and agitation all at once."
        ]
      },
      {
        type: "steps",
        title: "When the grinder is not the first thing to fix",
        items: [
          "If you still buy old or low-quality coffee, fresher beans will often change the cup more than a grinder upgrade.",
          "If your pour-over routine is inconsistent, a scale or calmer workflow may do more for repeatability than new burrs.",
          "If you steam milk poorly or pull unstable espresso shots, the next dollar may belong in technique practice before equipment."
        ]
      },
      {
        type: "paragraphs",
        title: "How to choose between a grinder, kettle, scale, or waiting",
        paragraphs: [
          "Choose the grinder first when flavor swings and adjustment frustration keep showing up even after the rest of the brew is controlled.",
          "Choose a kettle first when your pours are the least repeatable part of the workflow and you mostly brew manual filter coffee.",
          "Choose a scale first when you are still brewing by feel and cannot tell whether the problem is dose, ratio, or time. Choose nothing yet when you are changing too many variables to diagnose the real bottleneck."
        ]
      },
      {
        type: "checklist",
        title: "Buyer questions worth asking before you upgrade",
        items: [
          "Do you need espresso-capable adjustment precision, or mostly cleaner filter coffee?",
          "Will the grinder make your daily workflow faster and more consistent, or just more aspirational?",
          "Are you solving cup quality, portability, or the desire to own nicer gear?",
          "Can you describe a repeatable flaw in the cup that the upgrade is meant to fix?"
        ]
      }
    ],
    faq: [
      {
        question: "Will a better grinder make supermarket beans taste specialty?",
        answer: "No. It can improve consistency, but it cannot create freshness or flavor complexity that is not in the coffee."
      },
      {
        question: "When is a hand grinder upgrade most noticeable for pour-over?",
        answer: "Usually when your current grinder produces muddy cups, inconsistent drawdowns, or very wide jumps between settings. Cleaner particle control is often most obvious in clarity and finish."
      },
      {
        question: "Should I upgrade my grinder before buying better beans?",
        answer: "Usually no. Better beans often improve the cup more immediately. The grinder becomes the right next purchase once you are already brewing coffee worth treating carefully."
      }
    ],
    comparison: {
      title: "Best Upgrade Scenarios by Bottleneck",
      intro: "Buy according to the problem you can already describe, not according to internet prestige.",
      items: [
        {
          label: "Filter brewer with muddy cups",
          bestFor: "A grinder with cleaner particle distribution",
          why: "If you already brew carefully, grind quality often changes clarity more than another dripper purchase."
        },
        {
          label: "Manual brewer with messy pours",
          bestFor: "A better kettle or scale before a premium grinder",
          why: "If the pouring workflow is chaotic, a grinder upgrade may reveal inconsistency more than it solves it."
        },
        {
          label: "Weekend espresso tinkerer",
          bestFor: "Finer adjustment control and repeatable dialing",
          why: "Espresso punishes vague grinder steps much faster than pour-over does."
        }
      ]
    },
    featuredProducts: [
      {
        name: "Hand grinder comparison slot",
        category: "Brewing gear",
        bestFor: "Readers deciding between filter-first and espresso-capable upgrades",
        affiliateLabel: "Affiliate-ready slot",
        notes: "Populate with real tested recommendations only after the editorial team logs firsthand burr, adjustment, and workflow notes."
      }
    ]
  },
  {
    slug: "why-your-pour-over-tastes-bitter",
    category: "coffee",
    status: "published",
    title: "Why Your Pour-Over Tastes Bitter: The Fastest Fixes to Try First",
    description: "A sharper troubleshooting guide for bitter pour-over coffee with practical adjustments for grind, agitation, brew time, and roast-related bitterness.",
    eyebrow: "Troubleshooting",
    publishedAt: "2026-01-30",
    updatedAt: "2026-03-03",
    readTime: "9 min read",
    heroKicker: "Solve the bitter cup before you start blaming the beans or buying new gear.",
    authorSlug: "maya-chen",
    tags: [
      "troubleshooting",
      "pour-over",
      "bitterness"
    ],
    featured: false,
    searchIntent: "informational",
    brewingMethods: [
      "pour-over"
    ],
    flavorProfiles: [
      "bittersweet",
      "chocolatey"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Human-check any water chemistry additions before publication."
    ],
    intro: [
      "Bitterness in pour-over usually comes from a few repeat offenders: too fine a grind, too much agitation, or a recipe that extracts late-stage harshness from the bed.",
      "The fastest fix is not changing everything at once. Start with the variables that most often push a brew from sweet into drying: grind, agitation, water temperature, and total brew time."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What bitter actually means in the cup",
        paragraphs: [
          "A bitter cup is not always just 'strong coffee.' In pour-over, bitterness often shows up as a dry finish, a rough aftertaste, or a muddy middle that makes the sweetness disappear.",
          "That distinction matters because some brews are concentrated but still balanced. The problem is usually not intensity by itself. It is harsh extraction that crowds out clarity."
        ]
      },
      {
        type: "steps",
        title: "What to change in order",
        items: [
          "Coarsen the grind slightly if the brew is dragging, stalling, or finishing well past your normal drawdown.",
          "Reduce swirling and aggressive pouring if the slurry becomes muddy or if the bed stalls late.",
          "Lower water temperature slightly if darker roasts or more soluble coffees keep tasting roasty and dry.",
          "Keep the ratio stable while troubleshooting so you can actually tell whether extraction improved."
        ]
      },
      {
        type: "steps",
        title: "Quick diagnosis by symptom",
        items: [
          "Bitter and muddy usually points to fines, too much agitation, or a grind that is too fine for the brewer.",
          "Bitter and smoky can point to roast character being pushed too far, especially if the water is very hot.",
          "Bitter and weak at the same time often means uneven extraction rather than simply not enough coffee."
        ]
      },
      {
        type: "checklist",
        title: "Common mistakes that keep the cup bitter",
        items: [
          "Changing dose first and confusing strength with extraction quality.",
          "Using hotter water because the internet told you hotter always extracts better.",
          "Overcorrecting with huge grind changes instead of moving one notch at a time.",
          "Ignoring stale coffee or a dirty grinder as contributors to a flat-bitter finish."
        ]
      }
    ],
    faq: [
      {
        question: "Does bitterness always mean overextraction?",
        answer: "Not always. Roast level, stale coffee, and even a dirty grinder can add bitter notes, so taste context matters."
      },
      {
        question: "Should I use less coffee to make bitter pour-over taste cleaner?",
        answer: "Usually no. Fix grind, agitation, and brew time first. Using less coffee can make the cup weaker without removing the harsh extraction problem."
      },
      {
        question: "Why does my pour-over taste bitter even with a normal brew time?",
        answer: "Brew time is only one clue. Water that is too hot, heavy agitation, stale beans, or a grinder producing too many fines can still make the cup bitter."
      }
    ],
    comparison: {
      title: "Best For Bitter Pour-Over Fixes",
      intro: "The smartest fix is usually the one that removes confusion, not the one that adds more hardware.",
      items: [
        {
          label: "Scale with timer",
          bestFor: "People whose brew times drift from day to day",
          why: "You cannot troubleshoot bitterness cleanly if your water delivery and drawdown timing keep changing."
        },
        {
          label: "Consistent burr grinder",
          bestFor: "Brewers fighting muddy cups and random stalls",
          why: "More even particle size often improves bitterness faster than changing drippers."
        },
        {
          label: "Simple recipe log",
          bestFor: "Anyone changing too many variables at once",
          why: "A few written notes often solve more bitterness than another accessory purchase."
        }
      ]
    }
  },
  {
    slug: "decaf-for-espresso-milk-drinks",
    category: "coffee",
    status: "published",
    title: "Choosing Decaf for Espresso Milk Drinks Without Ending Up With Flat Flavor",
    description: "How to choose decaf for espresso milk drinks with better guidance on roast development, solubility, and what still shows up once milk softens the shot.",
    eyebrow: "Beans and roast choices",
    publishedAt: "2026-02-24",
    updatedAt: "2026-03-05",
    readTime: "9 min read",
    heroKicker: "Buy for sweetness and structure, not wishful tasting notes that disappear under milk.",
    authorSlug: "maya-chen",
    tags: [
      "decaf",
      "espresso",
      "milk drinks",
      "beans"
    ],
    featured: false,
    searchIntent: "commercial",
    beanNotes: [
      "chocolatey"
    ],
    brewingMethods: [
      "espresso",
      "milk-drinks"
    ],
    flavorProfiles: [
      "chocolatey"
    ],
    ingredients: [
      "coffee-beans"
    ],
    verificationNotes: [
      "Do not publish processing claims about specific decaf methods without sourcing and review."
    ],
    intro: [
      "Milk softens edges and suppresses delicate notes, so decaf for milk drinks should lean toward sweetness, structure, and clear cocoa or caramel character rather than chasing fragile florals.",
      "The most useful question is not whether a decaf sounds exciting on the bag. It is whether the coffee can still taste present once milk lowers contrast and rounds off the shot."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why some decaf disappears in milk",
        paragraphs: [
          "Some decafs taste pleasant as straight espresso but collapse in milk because the shot is too light, too tea-like, or too dependent on delicate aromatics.",
          "Milk rewards coffees with enough sweetness and enough mid-palate structure to stay visible after dilution. That is why chocolate, nougat, roasted nut, and softer fruit notes usually work better than fragile florals here."
        ]
      },
      {
        type: "paragraphs",
        title: "What to look for in the bag",
        paragraphs: [
          "Choose tasting descriptions that suggest chocolate, nougat, roasted nuts, or soft stone fruit rather than ultra-light tea-like notes.",
          "Medium roast development is often easier to extract consistently in home milk drinks than very light decaf.",
          "If the roaster gives brew guidance, look for language that suggests balance and sweetness rather than only brightness or complexity."
        ]
      },
      {
        type: "steps",
        title: "How to evaluate a decaf before committing to a whole bag",
        items: [
          "Taste the espresso by itself and ask whether it is sweet enough to survive milk instead of merely being drinkable on its own.",
          "Pull one shot slightly shorter and one slightly longer to see where the coffee develops structure without turning hollow.",
          "If possible, try the same decaf in a small milk drink before you assume the bag notes will translate."
        ]
      },
      {
        type: "checklist",
        title: "Common buying mistakes",
        items: [
          "Choosing decaf for novelty tasting notes that vanish under milk.",
          "Buying very light decaf because it sounds premium even though your machine struggles to extract it cleanly.",
          "Assuming all flat milk drinks mean the decaf is bad instead of checking espresso ratio and milk texture too."
        ]
      }
    ],
    faq: [
      {
        question: "Is decaf always harder to dial in for espresso?",
        answer: "It can be less forgiving, but a sensible dose, a slightly coarser grind, and realistic flavor goals usually make it manageable."
      },
      {
        question: "Should I choose darker decaf for cappuccinos and lattes?",
        answer: "Often a medium to medium-dark decaf is easier to keep present in milk, but very dark roasts can swap structure for roast bitterness. Balance matters more than roast language alone."
      },
      {
        question: "Can a lighter decaf still work in milk drinks?",
        answer: "Yes, but it usually needs more careful dialing and may still taste subtler than cocoa-forward decafs designed for milk-friendly balance."
      }
    ],
    comparison: {
      title: "Best For Decaf Milk Drink Buying",
      intro: "Choose according to the drink you actually make most often.",
      items: [
        {
          label: "Flat white drinker",
          bestFor: "Decaf with concentrated sweetness and a shorter ratio sweet spot",
          why: "Smaller milk drinks still need a shot with enough body to stay centered."
        },
        {
          label: "Latte drinker",
          bestFor: "Decaf with chocolate and caramel notes that hold through more milk",
          why: "Larger milk volume rewards coffees with broader sweetness and less fragile acidity."
        },
        {
          label: "Evening cappuccino routine",
          bestFor: "Consistent, forgiving decaf you can dial quickly",
          why: "The best bag is often the one that tastes good without a heroic amount of tweaking after dinner."
        }
      ]
    }
  },
  {
    slug: "sesame-orange-old-fashioned",
    category: "cocktails",
    status: "published",
    title: "Sesame Orange Old Fashioned: A Savory-Sweet Whiskey Riff That Still Drinks Clean",
    description: "An original old fashioned variation that uses toasted sesame and orange oils without becoming heavy or cloying.",
    eyebrow: "Original whiskey cocktail",
    publishedAt: "2026-01-10",
    updatedAt: "2026-03-02",
    readTime: "7 min read",
    heroKicker: "Build depth with aroma and texture, not sugar overload.",
    authorSlug: "julian-vale",
    tags: [
      "whiskey",
      "old fashioned",
      "original cocktail",
      "savory"
    ],
    featured: true,
    searchIntent: "mixed",
    spiritBases: [
      "rye-whiskey"
    ],
    flavorProfiles: [
      "bittersweet",
      "chocolatey"
    ],
    occasions: [
      "date night",
      "cool weather hosting"
    ],
    seasons: [
      "autumn",
      "winter"
    ],
    ingredients: [
      "rye-whiskey",
      "citrus"
    ],
    verificationNotes: [
      "Human-test final sesame tincture strength before publishing exact dash counts."
    ],
    intro: [
      "This drink keeps the old fashioned's skeletal structure but changes the accent notes. Toasted sesame adds a savory halo, while orange keeps the finish lifted instead of dense."
    ],
    sections: [
      {
        type: "steps",
        title: "Build the drink",
        items: [
          "Stir rye, sesame syrup or tincture, and bitters with cold dense ice until the drink is chilled and slightly softened.",
          "Strain over a large cube to slow dilution after service.",
          "Express orange peel over the surface to brighten the savory middle."
        ]
      },
      {
        type: "paragraphs",
        title: "How to keep it from tasting sticky",
        paragraphs: [
          "Sesame reads rich very quickly, so sweetness should stay restrained.",
          "A drier rye usually works better here than a soft bourbon because the spice keeps the finish defined."
        ]
      }
    ],
    faq: [
      {
        question: "Can I make this with bourbon instead of rye?",
        answer: "Yes, but reduce sweetness and watch the finish. Bourbon can make the drink read broader and softer."
      }
    ],
    comparison: {
      title: "Best Bar Tools for Stirred Whiskey Drinks",
      intro: "Keep your setup simple and capable.",
      items: [
        {
          label: "Mixing glass",
          bestFor: "Batching stirred drinks for guests",
          why: "More room makes dilution easier to control when you need to stir multiple portions cleanly."
        },
        {
          label: "Large-format ice mold",
          bestFor: "Slow dilution in spirit-forward drinks",
          why: "A single large cube preserves structure better than a pile of small cubes."
        }
      ]
    },
    featuredProducts: [
      {
        name: "Japanese-style bar spoon",
        category: "Bar tool",
        bestFor: "Controlled stirring",
        affiliateLabel: "Affiliate-ready slot",
        notes: "Replace with a reviewed recommendation after hands-on testing."
      }
    ]
  },
  {
    slug: "yuzu-gimlet-riff",
    category: "cocktails",
    status: "published",
    title: "Yuzu Gimlet Riff: How to Keep Bright Citrus Cocktails Precise Instead of Perfumed",
    description: "A fuller yuzu gimlet riff guide with clearer substitution logic, dilution reasoning, and better guardrails for keeping bright citrus cocktails precise instead of perfumed.",
    eyebrow: "Gin original",
    publishedAt: "2026-02-06",
    updatedAt: "2026-03-06",
    readTime: "9 min read",
    heroKicker: "Citrus brightness only works when the structure stays dry, sharp, and controlled.",
    authorSlug: "julian-vale",
    tags: [
      "gin",
      "gimlet",
      "citrus",
      "original cocktail"
    ],
    featured: true,
    searchIntent: "mixed",
    spiritBases: [
      "gin"
    ],
    flavorProfiles: [
      "citrus-forward",
      "floral"
    ],
    occasions: [
      "aperitif",
      "dinner party"
    ],
    seasons: [
      "spring",
      "summer"
    ],
    ingredients: [
      "gin",
      "citrus"
    ],
    verificationNotes: [
      "If exact yuzu products are named later, add availability notes and human testing context."
    ],
    intro: [
      "A good gimlet riff should feel snapped into focus. Yuzu-style brightness works best when the drink remains dry enough to taste like a cocktail instead of a flavored cordial.",
      "The trap here is obvious: yuzu-adjacent ingredients can sound exciting long before they taste coherent. If the citrus modifier gets louder than the gin, or the aroma outruns the finish, the drink stops feeling precise and starts feeling perfumed."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "What keeps a bright citrus riff from turning vague",
        paragraphs: [
          "The base spirit still has to hold the center of the drink. Yuzu-style brightness should sharpen the frame, not replace it with a softer citrus candy effect.",
          "That is why dilution matters so much here. Too little and the drink feels sharp and crowded. Too much and the citrus floats above a thin, washed-out middle."
        ]
      },
      {
        type: "steps",
        title: "How to balance the profile",
        items: [
          "Keep the base spirit visible by resisting overbuilt citrus modifiers or sweeteners that make the drink feel broader than a gimlet should.",
          "Use measured dilution so the finish stays taut and aromatic instead of harsh at first sip and empty a minute later.",
          "Add floral accents carefully because yuzu-adjacent aromas can become perfumed fast when they are not anchored by dryness."
        ]
      },
      {
        type: "steps",
        title: "How to think about substitutions",
        items: [
          "If you are not using actual yuzu, choose a substitute for the job it is doing: brightness, peel aroma, or softness. Do not assume every citrus swap behaves the same.",
          "A brighter substitute may need less volume than a softer one, or the drink can become all top-note and no spine.",
          "If a substitute changes the drink from gimlet riff to broader sour or citrus martini territory, say that clearly rather than pretending the family stayed identical."
        ]
      },
      {
        type: "checklist",
        title: "Common ways this style goes wrong",
        items: [
          "Too much citrus modifier makes the drink smell more precise than it tastes.",
          "Sweetness used to soften the edges can quickly erase the dry, clipped finish that makes the format work.",
          "A floral or modern gin can stack with the citrus aroma and make the result feel perfumed instead of clean.",
          "Under-dilution makes the drink read angular rather than focused."
        ]
      }
    ],
    faq: [
      {
        question: "What style of gin works best here?",
        answer: "A clean London dry or a restrained modern gin usually keeps the citrus in focus without muddling the finish."
      },
      {
        question: "What should I use if I cannot get real yuzu?",
        answer: "Use a substitute that matches the role you need most, whether that is acidity, peel aroma, or brightness. The important part is preserving structure instead of just adding more citrus volume."
      },
      {
        question: "Why did my yuzu-style riff taste perfumed instead of crisp?",
        answer: "Usually because the aromatic side outran the dry structure. Too much modifier, too much floral character, or too little dilution can all push it in that direction."
      }
    ],
    comparison: {
      title: "Best For Bright Citrus Cocktail Precision",
      intro: "Use tools and ingredients that keep the drink narrow, not louder.",
      items: [
        {
          label: "Restrained London dry gin",
          bestFor: "Keeping the citrus note framed instead of crowded",
          why: "A drier gin usually leaves more room for a yuzu-style accent to read clearly."
        },
        {
          label: "Accurate jigger",
          bestFor: "Small citrus-modifier adjustments",
          why: "A tiny overpour can move this style from crisp to perfumed very quickly."
        },
        {
          label: "Cold coupe or Nick and Nora",
          bestFor: "Maintaining a tight finish through service",
          why: "A well-chilled glass protects the drink from softening too fast after strain."
        }
      ]
    }
  },
  {
    slug: "clarified-pineapple-highball",
    category: "cocktails",
    status: "published",
    title: "Clarified Pineapple Highball: Tropical Flavor With a Dry, Transparent Finish",
    description: "A clearer guide to pineapple highballs that explains when clarification helps, how dryness is protected, and why tropical flavor does not need juice-bar heaviness.",
    eyebrow: "Highball technique",
    publishedAt: "2026-01-28",
    updatedAt: "2026-03-01",
    readTime: "10 min read",
    heroKicker: "Keep the pineapple in the aroma and the structure in the glass.",
    authorSlug: "julian-vale",
    tags: [
      "highball",
      "pineapple",
      "clarification",
      "carbonation"
    ],
    featured: false,
    searchIntent: "informational",
    spiritBases: [
      "gin"
    ],
    flavorProfiles: [
      "citrus-forward"
    ],
    occasions: [
      "party",
      "warm-weather brunch"
    ],
    seasons: [
      "summer"
    ],
    ingredients: [
      "gin",
      "citrus"
    ],
    verificationNotes: [
      "Clarification yield and food-safety handling should be reviewed before exact batch instructions go live."
    ],
    intro: [
      "The appeal of a pineapple highball is aroma and refreshment, not density. Clarification methods or clarified-style batching help strip out visual heaviness while keeping a tropical nose.",
      "The point is not to make the drink fancy for its own sake. It is to keep pineapple bright enough for a tall drink without turning the whole glass into sweet fruit soda."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why this style works",
        paragraphs: [
          "Carbonation feels sharper when the liquid is cleaner and lower in pulp.",
          "A dry finish makes the drink more repeatable over a full glass rather than exciting for only the first sip.",
          "Clarification or clarified-style prep also gives you more room for spirit choice because the drink is not fighting through heavy juice texture."
        ]
      },
      {
        type: "steps",
        title: "What to preserve while building it",
        items: [
          "Keep sweetness modest because pineapple reads fuller than it looks on paper.",
          "Use enough acid or bitter structure that the drink still tastes like a cocktail instead of a tropical soft drink.",
          "Choose a spirit base that can stay visible in a tall format rather than hiding behind fruit aroma."
        ]
      },
      {
        type: "steps",
        title: "When clarification is worth the trouble",
        items: [
          "Use clarification when the original drink tastes appealing but heavy, pulpy, or too broad over a full serve.",
          "Skip it if the drink already tastes clean and the extra labor does not improve service or balance.",
          "For home batching, treat yield and food-safety notes as mandatory review points before publishing exact instructions."
        ]
      },
      {
        type: "checklist",
        title: "Common ways this drink goes wrong",
        items: [
          "Using a sweet pineapple component without enough bitter or acid tension.",
          "Building the drink long but forgetting that dilution changes the finish faster than the first sip suggests.",
          "Treating clarification as a gimmick instead of asking what structural problem it is solving."
        ]
      }
    ],
    faq: [
      {
        question: "Do I need a centrifuge for a clarified-style drink?",
        answer: "No. Home-friendly approaches exist, but they require patience and should be tested carefully before you publish exact workflows."
      },
      {
        question: "Why not just use pineapple juice in a normal highball?",
        answer: "You can, but juice often makes the drink thicker and softer. Clarified or clarified-style versions keep the aroma while protecting carbonation and finish."
      },
      {
        question: "What kind of spirit works best in a pineapple highball like this?",
        answer: "A dry, clean base usually works better than something very sweet or oaky. The drink needs structure more than extra richness."
      }
    ],
    comparison: {
      title: "Best For Tropical Highball Builds",
      intro: "Choose tools and prep styles that protect lift, not just presentation.",
      items: [
        {
          label: "Dense ice",
          bestFor: "Keeping a long drink crisp through the second half of the glass",
          why: "Slow melt matters more than decorative garnish when carbonation and dryness are the point."
        },
        {
          label: "Tall chilled glassware",
          bestFor: "Sharper carbonation and cleaner aroma",
          why: "Temperature control helps the drink stay focused instead of widening into sweetness."
        },
        {
          label: "Measured batching note",
          bestFor: "People serving more than one round",
          why: "A repeatable pre-batch is useful only if it preserves the same finish as the single-serve version."
        }
      ]
    }
  },
  {
    slug: "rosemary-apricot-spritz",
    category: "cocktails",
    status: "published",
    title: "Rosemary Apricot Spritz for Spring Hosting",
    description: "A more complete spring spritz guide with stronger balance logic for apricot sweetness, rosemary aroma, batching, and keeping the finish dry enough to stay refreshing.",
    eyebrow: "Seasonal spritz",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-07",
    readTime: "8 min read",
    heroKicker: "A spring spritz should feel deliberate from aroma to finish, not like fruit syrup wearing bubbles.",
    authorSlug: "julian-vale",
    tags: [
      "spritz",
      "apricot",
      "rosemary",
      "spring cocktails"
    ],
    featured: false,
    searchIntent: "mixed",
    spiritBases: [
      "gin"
    ],
    flavorProfiles: [
      "floral",
      "citrus-forward"
    ],
    occasions: [
      "brunch",
      "spring gathering"
    ],
    seasons: [
      "spring"
    ],
    ingredients: [
      "gin",
      "citrus"
    ],
    verificationNotes: [
      "Human-verify batch scaling for group service."
    ],
    intro: [
      "Apricot can turn jammy fast, so rosemary is doing more than adding aroma here. It provides vertical lift and keeps the fruit from reading sleepy.",
      "The trick with a house spritz like this is not making it louder. It is keeping the apricot fragrant, the herbal note clean, and the finish dry enough that a second glass still sounds appealing."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why rosemary helps the drink stay bright",
        paragraphs: [
          "Rosemary adds structure through aroma rather than sugar or bitterness. That matters because apricot often brings softness before it brings definition.",
          "Used carefully, the herb makes the fruit feel fresher and more lifted. Used heavily, it can make the drink read woody or candle-like."
        ]
      },
      {
        type: "steps",
        title: "How to keep the spritz lively",
        items: [
          "Use chilled components so the soda or sparkling wine stays energetic.",
          "Keep sweetness modest because bubbles amplify perceived sugar.",
          "Express a citrus garnish at service to wake up the nose.",
          "If batching for guests, separate still ingredients from sparkling components until the last moment."
        ]
      },
      {
        type: "steps",
        title: "How to stop it turning generic",
        items: [
          "Let one element lead. If apricot is the center, rosemary should frame it instead of shouting over it.",
          "Keep bitterness or dryness in the build so the drink does not feel like sparkling jam.",
          "Taste it again after a few minutes of dilution because some spritzes only seem balanced when ice melt has not started doing real work yet."
        ]
      },
      {
        type: "checklist",
        title: "Common spring spritz mistakes",
        items: [
          "Building with too much fruit sweetness and not enough tension.",
          "Using rosemary so heavily that the drink smells like garnish before it smells like a cocktail.",
          "Under-icing the glass and letting the drink go soft too early in service."
        ]
      }
    ],
    faq: [
      {
        question: "Can this work as a non-alcoholic spritz?",
        answer: "Yes, but the bitter and herbal backbone needs to be rebuilt thoughtfully rather than simply removing the spirit."
      },
      {
        question: "Should I use apricot liqueur, puree, or syrup?",
        answer: "The best choice depends on how sweet and textured you want the drink to be. What matters most is keeping the apricot clear without letting it make the drink feel heavy."
      },
      {
        question: "How much rosemary is too much?",
        answer: "Less than many people think. Rosemary should lift the aroma and sharpen the fruit, not become the first and last thing you taste."
      }
    ],
    comparison: {
      title: "Best For Hosting-Friendly Spritz Service",
      intro: "Good spritz service is mostly about keeping the drink alive from the first guest to the last pour.",
      items: [
        {
          label: "Pre-chilled glassware",
          bestFor: "Sharper first pours during group service",
          why: "A cold glass protects carbonation and delays the point where sweetness starts to swell."
        },
        {
          label: "Measured batching bottle",
          bestFor: "Consistent apricot and herbal balance",
          why: "A pre-measured still mix keeps the drink from drifting sweeter with every rushed pour."
        },
        {
          label: "Fresh citrus garnish prep",
          bestFor: "Keeping the aroma vivid at service",
          why: "A final citrus expression does more for lift than simply adding more bubbles."
        }
      ]
    }
  },
  {
    slug: "cold-brew-negroni-riff",
    category: "cocktails",
    status: "published",
    title: "Cold Brew Negroni Riff: A Coffee Cocktail That Stays Bitter, Balanced, and Dry",
    description: "A fuller guide to building a cold brew Negroni riff that stays bitter, dry, and coherent instead of slipping into muddy sweetness.",
    eyebrow: "Coffee cocktails",
    publishedAt: "2026-02-14",
    updatedAt: "2026-03-04",
    readTime: "10 min read",
    heroKicker: "Coffee belongs here only when it sharpens the structure instead of clouding it.",
    authorSlug: "julian-vale",
    tags: [
      "coffee cocktail",
      "negroni",
      "bitter cocktails"
    ],
    featured: true,
    searchIntent: "mixed",
    spiritBases: [
      "gin"
    ],
    flavorProfiles: [
      "bittersweet",
      "chocolatey"
    ],
    occasions: [
      "after dinner",
      "cocktail hour"
    ],
    seasons: [
      "autumn",
      "winter"
    ],
    ingredients: [
      "gin",
      "coffee-beans"
    ],
    verificationNotes: [
      "Any exact coffee concentrate ratios should be bench-tested before publication."
    ],
    intro: [
      "Coffee in a Negroni-style drink can work beautifully, but only if bitterness stays articulate. The goal is not mocha. It is a more layered bitter-red aperitivo experience.",
      "That means coffee has to behave like a structural modifier, not a novelty ingredient. If it turns the drink sweet, foggy, or thick, the riff has lost the very tension that made the original family worth borrowing in the first place."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "The key design choice",
        paragraphs: [
          "Use coffee as a seasoning note, not as the dominant volume component.",
          "Choose a coffee profile with cocoa or citrus structure so it echoes existing bitter and botanical notes.",
          "The best versions keep the center recognizably Negroni-adjacent even after the coffee enters the build."
        ]
      },
      {
        type: "steps",
        title: "How to keep the riff dry and legible",
        items: [
          "Start with a normal bitter-red template and add coffee in small increments rather than building the recipe around concentrate first.",
          "Use filtered cold brew or a clean concentrate so sediment and muddiness do not flatten the finish.",
          "Taste for whether the coffee extends the bitterness or simply covers the botanicals. If it covers them, back it down."
        ]
      },
      {
        type: "steps",
        title: "Where the drink usually goes wrong",
        items: [
          "Too much coffee turns the riff from bitter and layered into soft and murky.",
          "Sweet coffee concentrates can make the drink read like a dessert aperitivo without meaning to.",
          "Espresso can work, but its texture and crema change dilution quickly and often make the result feel less stable over time."
        ]
      },
      {
        type: "checklist",
        title: "How to judge the final version",
        items: [
          "The first sip should still feel bitter-red before the coffee settles in.",
          "The middle should gain depth, not extra weight.",
          "The finish should stay dry enough that the next sip sounds good instead of exhausting."
        ]
      }
    ],
    faq: [
      {
        question: "Should I use espresso instead of cold brew?",
        answer: "Espresso can work, but it changes texture and dilution more aggressively. Cold brew or a filtered concentrate is easier to integrate cleanly."
      },
      {
        question: "What kind of coffee works best in this style of riff?",
        answer: "Usually a coffee with cocoa, citrus, or structured bittersweet notes works better than something very floral or heavily fermented. You want resonance, not chaos."
      },
      {
        question: "How do I know when I have added too much coffee?",
        answer: "When the drink stops tasting like a bitter aperitivo with a coffee accent and starts tasting like a coffee cocktail first. The family resemblance should still be obvious."
      }
    ],
    comparison: {
      title: "Best For Bitter Coffee-Cocktail Builds",
      intro: "Choose tools and ingredients that help the drink stay transparent, not louder.",
      items: [
        {
          label: "Filtered cold brew concentrate",
          bestFor: "Sharper integration in stirred drinks",
          why: "Cleaner concentrate preserves bitterness and texture better than a cloudy brew that muddies the finish."
        },
        {
          label: "Large-format ice",
          bestFor: "Controlled dilution after service",
          why: "A bitter stirred drink needs a predictable melt curve if you want the last third of the glass to stay coherent."
        },
        {
          label: "Measured tasting notebook",
          bestFor: "Dialing coffee additions without guesswork",
          why: "Small coffee changes matter more here than they do in sweeter drinks, so written comparisons pay off quickly."
        }
      ]
    }
  },
  {
    slug: "smoked-cherry-sour",
    category: "cocktails",
    status: "published",
    title: "Smoked Cherry Sour: How to Add Smoke Without Smothering the Drink",
    description: "A stronger guide to smoked cherry sours that explains smoke restraint, cherry balance, dilution, and the safety-minded choices that keep the drink convincing.",
    eyebrow: "Technique-driven sour",
    publishedAt: "2026-02-20",
    updatedAt: "2026-03-05",
    readTime: "9 min read",
    heroKicker: "Keep the aroma dramatic and the body fresh.",
    authorSlug: "julian-vale",
    tags: [
      "sour",
      "smoke",
      "cherry",
      "home bar techniques"
    ],
    featured: false,
    searchIntent: "informational",
    spiritBases: [
      "rye-whiskey"
    ],
    flavorProfiles: [
      "bittersweet"
    ],
    occasions: [
      "holiday party",
      "nightcap"
    ],
    seasons: [
      "autumn",
      "winter"
    ],
    ingredients: [
      "rye-whiskey",
      "citrus"
    ],
    verificationNotes: [
      "Human-check smoke source safety and ventilation guidance."
    ],
    intro: [
      "Smoke can create instant drama, but it overwhelms sours easily. The better move is to keep the body fresh and let the smoke live mainly in the aroma.",
      "Cherry helps because it can bridge dark fruit and wood notes, but it can also turn the whole drink sticky if you use it as camouflage instead of structure. A good smoked cherry sour should still feel like a sour first, not a smoke effect with acid attached."
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why smoke belongs mostly in the aroma",
        paragraphs: [
          "Smoke reads big even in tiny amounts, especially once it reaches the nose before the sip. That is useful because it gives drama without forcing the liquid itself to carry all the heaviness.",
          "When the drink itself becomes too smoky, the cherry loses its job as a bridge note and starts tasting like cover for harshness."
        ]
      },
      {
        type: "checklist",
        title: "How to keep smoke in proportion",
        items: [
          "Smoke the glass or garnish lightly instead of saturating the liquid.",
          "Keep acidity crisp so the drink still feels alive.",
          "Use cherry as a bridge note, not as syrupy camouflage.",
          "Retaste after a short rest because smoke perception often grows as the drink opens up."
        ]
      },
      {
        type: "steps",
        title: "How to stop the drink turning heavy",
        items: [
          "Watch cherry sweetness carefully because dark fruit and smoke can make the drink feel richer than the sugar level suggests.",
          "Use a spirit with enough backbone that the smoke does not become the only defining idea in the glass.",
          "Shake long enough for proper chill and dilution so the sour stays energetic instead of dense."
        ]
      },
      {
        type: "steps",
        title: "Safety and service notes that matter",
        items: [
          "Use food-safe smoking methods and treat ventilation guidance as a real editorial requirement, not a throwaway note.",
          "Do not imply that every improvised smoke source is interchangeable. Some methods need human safety review before publication.",
          "If serving for guests, test the smoke level in advance because aroma intensity can stack quickly across multiple rounds."
        ]
      }
    ],
    faq: [
      {
        question: "Can I make this without a smoking gun?",
        answer: "Yes, but any alternative should be tested carefully so the aroma stays clean and food-safe."
      },
      {
        question: "What kind of cherry note works best here?",
        answer: "A drier, more focused cherry note usually works better than a jammy one. The fruit should connect the smoke and the sour, not make the drink taste like syrup."
      },
      {
        question: "Why did my smoked sour taste flat instead of vivid?",
        answer: "Usually because the smoke took over and the acid line got buried. When the aroma is too dominant, the drink can feel broad even if the recipe looked balanced on paper."
      }
    ],
    comparison: {
      title: "Best For Smoke-Led Sour Workflow",
      intro: "The goal is control, not gadget theater.",
      items: [
        {
          label: "Simple controlled smoke setup",
          bestFor: "Repeatable aroma without overdoing the liquid",
          why: "Consistent smoke intensity is more useful than the most dramatic possible presentation."
        },
        {
          label: "Dense shaking ice",
          bestFor: "Keeping the sour bright and properly diluted",
          why: "A smoke-led drink still needs real chill and energy in the body or it will feel flat and sticky."
        },
        {
          label: "Measured fruit modifier",
          bestFor: "Holding cherry in a supporting role",
          why: "Cherry is easiest to overbuild when you chase drama instead of balance."
        }
      ]
    }
  }
];
