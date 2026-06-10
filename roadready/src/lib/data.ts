// ── Types ──────────────────────────────────────────────
export interface Course {
  slug: string;
  title: string;
  category: "HGV" | "CPC" | "ADR";
  description: string;
  duration: string;
  price: number;
  includes: string[];
  modules: string[];
  careers?: string[];
}

export interface Testimonial {
  name: string;
  course: string;
  beforeSalary: number;
  afterSalary: number;
  quote: string;
  rating: number;
}

// ── Courses ────────────────────────────────────────────
// NOTE: `price` is INTERNAL data — rendered NOWHERE on the public site. It is an
// internal Lead-value proxy sent to Meta for ad optimisation only: NOT a displayed
// price and NOT a customer quote (real quotes vary by location/deal and are given on
// enquiry). Do not surface it on any customer-facing page without re-verifying against
// actual quoted prices.
export const courses: Course[] = [
  {
    slug: "hgv-cat-c",
    title: "HGV Category C",
    category: "HGV",
    description:
      "Get your rigid truck licence and open up a wide range of driving work across the UK — a practical first step for career changers.",
    duration: "5 days practical + theory",
    price: 2300,
    includes: [
      "Theory test preparation",
      "5 days practical training",
      "Medical referral",
      "DVSA test fee included",
    ],
    modules: [
      "Vehicle safety checks",
      "Manoeuvring exercises",
      "Road driving techniques",
      "Motorway and dual carriageway",
      "Test preparation",
    ],
    careers: ["Local Delivery", "Tipper Operations", "Removals"],
  },
  {
    slug: "hgv-cat-ce",
    title: "HGV Category C+E",
    category: "HGV",
    description:
      "Upgrade to articulated trucks and move into some of the most in-demand driving work.",
    duration: "5 days practical + theory",
    price: 3000,
    includes: [
      "Theory test preparation",
      "5 days practical training",
      "Medical referral",
      "DVSA test fee included",
      "Trailer coupling training",
    ],
    modules: [
      "Trailer coupling & uncoupling",
      "Reversing exercises",
      "Road driving with trailer",
      "Manoeuvring with articulated vehicle",
      "Test preparation",
    ],
    careers: ["Trunking", "Supermarket Logistics", "International Haulage"],
  },
  {
    slug: "adr-dangerous-goods",
    title: "ADR — Dangerous Goods",
    category: "ADR",
    description:
      "Dangerous goods by road is a burgeoning field: tanker, fuel, chemical, and specialist logistics all need ADR-qualified drivers, and demand is climbing. Training is available now — enquire for class options and dates that suit you.",
    duration: "Flexible dates — enquire",
    price: 650,
    includes: [
      "ADR core modules (class-dependent)",
      "Security awareness where required",
      "Course materials & certification guidance",
      "Support booking your SQA / accredited exam",
      "Advice on which classes suit your goals",
    ],
    modules: [
      "ADR fundamentals & legal framework",
      "Classification, packaging & labelling",
      "Vehicle equipment & operational rules",
      "Tunnel codes & transport documents",
      "Exam preparation",
    ],
    careers: [
      "Specialist work, higher rates",
      "Fuel & energy transport",
      "Chemical logistics",
      "Tanker operations",
    ],
  },
  {
    slug: "cpc-periodic-training",
    title: "Driver CPC Periodic Training",
    category: "CPC",
    description:
      "Stay legal and keep driving. Complete your 35 hours of CPC training over 5 years. We make it flexible and affordable.",
    duration: "1 day (7 hours) per module",
    price: 75,
    includes: [
      "7 hours of training per module",
      "JAUPT-approved content",
      "Certificate uploaded to DVSA",
      "Refreshments included",
    ],
    modules: [
      "Drivers' hours & tachographs",
      "Health & safety for drivers",
      "Fuel-efficient driving",
      "Security & counter-terrorism",
      "Customer service & professionalism",
    ],
    careers: ["Valid CPC Maintenance", "Legal Compliance"],
  },
  {
    slug: "hgv-cat-c-ce-combo",
    title: "HGV Cat C + C+E Combo",
    category: "HGV",
    description:
      "The complete package — go from car licence to full articulated in one booking, designed for people who want to get qualified at every level in one go.",
    duration: "10 days practical + theory",
    price: 5000,
    includes: [
      "Full Cat C + C+E training",
      "Both theory test preparations",
      "Medical referral",
      "Both DVSA test fees",
      "Priority booking",
    ],
    modules: [
      "All Cat C modules",
      "All Cat C+E modules",
      "Extended road driving",
      "Combined test preparation",
    ],
    careers: ["Any HGV Role", "Heavy Haulage", "Long-distance & trunking"],
  },
];

// ── Lead-value proxy ───────────────────────────────────
// Maps a course slug to its internal `price` proxy (above) for the Meta Lead/Purchase
// `value`. Returns undefined for unknown / general enquiries ("", "other") so callers
// OMIT value rather than fabricate one. The client Pixel and server CAPI both call this
// same helper, so both events carry an identical value and dedupe cleanly by event_id.
export const LEAD_VALUE_CURRENCY = "GBP";
export function courseLeadValue(slug?: string): number | undefined {
  if (!slug) return undefined;
  return courses.find((c) => c.slug === slug)?.price;
}

// ── Testimonials ───────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Dave M.",
    course: "HGV Cat C+E",
    beforeSalary: 24000,
    afterSalary: 42000,
    quote:
      "Best money I ever spent. Passed first time, had a job within 2 weeks. My only regret is not doing it sooner.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    course: "HGV Cat C",
    beforeSalary: 22000,
    afterSalary: 36000,
    quote:
      "I was nervous about the cost, but it paid for itself in less than two months. The instructors were brilliant.",
    rating: 5,
  },
  {
    name: "James T.",
    course: "Forklift Counterbalance",
    beforeSalary: 20000,
    afterSalary: 28000,
    quote:
      "Got my forklift licence on Tuesday, started a new warehouse job on Monday. Changed my life.",
    rating: 5,
  },
  {
    name: "Priya R.",
    course: "HGV Cat C+E",
    beforeSalary: 26000,
    afterSalary: 44000,
    quote:
      "The whole process was smooth from start to finish. No hidden costs, no pressure — just great training and honest support.",
    rating: 5,
  },
  {
    name: "Marcus L.",
    course: "CPC Periodic Training",
    beforeSalary: 38000,
    afterSalary: 38000,
    quote:
      "Most CPC days are a waste of time. This was genuinely useful — engaging content and a comfortable venue.",
    rating: 4,
  },
];

// ── How It Works Steps (icon key for SVG render) ─────────
export const howItWorksSteps = [
  { step: 1, title: "Enquire", description: "Tell us which licence you need. We'll aim to call you back within 2 hours.", iconKey: "phone" as const },
  { step: 2, title: "Medical", description: "Book your D4 medical — we'll tell you exactly where and how.", iconKey: "medical" as const },
  { step: 3, title: "Train", description: "Complete your theory and practical training with expert instructors.", iconKey: "train" as const },
  { step: 4, title: "Drive", description: "Pass your test, get your licence, and start your new career.", iconKey: "drive" as const },
];

// ── Extra Step Board (full journey: standard + where we go further) ─────────
export const extraStepBoardSteps = [
  { step: 1, title: "Enquire", description: "Tell us which licence you need. We'll aim to call you back within 2 hours.", shortDescription: "We'll aim to call you back within 2 hours.", iconKey: "phone" as const, isExtra: false },
  { step: 2, title: "Medical", description: "Book your D4 medical — we'll tell you exactly where and how.", shortDescription: "We guide you through the D4.", iconKey: "medical" as const, isExtra: false },
  { step: 3, title: "Train", description: "Complete your theory and practical training with expert instructors.", shortDescription: "Expert instructors, every time.", iconKey: "train" as const, isExtra: false },
  { step: 4, title: "Drive", description: "Pass your test, get your licence, and start your new career.", shortDescription: "Pass your test, get your licence.", iconKey: "drive" as const, isExtra: false },
  { step: 5, title: "Recruitment", description: "Your licence is the start, not the finish line. We stay involved with practical support to help you move into work.", shortDescription: "We stay involved after you pass.", iconKey: "recruitment" as const, isExtra: false },
  { step: 6, title: "Industry Contacts", description: "We've built relationships with major haulage firms, agencies, and logistics companies. We don't just train you — we introduce you.", shortDescription: "We introduce you to employers.", iconKey: "contacts" as const, isExtra: true },
  { step: 7, title: "Interview Preparation", description: "Know what employers look for. We'll coach you on industry-specific questions, what to wear, what to bring, and how to stand out.", shortDescription: "Industry-specific interview coaching.", iconKey: "interview" as const, isExtra: true },
  { step: 8, title: "Ongoing Support", description: "Your relationship with us doesn't end when you pass. Need advice 6 months in? We're still here. That's what 'every step of the way' actually means.", shortDescription: "We're still here after you pass.", iconKey: "support" as const, isExtra: true },
];

// ── Success Stories (enhanced testimonials) ───────────
export interface SuccessStory {
  name: string;
  course: string;
  beforeRole: string;
  afterRole: string;
  beforeSalary: number;
  afterSalary: number;
  graduateDate: string;
  whereNow: string;
  quote: string;
  rating: number;
  image: string;
  imageLarge: string;
  storyQA: { question: string; answer: string }[];
  featured?: boolean;
}

export const successStories: SuccessStory[] = [
  {
    name: "Dave M.",
    course: "HGV Cat C+E",
    beforeRole: "Warehouse operative",
    afterRole: "Class 1 HGV Driver",
    beforeSalary: 24000,
    afterSalary: 42000,
    graduateDate: "March 2025",
    whereNow: "Now driving for a major logistics firm with full benefits and pension. Recently bought his first house.",
    quote: "Best money I ever spent. Passed first time, had a job within 2 weeks. I went from stacking shelves to earning nearly double. My only regret is not doing it sooner.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    imageLarge: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    storyQA: [
      { question: "What made you take the leap?", answer: "I'd been in a warehouse for 7 years and every year the pay barely moved. A mate got his HGV and within a month he was on nearly double. I thought \u2014 if he can do it, I can. Best decision I ever made." },
      { question: "What was the training like?", answer: "Honestly, I was nervous on day one. But the instructors were dead patient. They explained everything in plain English, no jargon. By day three I was reversing an artic and couldn't believe it." },
      { question: "What would you say to someone thinking about it?", answer: "Stop thinking and just do it. Seriously. I wasted years telling myself I'd do it 'next year'. The training's great, the support's there, and the jobs are literally waiting for you. You won't regret it." },
    ],
    featured: true,
  },
  {
    name: "Sarah K.",
    course: "HGV Cat C",
    beforeRole: "Retail assistant",
    afterRole: "Rigid HGV Driver",
    beforeSalary: 22000,
    afterSalary: 36000,
    graduateDate: "June 2025",
    whereNow: "Driving for a supermarket chain on local routes. Better hours, better pay, and home every night.",
    quote: "I was nervous about the cost, but it paid for itself in less than two months. The instructors were brilliant \u2014 they never made me feel stupid for asking questions.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    imageLarge: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    storyQA: [
      { question: "Were you worried about being a woman in the industry?", answer: "A bit, yeah. But RoadReady made me feel completely comfortable from day one. The instructor was brilliant and there was actually another woman on my course too. Once you're behind the wheel, nobody cares \u2014 they just need good drivers." },
      { question: "How did you find a job so quickly?", answer: "RoadReady actually helped with that. They gave me CV tips and told me which companies were actively hiring. I applied to three places the week I passed and had two offers by the following Monday." },
      { question: "Any advice for women considering HGV?", answer: "Go for it. Honestly, the industry is crying out for drivers and they don't care if you're male or female. The pay is the same, the respect is the same. I wish I'd done it years ago instead of working retail for minimum wage." },
    ],
  },
  {
    name: "James T.",
    course: "Forklift Counterbalance",
    beforeRole: "Unemployed",
    afterRole: "Forklift Operator",
    beforeSalary: 0,
    afterSalary: 28000,
    graduateDate: "January 2025",
    whereNow: "Working at a distribution centre with overtime available. Planning to do his HGV next year.",
    quote: "Got my forklift licence on Tuesday, started a new warehouse job on Monday. It completely changed my life. I went from benefits to earning properly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    imageLarge: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    storyQA: [
      { question: "What was your situation before training?", answer: "I'd been unemployed for about 8 months. No qualifications, no real experience. I felt stuck. A friend told me about the forklift course and said it was only 3 days. I thought there's no way that could actually work \u2014 but it did." },
      { question: "How quickly did things change?", answer: "Literally within a week. I passed on Tuesday, updated my CV, applied to a few places on Wednesday, and had an interview Thursday. Started the following Monday. It was surreal how fast it happened." },
      { question: "What's next for you?", answer: "I'm saving up beyond my forklift to do my HGV Cat C. The forklift got my foot in the door, but I can see drivers earning way more. RoadReady said they'd sort me out with a discount since I'm coming back. I can't wait." },
    ],
  },
  {
    name: "Priya R.",
    course: "HGV Cat C+E",
    beforeRole: "Call centre worker",
    afterRole: "Agency HGV Driver",
    beforeSalary: 26000,
    afterSalary: 44000,
    graduateDate: "September 2025",
    whereNow: "Working agency shifts with flexibility to choose her own hours. Earning more in 4 days than she used to in 5.",
    quote: "The whole process was smooth from start to finish. RoadReady helped me with my CV and actually introduced me to agencies. No other school does that.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    imageLarge: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    storyQA: [
      { question: "Why did you choose agency work?", answer: "Freedom. After years in a call centre being told when I can eat lunch and when I can go home, I wanted to be in control. Agency driving lets me pick my shifts. Some weeks I do 4 days, some weeks 5. It's completely up to me." },
      { question: "Was the training what you expected?", answer: "Better, honestly. I expected to just be thrown in a truck and told to figure it out. But it was really structured \u2014 theory, practicals, one-on-one time. They even helped me prep for the medical. Nothing was left to chance." },
      { question: "What would you tell someone stuck in a job they hate?", answer: "Life is too short to dread Monday mornings. I used to cry on Sunday nights because I hated my job so much. Now I actually look forward to work. If you're thinking about it, stop overthinking and just enquire. That one step changes everything." },
    ],
  },
];
