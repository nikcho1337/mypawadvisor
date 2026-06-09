// The curated content bank — the "voice" of the reading lives here.
//
// VOICE RULES (warm + cheeky, never AI-sounding):
//  - Concrete pet imagery over abstraction ("loses it over a cardboard box", not
//    "enjoys novelty"). Vary sentence length; fragments are fine.
//  - Gentle roast > flattery. Tease the pet a little; the owner is in on the joke.
//  - Cite the real mechanic where natural ("with four planets in Water…") so it reads
//    computed, not generic.
//  - Banned filler: "overall", "truly", "wonderful companion", "in conclusion", "they
//    are a unique soul". If a line could describe any pet, rewrite it.
//
// Every bank is an array of variants; the engine picks one deterministically per chart
// (see rng.ts), so two different pets read differently but the same pet never changes.

import type { Element, Modality, SignatureType } from "./astrology";

export type SignName =
  | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo"
  | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export const SIGN_GLYPHS: Record<SignName, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export const PLANET_GLYPHS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂",
  Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇",
  Ascendant: "Asc", Midheaven: "MC",
};

// Short personality keyword per sign — multiple variants. Used for captions + snapshots.
export const SIGN_VIBES: Record<SignName, string[]> = {
  Aries:       ["the fearless little firecracker", "a four-legged exclamation point", "the one who charges first, thinks never"],
  Taurus:      ["the cozy comfort connoisseur", "a professional napper with strong snack opinions", "the immovable object of the couch"],
  Gemini:      ["the chatty social butterfly", "a busy little mind with too many tabs open", "the one who needs new sniffs by lunch"],
  Cancer:      ["the sensitive cuddle-bug", "a soft heart in a fur coat", "the household's unofficial mood detector"],
  Leo:         ["the dramatic show-stealer", "a born main character", "the one who assumes the spotlight is theirs"],
  Virgo:       ["the tidy little perfectionist", "a tiny supervisor with a clipboard", "the one who notices when one thing moves"],
  Libra:       ["the charming peacemaker", "a shameless people-pleaser", "the prettiest one in the room (their words)"],
  Scorpio:     ["the intense loyal shadow", "a one-person pet with secrets", "the keeper of buried treasures (literally)"],
  Sagittarius: ["the adventure seeker", "a free spirit with a nose for the horizon", "the one already halfway out the door"],
  Capricorn:   ["the dignified old soul", "a tiny CEO of the household", "the one who takes naps very seriously"],
  Aquarius:    ["the quirky original", "a delightful little weirdo", "the one with a habit no other pet has"],
  Pisces:      ["the dreamy gentle heart", "a soft daydreamer", "the one staring at something that isn't there"],
};

// Fuller, warmer blurbs per sign — multiple variants.
export const SIGN_BLURBS: Record<SignName, string[]> = {
  Aries:       [
    "bold, full of zoomies, and first through every door — charges at life (and the mail carrier) with pure, unearned confidence.",
    "all impulse and adrenaline, convinced the word 'wait' is a personal insult and the front door is a starting gun.",
  ],
  Taurus:      [
    "stubborn in the most loveable way, devoted to snacks, sunbeams, and the one perfect spot on the couch that is theirs forever.",
    "slow to start, impossible to rush, and deeply committed to a routine of food, warmth, and being adored on their own terms.",
  ],
  Gemini:      [
    "curious, quick, and endlessly entertaining — a busy little mind that needs new toys, new smells, and an audience.",
    "easily delighted, easily bored, and convinced every rustle in the next room is breaking news they must investigate.",
  ],
  Cancer:      [
    "deeply bonded to their humans — a soft soul who feels every mood in the house and just wants everyone home and safe.",
    "tender and a touch clingy, happiest within arm's reach of their favorite person and the comfort of a familiar blanket.",
  ],
  Leo:         [
    "born for the spotlight, generous with affection, and fully convinced the world revolves around them — and honestly, at home, it does.",
    "warm, theatrical, and a little vain; gives love like a gift and expects a standing ovation for existing.",
  ],
  Virgo:       [
    "particular about routine, food, and tidiness — a thoughtful little helper who notices when even one thing is out of place.",
    "precise and quietly devoted, happiest when the day runs on schedule and faintly betrayed when dinner is four minutes late.",
  ],
  Libra:       [
    "sweet-natured and people-pleasing, happiest when everyone gets along and someone is telling them how pretty they are.",
    "charming, fair-minded, and allergic to tension — will physically insert themselves between two arguing humans to restore the peace.",
  ],
  Scorpio:     [
    "mysterious, fiercely devoted, and all-in on their chosen person — loves hard, keeps their secrets, and buries the good stuff for later.",
    "intense and loyal to the bone; bonds with one human like it's a blood oath and remembers every single thing you've ever done.",
  ],
  Sagittarius: [
    "a free spirit who lives for the trail, the open window, and the next big adventure — bores easily, explores endlessly.",
    "optimistic and a little reckless, with a nose pointed permanently at the horizon and zero interest in being fenced in.",
  ],
  Capricorn:   [
    "patient, well-mannered, and weirdly wise — an ambitious little professional who takes nap-time and treat-earning very seriously.",
    "dignified and self-possessed; acts like the responsible adult of the household and quietly judges everyone who isn't.",
  ],
  Aquarius:    [
    "a march-to-their-own-beat type — friendly but independent, with at least one habit no other pet on earth has ever had.",
    "an affectionate oddball who loves on their own schedule and will surprise you with a brand-new quirk every few weeks.",
  ],
  Pisces:      [
    "soft, intuitive, and a little floaty — a tender daydreamer who soaks up affection and naps like it's a competitive sport.",
    "gentle and impressionable, with big feelings and a faraway stare; absorbs the whole room's mood and then needs a lie-down.",
  ],
};

// What each planet governs, pet-framed.
export const PLANET_THEMES: Record<string, string> = {
  Sun: "core identity and shine",
  Moon: "emotions, comfort, and attachment",
  Mercury: "curiosity, communication, and trainability",
  Venus: "affection, cuddles, and what they love",
  Mars: "energy, drive, and play style",
  Jupiter: "luck, appetite, and big happy moods",
  Saturn: "discipline, boundaries, and the serious side",
  Uranus: "quirks and surprises",
  Neptune: "dreams, sensitivity, and that faraway stare",
  Pluto: "deep instincts and transformation",
};

// House themes (life areas), pet-framed. Index 1..12.
export const HOUSE_THEMES: Record<number, string> = {
  1: "how they present to the world",
  2: "food, toys, and prized possessions",
  3: "everyday chatter and the neighborhood beat",
  4: "home, den, and family",
  5: "play, fun, and pure joy",
  6: "daily routine and habits",
  7: "their favorite humans and companions",
  8: "deep bonds and intense instincts",
  9: "adventure and the great outdoors",
  10: "reputation and their 'job' in the household",
  11: "friends at the park and the wider social circle",
  12: "rest, dreams, and the secret inner world",
};

// Element emphasis — what a dominant (or notably lacking) element does to a temperament.
// Each entry reads naturally after "{name} is ___".
export const ELEMENT_PROFILE: Record<Element, { dominant: string[]; lacking: string[] }> = {
  Fire: {
    dominant: [
      "all spark and motion — first to the door, loudest at dinner, and physically incapable of doing anything at half speed.",
      "a furnace of enthusiasm who treats resting as a theoretical concept they've only ever heard about.",
    ],
    lacking: [
      "rarely one for dramatic zoomies — more likely to watch the chaos than start it.",
      "not much of a spark-thrower, spending what little fire they have only on things that truly deserve it (snacks).",
    ],
  },
  Earth: {
    dominant: [
      "grounded, sensory, and gloriously food-motivated — a creature of habit who trusts a full bowl over any grand idea.",
      "solid and practical to the core: comfort, routine, and snacks over theory, and faintly suspicious of anything new.",
    ],
    lacking: [
      "not big on routine or patience — novelty wins over a steady schedule every time.",
      "happy to skip 'sitting still' entirely; to them it reads as a punishment, not a state of being.",
    ],
  },
  Air: {
    dominant: [
      "all curiosity and chatter — a busy little mind forever investigating a sound only they can hear.",
      "a restless thinker who needs stimulation like a meal; a bored mind here gets creative in ways you won't enjoy.",
    ],
    lacking: [
      "more feeling than thinking, leading with the heart (or the stomach), not the brain.",
      "not one for small talk — they'd rather feel a moment than analyze it.",
    ],
  },
  Water: {
    dominant: [
      "an emotional sponge who feels everything deeply and somehow knows your mood before you do.",
      "soft and intuitive to a fault, with a sixth sense for sadness, thunder, and the suitcase coming out.",
    ],
    lacking: [
      "refreshingly unbothered — less mush, more 'I'm fine, are you done being emotional?'",
      "steady but a little hard to read, with the deep-feelings dial turned firmly low.",
    ],
  },
};

// Modality emphasis — how they operate.
export const MODALITY_PROFILE: Record<Modality, { dominant: string[]; lacking: string[] }> = {
  Cardinal: {
    dominant: [
      "a starter: the one who launches the game, the walk, and the 6 a.m. wake-up you didn't ask for.",
      "pure initiative — has opinions about how the day should go and is not shy about getting it started for you.",
    ],
    lacking: [
      "low on get-up-and-go; they'll happily join a plan but rarely be the one to start it.",
    ],
  },
  Fixed: {
    dominant: [
      "immovable once decided: loyal, routine-bound, and capable of out-stubborning a closed door for an hour.",
      "a creature of deep habit — change the furniture and they will notice, file a complaint, and hold a grudge.",
    ],
    lacking: [
      "not very fixed, so persistence isn't their gift — they start strong and wander off when something shinier appears.",
    ],
  },
  Mutable: {
    dominant: [
      "endlessly adaptable: new house, new schedule, new human? Fine. They'll shrug and make themselves at home.",
      "a go-with-the-flow soul who bends to whatever the day brings — flexible, easy, and a little scatterbrained.",
    ],
    lacking: [
      "short on flexibility, so surprises land hard; they like the plan to be the plan, thank you.",
    ],
  },
};

// Phrased to follow "they're ___".
export const POLARITY_PROFILE: { Yang: string[]; Yin: string[]; balanced: string[] } = {
  Yang: ["outward-facing and expressive, with their energy pointed at the world, the door, and you.", "an extrovert at heart, happiest mid-greeting or mid-zoomie."],
  Yin: ["inward and watchful — a feeler before a doer.", "an introvert who recharges in a quiet corner and observes more than they let on."],
  balanced: ["an even mix of go-getter and homebody, switching modes without warning.", "equally at home outgoing or alone — social when it suits them, content by themselves when it doesn't."],
};

// Aspect interpretations. Bespoke for the sweet/common pairs; generic fallbacks by nature.
export const ASPECT_NOTES: { byPair: Record<string, string[]>; soft: string[]; hard: string[] } = {
  byPair: {
    "moon-venus": ["an unfairly affectionate streak — this is a pet built to cuddle and be adored.", "love and comfort wired together: soft, sweet, and a world-class lap-warmer."],
    "sun-moon": ["a rare inner harmony — who they are and how they feel point the same way, so they're remarkably easy to read.", "head and heart in sync; what you see is genuinely what you get."],
    "sun-mars": ["identity fused with drive — bold, energetic, and not built for sitting still.", "a strong will and a strong engine; confident, physical, and a little pushy about it."],
    "moon-mars": ["big feelings with a quick fuse — passionate, reactive, and quick to both grump and forgive.", "emotions that move fast and loud; the dramatic sigh is an art form here."],
    "venus-mars": ["affection and energy entangled — plays hard, loves hard, no in-between.", "wants attention AND action, ideally at the same time, ideally now."],
    "mercury-moon": ["feels out loud — a chatty, expressive type whose every mood has a sound.", "thoughts and feelings run together, so you'll always know what's going on in there."],
  },
  soft: [
    "an easy, lifelong gift — two parts of their nature that simply get along.",
    "a smooth bit of wiring that makes some things come naturally to them, no effort required.",
  ],
  hard: [
    "a productive tension — two forces that grind against each other and create real spark.",
    "an inner push-pull that keeps them interesting; friction here is where their personality gets loud.",
  ],
};

export const RETROGRADE_NOTES: Record<string, string[]> = {
  Mercury: ["born under Mercury retrograde, so they process the world a beat sideways — selective hearing is a feature, not a bug.", "a Mercury-retrograde mind: marches to their own logic and 'comes when called' on a generous delay."],
  Venus: ["Venus retrograde gives an unconventional way of showing love — affection on their terms, in their own odd dialect.", "loves a little sideways: aloof one minute, velcro the next, and somehow you adore them more for it."],
  Mars: ["Mars retrograde means their drive points inward — slow to act, but quietly determined once they commit.", "an unusual engine: energy that simmers rather than explodes, then surprises you."],
  Jupiter: ["Jupiter retrograde — luck and joy they keep mostly to themselves; a private kind of contentment.", "finds their fortune inwardly: a pet who doesn't need much to feel like they have plenty."],
  Saturn: ["Saturn retrograde softens the strict streak — they make up their own rules and mostly stick to them.", "a self-disciplined oddball who answers to an internal rulebook only they can see."],
  Uranus: ["Uranus retrograde: their weirdness runs deep and quiet rather than loud and showy.", "an inward original — the quirks live under the surface and surface when least expected."],
  Neptune: ["Neptune retrograde gives an even dreamier inner world — that faraway stare goes a long way down.", "a rich, private imagination; half of them is always somewhere you can't follow."],
  Pluto: ["Pluto retrograde — intense instincts turned inward, processed in the quiet of their own depths.", "transformation on the inside: a still-waters-run-deep kind of soul."],
};

export const STELLIUM_NOTES: string[] = [
  "with so much energy piled into one place, that part of life is turned up to maximum and impossible to ignore.",
  "a rare concentration of force in a single corner of the chart — whatever it touches, they do at full volume.",
];

// Snapshot openers — the first line of the reading.
export const OPENERS: string[] = [
  "The sky was doing something specific the day {name} arrived.",
  "When {name} was born, the planets had clearly made some decisions.",
  "{name}'s chart isn't subtle, and neither are they.",
  "The stars filed the paperwork on {name} and got oddly detailed.",
];

// Lucky toy per sign — multiple variants.
export const LUCKY_TOYS: Record<SignName, string[]> = {
  Aries: ["a squeaky ball that fights back", "anything they can chase at full sprint"],
  Taurus: ["the softest blanket in the house", "a snack-dispensing toy, obviously"],
  Gemini: ["a puzzle feeder", "a new toy every week (they'll demand it)"],
  Cancer: ["a worn hoodie that smells like you", "a plush they can mother"],
  Leo: ["anything that sparkles or crinkles loudly", "a toy with an audience attached"],
  Virgo: ["a neat little snuffle mat", "a toy that lives in exactly one spot"],
  Libra: ["a matching pair of plushies", "a pretty toy they can show off"],
  Scorpio: ["a tug rope with history", "one beloved toy they'll guard with their life"],
  Sagittarius: ["a long-range frisbee", "a toy for the trail, not the living room"],
  Capricorn: ["a sturdy chew that lasts", "a toy they have to work to earn"],
  Aquarius: ["a weird gadget toy no one understands", "the box the toy came in"],
  Pisces: ["a slow-floating bubble wand", "a soft thing to dream on"],
};

// The closing "Cosmic Signature" line. {name} and {descriptor} are filled by the engine;
// these are tuned per signature type so the ending lands on whatever is rarest in the chart.
export const SIGNATURE_LINES: Record<SignatureType, string[]> = {
  stellium: [
    "In the end, {name} is a pet with {descriptor} — which is the universe's way of saying some part of their personality was installed with no volume knob.",
    "So remember this about {name}: {descriptor}. Nature does not stack the deck like that by accident.",
  ],
  tightAspect: [
    "But the line that defines {name} is {descriptor}, drawn so tight the two might as well be one — and you'll feel it every single day.",
    "If you remember one thing about {name}, make it {descriptor}: an aspect this exact doesn't show up by chance.",
  ],
  elementDominant: [
    "Strip it all back and {name} is {descriptor} — most pets are a blend; {name} simply refused.",
    "At their core, {name} is {descriptor}, and no amount of training will talk them out of it (you're welcome to try).",
  ],
  modalityDominant: [
    "Above all, {name} is {descriptor} — a rare kind of single-mindedness the stars rarely commit to this hard.",
    "When it counts, {name} is {descriptor}, and that one fact explains roughly 90% of everything they do.",
  ],
  retrograde: [
    "And the unforgettable part: {name} arrived with {descriptor} — proof they were always going to do this their own way.",
    "Here's {name} in a nutshell: {descriptor}. A pet who reads the manual, then writes a better one.",
  ],
  bigThree: [
    "Put it together and {name} is {descriptor} — a combination that has never existed in exactly this shape before, and never will again.",
    "That's {name}: {descriptor}. One specific little soul the sky will not be printing a second copy of.",
  ],
};
