/**
 * Audible 30-day free trial link.
 *
 * Audible sign-ups pay a flat "bounty" through Amazon Associates (typically
 * far more than a single book commission), so this is the primary money link
 * for the Books section.
 *
 * This is the exact Audible free-trial bounty link from the Amazon Associates
 * dashboard (Product Linking → Bounties / Audible).
 * See: https://affiliate-program.amazon.com/help/node/topic/GRXPHT8U84RAYDXZ
 */
export const AUDIBLE_FREE_TRIAL = "https://amzn.to/4vbcNBz";

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  narrator?: string;
  audiobookLength?: string;
  year: number;
  /** Drives the colored category pill on the cards */
  category: "dogs" | "cats" | "both";
  rating: number;
  goodreads?: string;
  cover: string;
  coverAlt: string;
  /** Exact affiliate (amzn.to) link supplied by the publisher of the site */
  amazonHref: string;
  /** One-line hook used on the homepage card */
  hook: string;
  /** Short paragraph used on the homepage card */
  blurb: string;
  /** Full-review paragraphs used on the /books page */
  review: string[];
  /** "What you'll learn" bullets */
  learn: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  verdict: string;
}

export const books: Book[] = [
  {
    slug: "decoding-your-dog",
    title: "Decoding Your Dog",
    subtitle:
      "The Ultimate Experts Explain Common Dog Behaviors and Reveal How to Prevent or Change Unwanted Ones",
    author: "American College of Veterinary Behaviorists",
    narrator: "Fred Stella",
    audiobookLength: "12 hrs 4 min",
    year: 2014,
    category: "dogs",
    rating: 4.7,
    cover: "https://m.media-amazon.com/images/I/81dpBkZB2-L._SX522_.jpg",
    coverAlt: "Decoding Your Dog book cover",
    amazonHref: "https://amzn.to/4nWD30k",
    hook: "The behavior book vets actually recommend.",
    blurb:
      "Written by the board-certified veterinary behaviorists who literally wrote the diagnostic manual on dog behavior. The clearest, most science-backed explanation of why your dog does what it does — and how to fix the things that drive you crazy.",
    review: [
      "If you only read one dog-behavior book in your life, make it this one. Decoding Your Dog isn't another celebrity-trainer paperback built around one person's personal method — it's a collaboration by the American College of Veterinary Behaviorists, the small group of vets who are board-certified specifically in animal behavior. These are the people other vets call when a case is too complicated.",
      "What makes it special is that it untangles the difference between training tricks and actually understanding your dog. Instead of \"do this when your dog jumps,\" it explains why the jumping happens, what your dog is communicating, and which approaches make the behavior worse versus better. Once you understand the why, the how becomes obvious.",
      "It also does the public a real service by dismantling the dominance/\"alpha dog\" myth that still floats around training culture. The book lays out, with current science, why punishment-based methods backfire and why reward-based training is both kinder and more effective. Chapters cover puppy socialization, house-training, separation anxiety, fear, aggression, and the behavior changes that come with aging.",
      "On audio it works beautifully as a reference you can revisit — and because it's available on Audible, you can listen to the entire thing free during a 30-day trial before deciding whether you want the hardcover for your shelf.",
    ],
    learn: [
      "Why the \"alpha/dominance\" model is outdated — and what replaced it",
      "How to socialize a puppy during the critical window",
      "Practical, vet-approved fixes for house-training and chewing",
      "How to read fear, anxiety, and stress signals before they escalate",
      "When a behavior problem is actually a medical problem",
    ],
    pros: [
      "Authored by board-certified veterinary behaviorists — the highest authority there is",
      "Science-based and myth-busting, not anecdote-driven",
      "Covers the full lifespan, puppy to senior",
      "Reads clearly for normal owners, not just professionals",
    ],
    cons: [
      "Reference-style depth means it's denser than a quick-tips guide",
      "Less about teaching tricks, more about understanding behavior",
    ],
    bestFor:
      "New and struggling dog owners, anyone dealing with anxiety, fear, or aggression, and people who want science instead of TV-trainer mythology.",
    verdict:
      "The single most credible dog-behavior book on the market. If your dog does something that confuses or frustrates you, the answer is almost certainly in here.",
  },
  {
    slug: "decoding-your-cat",
    title: "Decoding Your Cat",
    subtitle:
      "The Ultimate Experts Explain Common Cat Behaviors and Reveal How to Prevent or Change Unwanted Ones",
    author: "American College of Veterinary Behaviorists",
    narrator: "Tom Parks",
    audiobookLength: "10 hrs 49 min",
    year: 2020,
    category: "cats",
    rating: 4.7,
    cover: "https://m.media-amazon.com/images/I/81mBZgseHjL._SX522_.jpg",
    coverAlt: "Decoding Your Cat book cover",
    amazonHref: "https://amzn.to/43CNHji",
    hook: "Finally, a cat book written by the actual experts.",
    blurb:
      "The feline companion to Decoding Your Dog, from the same board-certified veterinary behaviorists. If your cat ambushes your ankles, ignores the litter box, or yowls at 3 a.m., this explains exactly what's going on — and what to do about it.",
    review: [
      "Cats are blamed for being \"mysterious,\" but most of that mystery is just a communication gap. Decoding Your Cat closes it. Like its canine predecessor, it's written by the American College of Veterinary Behaviorists, so every chapter is grounded in actual feline science rather than folklore about aloof, scheming cats.",
      "The book is organized around the problems that send cats to shelters: litter-box avoidance, scratching furniture, aggression between cats, fear of visitors, over-grooming, and the dreaded middle-of-the-night zoomies. For each, it explains the underlying drive — territory, anxiety, play, predation, medical pain — and gives a realistic plan to redirect it.",
      "What I appreciated most is how seriously it takes environmental enrichment. So many \"bad cat\" behaviors are really a bored, under-stimulated cat in a home that doesn't meet its needs. The chapters on building vertical space, play routines, and reducing stress between multiple cats are worth the price on their own.",
      "It's an ideal audiobook because it's a book you'll want on repeat as situations come up. Grab the Audible free trial, listen to the whole thing at no cost in the first 30 days, and keep it in your library for the next time your cat does something baffling.",
    ],
    learn: [
      "The real reasons behind litter-box rejection (it's rarely spite)",
      "How to stop destructive scratching without declawing",
      "Managing tension and aggression in multi-cat homes",
      "Why enrichment and vertical space prevent most behavior problems",
      "How to tell a behavior issue from a hidden medical one",
    ],
    pros: [
      "Same trusted veterinary-behaviorist authorship as Decoding Your Dog",
      "Targets the exact problems that strain cat-owner relationships",
      "Strong, practical focus on enrichment and environment",
      "Compassionate, judgment-free tone",
    ],
    cons: [
      "A few chapters overlap conceptually if you've read the dog edition",
      "Solutions take patience — no magic overnight fixes",
    ],
    bestFor:
      "Anyone with a cat that has litter-box, scratching, anxiety, or multi-cat conflict issues — and new cat owners who want to start off right.",
    verdict:
      "The definitive, science-backed guide to cat behavior. It turns the \"mysterious\" cat into one you can finally understand.",
  },
  {
    slug: "all-dogs-go-to-kevin",
    title: "All Dogs Go to Kevin",
    subtitle:
      "Everything Three Dogs Taught Me (That I Didn't Learn in Veterinary School)",
    author: "Dr. Jessica Vogelsang",
    narrator: "Cassandra Campbell",
    audiobookLength: "7 hrs 8 min",
    year: 2015,
    category: "dogs",
    rating: 4.7,
    cover: "https://m.media-amazon.com/images/I/81P4a5UCxpL._SX522_.jpg",
    coverAlt: "All Dogs Go to Kevin book cover",
    amazonHref: "https://amzn.to/4dMbVfH",
    hook: "The one that makes you laugh, then cry.",
    blurb:
      "A warm, funny, deeply human memoir by veterinarian Dr. Jessica Vogelsang about the three dogs who shaped her life and career. Less how-to, more heart — the perfect listen for anyone who has ever loved a dog.",
    review: [
      "After two behavior manuals, this one is pure heart. All Dogs Go to Kevin is veterinarian Dr. Jessica Vogelsang's memoir, told through the three dogs that carried her from anxious kid to wife, mother, and doctor. It's the book you reach for not to fix a problem, but to feel understood.",
      "Vogelsang is genuinely funny — the kind of writer who can make you laugh out loud one page and ambush you with tears the next. She's honest about the parts of veterinary life nobody talks about: compassion fatigue, the weight of euthanasia decisions, and the strange grace of helping families say goodbye well.",
      "If you've ever wondered what your vet is actually thinking on the other side of the exam table, this is a rare, warm look inside. It's also a quiet meditation on how dogs teach us resilience, presence, and how to let go.",
      "It's a short, beautifully narrated listen — about seven hours — which makes it the perfect first download for an Audible free trial. Start the trial, listen to the whole memoir for free, and you'll understand why it's the one we recommend as a gift.",
    ],
    learn: [
      "What veterinary medicine really feels like from the inside",
      "An honest, comforting perspective on pet loss and grief",
      "Why the bond with our dogs changes who we are",
      "How to find humor and grace in hard moments",
    ],
    pros: [
      "Genuinely funny and deeply moving in equal measure",
      "Written by a practicing vet, so it rings true",
      "Short and superbly narrated — ideal on audio",
      "A perfect gift for any dog lover",
    ],
    cons: [
      "It's a memoir, not a training or how-to guide",
      "The honest passages about pet loss can be emotional",
    ],
    bestFor:
      "Anyone who loves dogs and wants a heartfelt, often hilarious read — and the perfect gift for a grieving or devoted pet owner.",
    verdict:
      "Not a manual, but a balm. The most emotionally rewarding listen on this list, and the one you'll recommend to friends.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
