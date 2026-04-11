// ── Agent data ────────────────────────────────────────────
export type AgentStatus = "online" | "working" | "busy" | "resting";

export interface Agent {
  id: string;
  name: string;
  roleKey: string;       // key into a separate role map if needed
  role: string;          // fallback English
  statusKey: "agents.online" | "agents.working" | "agents.busy" | "agents.resting";
  statusColor: string;   // tailwind bg color
  avatarColor: string;   // base hue for generated SVG avatar
  initials: string;
}

export const AGENTS: Agent[] = [
  {
    id: "alex",
    name: "Alex",
    roleKey: "Senior Developer",
    role: "Senior Developer",
    statusKey: "agents.online",
    statusColor: "bg-green-500",
    avatarColor: "#5843d1",
    initials: "AL",
  },
  {
    id: "maya",
    name: "Maya",
    roleKey: "UI/UX Lead",
    role: "UI/UX Lead",
    statusKey: "agents.working",
    statusColor: "bg-green-500",
    avatarColor: "#ffab69",
    initials: "MA",
  },
  {
    id: "lena",
    name: "Lena",
    roleKey: "Data Architect",
    role: "Data Architect",
    statusKey: "agents.busy",
    statusColor: "bg-orange-400",
    avatarColor: "#74747d",
    initials: "LE",
  },
  {
    id: "hugo",
    name: "Hugo",
    roleKey: "Project Scoper",
    role: "Project Scoper",
    statusKey: "agents.online",
    statusColor: "bg-green-500",
    avatarColor: "#715eeb",
    initials: "HU",
  },
  {
    id: "sam",
    name: "Sam",
    roleKey: "Marketing Pro",
    role: "Marketing Pro",
    statusKey: "agents.online",
    statusColor: "bg-green-500",
    avatarColor: "#5843d1",
    initials: "SA",
  },
  {
    id: "zoey",
    name: "Zoey",
    roleKey: "Content Writer",
    role: "Content Writer",
    statusKey: "agents.online",
    statusColor: "bg-green-500",
    avatarColor: "#ffab69",
    initials: "ZO",
  },
  {
    id: "finn",
    name: "Finn",
    roleKey: "Analyst",
    role: "Analyst",
    statusKey: "agents.resting",
    statusColor: "bg-orange-400",
    avatarColor: "#5b5b64",
    initials: "FI",
  },
  {
    id: "jade",
    name: "Jade",
    roleKey: "Support Guru",
    role: "Support Guru",
    statusKey: "agents.online",
    statusColor: "bg-green-500",
    avatarColor: "#715eeb",
    initials: "JA",
  },
];

// ── Features ──────────────────────────────────────────────
export interface Feature {
  id: string;
  icon: string;     // Material Symbol name
  titleKey: string;
  descKey: string;
}

export const FEATURES: Feature[] = [
  { id: "f1", icon: "hub",        titleKey: "features.f1.title", descKey: "features.f1.desc" },
  { id: "f2", icon: "menu_book",  titleKey: "features.f2.title", descKey: "features.f2.desc" },
  { id: "f3", icon: "construction",titleKey:"features.f3.title", descKey: "features.f3.desc" },
  { id: "f4", icon: "analytics",  titleKey: "features.f4.title", descKey: "features.f4.desc" },
  { id: "f5", icon: "security",   titleKey: "features.f5.title", descKey: "features.f5.desc" },
  { id: "f6", icon: "cloud_sync", titleKey: "features.f6.title", descKey: "features.f6.desc" },
];

// ── Use Cases ─────────────────────────────────────────────
export interface UseCase {
  id: string;
  icon: string;
  accentClass: string;   // tailwind bg color for icon container
  iconColorClass: string;
  titleKey: string;
  descKey: string;
}

export const USE_CASES: UseCase[] = [
  {
    id: "c1",
    icon: "language",
    accentClass: "bg-secondary-container/20",
    iconColorClass: "text-secondary",
    titleKey: "usecases.c1.title",
    descKey: "usecases.c1.desc",
  },
  {
    id: "c2",
    icon: "auto_stories",
    accentClass: "bg-primary/10",
    iconColorClass: "text-primary",
    titleKey: "usecases.c2.title",
    descKey: "usecases.c2.desc",
  },
  {
    id: "c3",
    icon: "flight_takeoff",
    accentClass: "bg-tertiary-fixed-dim",
    iconColorClass: "text-tertiary",
    titleKey: "usecases.c3.title",
    descKey: "usecases.c3.desc",
  },
  {
    id: "c4",
    icon: "campaign",
    accentClass: "bg-error-container/40",
    iconColorClass: "text-error",
    titleKey: "usecases.c4.title",
    descKey: "usecases.c4.desc",
  },
  {
    id: "c5",
    icon: "storefront",
    accentClass: "bg-primary/10",
    iconColorClass: "text-primary",
    titleKey: "usecases.c5.title",
    descKey: "usecases.c5.desc",
  },
  {
    id: "c6",
    icon: "science",
    accentClass: "bg-tertiary-fixed-dim",
    iconColorClass: "text-tertiary",
    titleKey: "usecases.c6.title",
    descKey: "usecases.c6.desc",
  },
];

// ── Pricing ───────────────────────────────────────────────
export interface PricingPlan {
  id: string;
  price: number | "custom";
  popular: boolean;
  nameKey: string;
  descKey: string;
  features: string[];
  ctaKey: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    price: 0,
    popular: false,
    nameKey: "pricing.plan1.name",
    descKey: "pricing.plan1.desc",
    features: ["pricing.plan1.f1", "pricing.plan1.f2", "pricing.plan1.f3"],
    ctaKey: "pricing.plan1.cta",
  },
  {
    id: "pro",
    price: 49,
    popular: true,
    nameKey: "pricing.plan2.name",
    descKey: "pricing.plan2.desc",
    features: ["pricing.plan2.f1", "pricing.plan2.f2", "pricing.plan2.f3", "pricing.plan2.f4"],
    ctaKey: "pricing.plan2.cta",
  },
  {
    id: "team",
    price: 129,
    popular: false,
    nameKey: "pricing.plan3.name",
    descKey: "pricing.plan3.desc",
    features: ["pricing.plan3.f1", "pricing.plan3.f2", "pricing.plan3.f3", "pricing.plan3.f4"],
    ctaKey: "pricing.plan3.cta",
  },
];

// ── Social Proof Logos ────────────────────────────────────
export interface Brand {
  name: string;
  icon: string;
}

export const BRANDS: Brand[] = [
  { name: "FORGE",  icon: "token" },
  { name: "LUMINA", icon: "auto_awesome" },
  { name: "STRATA", icon: "category" },
  { name: "NEXUS",  icon: "grid_view" },
  { name: "PRISM",  icon: "layers" },
  { name: "FLUX",   icon: "bolt" },
  { name: "AXIOM",  icon: "hexagon" },
  { name: "DRIFT",  icon: "waves" },
];
