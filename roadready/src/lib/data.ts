// ── Types ──────────────────────────────────────────────
export interface Course {
  slug: string;
  title: string;
  category: "HGV" | "Forklift" | "CPC";
  description: string;
  duration: string;
  price: number;
  weeklyFrom: number;
  retestPrice: number;
  includes: string[];
  modules: string[];
}

export interface Testimonial {
  name: string;
  course: string;
  beforeSalary: number;
  afterSalary: number;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ── Courses ────────────────────────────────────────────
export const courses: Course[] = [
  {
    slug: "hgv-cat-c",
    title: "HGV Category C",
    category: "HGV",
    description:
      "Get your rigid truck licence and unlock thousands of driving jobs across the UK. Ideal for career changers looking to earn more.",
    duration: "5 days practical + theory",
    price: 1800,
    weeklyFrom: 35,
    retestPrice: 350,
    includes: [
      "Theory test preparation",
      "5 days practical training",
      "Medical referral",
      "DVSA test fee included",
      "Job placement support",
    ],
    modules: [
      "Vehicle safety checks",
      "Manoeuvring exercises",
      "Road driving techniques",
      "Motorway and dual carriageway",
      "Test preparation",
    ],
  },
  {
    slug: "hgv-cat-ce",
    title: "HGV Category C+E",
    category: "HGV",
    description:
      "Upgrade to articulated trucks and access the highest-paying driving roles. Average salaries exceed £42,000.",
    duration: "5 days practical + theory",
    price: 2200,
    weeklyFrom: 42,
    retestPrice: 350,
    includes: [
      "Theory test preparation",
      "5 days practical training",
      "Medical referral",
      "DVSA test fee included",
      "Job placement support",
      "Trailer coupling training",
    ],
    modules: [
      "Trailer coupling & uncoupling",
      "Reversing exercises",
      "Road driving with trailer",
      "Manoeuvring with articulated vehicle",
      "Test preparation",
    ],
  },
  {
    slug: "forklift-counterbalance",
    title: "Forklift — Counterbalance",
    category: "Forklift",
    description:
      "The most in-demand forklift licence. Qualify in just 3 days and open up warehouse, logistics, and construction roles.",
    duration: "3 days",
    price: 650,
    weeklyFrom: 13,
    retestPrice: 150,
    includes: [
      "3 days hands-on training",
      "RTITB accredited certification",
      "Theory & practical assessment",
      "PPE provided during training",
    ],
    modules: [
      "Pre-use inspection",
      "Basic manoeuvring",
      "Stacking at height",
      "Loading & unloading",
      "Practical assessment",
    ],
  },
  {
    slug: "forklift-reach",
    title: "Forklift — Reach Truck",
    category: "Forklift",
    description:
      "Specialise in reach trucks used in narrow-aisle warehousing. Highly sought after by Amazon, DHL, and major distributors.",
    duration: "3 days",
    price: 650,
    weeklyFrom: 13,
    retestPrice: 150,
    includes: [
      "3 days hands-on training",
      "RTITB accredited certification",
      "Theory & practical assessment",
      "PPE provided during training",
    ],
    modules: [
      "Reach truck controls",
      "Narrow-aisle operation",
      "High-level racking",
      "Stock rotation techniques",
      "Practical assessment",
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
    weeklyFrom: 5,
    retestPrice: 0,
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
  },
  {
    slug: "hgv-cat-c-ce-combo",
    title: "HGV Cat C + C+E Combo",
    category: "HGV",
    description:
      "The complete package — go from car licence to fully articulated in one booking. Our most popular course with the best value.",
    duration: "10 days practical + theory",
    price: 3500,
    weeklyFrom: 67,
    retestPrice: 350,
    includes: [
      "Full Cat C + C+E training",
      "Both theory test preparations",
      "Medical referral",
      "Both DVSA test fees",
      "Job placement support",
      "Priority booking",
    ],
    modules: [
      "All Cat C modules",
      "All Cat C+E modules",
      "Extended road driving",
      "Combined test preparation",
    ],
  },
];

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

// ── FAQ ────────────────────────────────────────────────
export const faqItems: FAQItem[] = [
  {
    question: "Is HGV training worth the money?",
    answer:
      "Absolutely. The average HGV driver earns £14,000 more per year than the UK median salary. Most of our students break even on their investment within 8 weeks of passing. Use our ROI calculator on the homepage to see your personalised numbers.",
  },
  {
    question: "What if I fail my test?",
    answer:
      "Our first-time pass rate is 94%, so it's unlikely — but if it happens, our retest fee is just £350, compared to £800+ at most schools. We don't penalise you for needing another go.",
  },
  {
    question: "I can't afford the full amount upfront — do you offer payment plans?",
    answer:
      "Yes. We offer flexible payment plans over 3 or 6 months, starting from as little as £35/week for Cat C. That's less than a daily coffee and lunch. Check out our Spread the Cost calculator on the pricing page.",
  },
  {
    question: "Will I actually get a job after passing?",
    answer:
      "There are currently over 60,000 unfilled HGV driver positions in the UK. We provide job placement support, employer introductions, and CV help. 89% of our graduates find driving work within 4 weeks of passing.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "From first enquiry to driving licence, the typical timeline is 6–10 weeks. This includes your medical, theory test, practical training, and DVSA test. We help you book everything in the right order.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "None whatsoever. Our prices include everything: theory prep, practical training, DVSA test fees, and medical referral. What you see is what you pay.",
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "No. You just need a full UK car driving licence and to pass a medical (D4). We guide you through every step, from booking your medical to walking into the test centre.",
  },
  {
    question: "What's the difference between Cat C and C+E?",
    answer:
      "Cat C covers rigid trucks (up to 32 tonnes). Cat C+E adds articulated vehicles (tractor and trailer). C+E unlocks the highest-paying roles and is our most popular course. We recommend the combo package for the best value.",
  },
];

// ── Stats ──────────────────────────────────────────────
export const stats = [
  { label: "First-Time Pass Rate", value: 94, suffix: "%" },
  { label: "Students Trained", value: 1240, suffix: "+" },
  { label: "Google Rating", value: 4.9, suffix: "★" },
  { label: "Avg. Salary Uplift", value: 14, suffix: "k" },
];

// ── How It Works Steps (icon key for SVG render) ─────────
export const howItWorksSteps = [
  { step: 1, title: "Enquire", description: "Tell us which licence you need. We'll call you back within 2 hours.", iconKey: "phone" as const },
  { step: 2, title: "Medical", description: "Book your D4 medical — we'll tell you exactly where and how.", iconKey: "medical" as const },
  { step: 3, title: "Train", description: "Complete your theory and practical training with expert instructors.", iconKey: "train" as const },
  { step: 4, title: "Drive", description: "Pass your test, get your licence, and start your new career.", iconKey: "drive" as const },
];

// ── Comparison Data (usYes/themYes for check/x icons) ───
export const comparisonRows = [
  { feature: "Retest price", us: "£350", them: "£800+", usYes: false, themYes: false },
  { feature: "Job placement support", us: "Included", them: "Not offered", usYes: true, themYes: false },
  { feature: "Online theory prep", us: "Included", them: "£50 extra", usYes: true, themYes: false },
  { feature: "Hidden fees", us: "None", them: "Medical, theory, etc.", usYes: false, themYes: false },
  { feature: "First-time pass rate", us: "94%", them: "Industry avg 55%", usYes: false, themYes: false },
  { feature: "Payment plans", us: "From £35/week", them: "Full upfront only", usYes: true, themYes: false },
  { feature: "Weekend availability", us: "Yes", them: "Weekdays only", usYes: true, themYes: false },
];
