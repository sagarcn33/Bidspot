/**
 * Site content. Copy is concise and capability-first per the brand
 * tone. Placeholder figures are flagged for Sagar to finalize.
 */

export const siteMeta = {
  name: "Bid Spot",
  tagline: "Programmatic buying with precision at scale",
  description:
    "Bid Spot is a demand-side platform for buyers, agencies, and enterprise teams — real-time bidding across 40+ SSPs with transparent, actionable reporting.",
  url: "https://bidspot.example", // TODO(Sagar): set production domain
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Product", href: "#platform" },
  { label: "Solutions", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#case-studies" },
];

/** Supply/demand partners for the trust marquee. */
export type Partner = { name: string };
export const partners: Partner[] = [
  { name: "OpenX" },
  { name: "PubMatic" },
  { name: "Magnite" },
  { name: "Index Exchange" },
  { name: "Xandr" },
  { name: "Google Ad Manager" },
  { name: "Sharethrough" },
  { name: "TripleLift" },
];

export type Capability = {
  title: string;
  copy: string;
  /** Icon key resolved in the CapabilityCard component. */
  icon: "bid" | "target" | "channels" | "report";
};

export const capabilities: Capability[] = [
  {
    title: "Real-time bidding",
    copy: "Evaluate and bid on every impression in under 100ms across 40+ SSPs, with pacing and budget controls you set.",
    icon: "bid",
  },
  {
    title: "Audience targeting",
    copy: "Build first-party and contextual segments, activate deal IDs, and suppress waste with granular frequency caps.",
    icon: "target",
  },
  {
    title: "Cross-channel reach",
    copy: "Run display, video, native, CTV, and audio from one seat — unified pacing and creative across every format.",
    icon: "channels",
  },
  {
    title: "Transparent reporting",
    copy: "See win rate, media cost, and fees down to the impression. Export raw logs or stream to your warehouse.",
    icon: "report",
  },
];

/** Live-metrics strip. `value` is the count-up target; `format` shapes it. */
export type Metric = {
  label: string;
  value: number | null; // null renders the empty state
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export const metrics: Metric[] = [
  { label: "Impressions evaluated / sec", value: 4200000, suffix: "" },
  { label: "Geographies supported", value: 210, suffix: "" },
  { label: "Avg. bid response", value: 68, suffix: "ms" },
  { label: "SSP integrations", value: 40, suffix: "+" },
];

export type Step = {
  n: string;
  title: string;
  copy: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Onboard your seat",
    copy: "Connect billing, set brand-safety rules, and import audiences. Self-serve activation goes live the same day.",
  },
  {
    n: "02",
    title: "Build the campaign",
    copy: "Define goals, budgets, and flighting. Attach creatives and deals, then launch across every channel from one place.",
  },
  {
    n: "03",
    title: "Optimize continuously",
    copy: "Automated bid shading and pacing adjust in real time. You keep full control with transparent, exportable logs.",
  },
];

export type CaseStudy = {
  client: string;
  sector: string;
  quote: string;
  metricValue: string;
  metricLabel: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Meridian Retail",
    sector: "E-commerce",
    quote:
      "We moved programmatic in-house on Bid Spot and cut media waste without losing reach. The log-level transparency sold our finance team.",
    metricValue: "-34%",
    metricLabel: "CPA vs. prior DSP",
  },
  {
    client: "Northwind Agency",
    sector: "Agency",
    quote:
      "Managing 20 client seats used to mean 20 dashboards. One workspace, unified pacing, and reporting our clients actually trust.",
    metricValue: "2.1x",
    metricLabel: "Return on ad spend",
  },
  {
    client: "Volta Mobility",
    sector: "CTV / Video",
    quote:
      "CTV and display planned together, bid together, reported together. We finally see incremental reach instead of duplicated frequency.",
    metricValue: "+58%",
    metricLabel: "Incremental reach",
  },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

// TODO(Sagar): confirm exact prices, minimums, and fee percentages.
export const plans: Plan[] = [
  {
    name: "Self-serve",
    price: "Prepay",
    cadence: "activation",
    summary:
      "Fund your seat and go live the same day. Ideal for teams running programmatic in-house.",
    features: [
      "Full platform access",
      "40+ SSP integrations",
      "Log-level reporting & exports",
      "Email & chat support",
    ],
    cta: { label: "Start self-serve", href: "#contact" },
  },
  {
    name: "Managed service",
    price: "Custom",
    cadence: "engagement",
    summary:
      "Our traders plan, launch, and optimize alongside your team. For advertisers who want hands-on partnership.",
    features: [
      "Everything in Self-serve",
      "Dedicated trading team",
      "Custom audience & deal strategy",
      "Quarterly business reviews",
    ],
    cta: { label: "Book a demo", href: "#contact" },
    featured: true,
  },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Real-time bidding", href: "#platform" },
      { label: "Audience targeting", href: "#platform" },
      { label: "Cross-channel reach", href: "#platform" },
      { label: "Reporting", href: "#platform" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Case studies", href: "#case-studies" },
      { label: "Pricing", href: "#pricing" },
      { label: "Book a demo", href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookie policy", href: "#" },
    ],
  },
];
