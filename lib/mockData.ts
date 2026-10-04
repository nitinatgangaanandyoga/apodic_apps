// Content for the Apodic Spaces prototype, loaded from JSON so new clubs,
// societies and spaces can be added by dropping in a new data file rather
// than editing code. In the real app this all comes from the API (see the
// "Technical architecture & stack" note in the roadmap doc) — here it's
// static JSON so the UI can be built and demoed before the backend exists.
//
// The two clubs below are real BPTP clubhouses in Faridabad (BPTP Pride
// Club at BPTP Parklands Pride, Sector 77–78, and BPTP Sanctuary Club at
// BPTP Discovery Park, Sector 80). Community facts (acreage, unit counts,
// amenities) are drawn from bptp.com; exact hours, pricing and the event
// calendar are invented for the prototype. Palm Grove Society is an
// invented residential-society pilot, not a real BPTP property.
//
// Each club's full content lives in its own file under data/clubs/*.json
// (one file per club), and each society's under data/societies/*.json —
// see those directories to add or edit one.

import prideData from "@/data/clubs/pride.json";
import sanctuaryData from "@/data/clubs/sanctuary.json";
import palmgroveData from "@/data/societies/palmgrove.json";

export type Amenity = {
  key: string;
  name: string;
  blurb: string;
  gradient: string;
};

export type AmenityHours =
  | { kind: "single"; text: string }
  | {
      kind: "split";
      morning: { range: string; note: string };
      evening: { range: string; note: string };
      closedNote: string;
    };

export type AmenityDetail = {
  key: string;
  title: string;
  gradient: string;
  accentColor: string;
  description: string;
  hours: AmenityHours;
  highlights: string[];
  cta: string;
};

export type ClubEvent = {
  key: string;
  day: string;
  dayLabel: string;
  date: string;
  time: string;
  title: string;
  note: string;
  open: boolean;
};

export type MembershipPlan = {
  key: "individual" | "family" | "corporate";
  name: string;
  price: string;
  period?: string;
  featured?: boolean;
  features: string[];
};

export type Club = {
  slug: string;
  name: string;
  tagline: string;
  accent: "brass" | "green";
  heroGradient: string;
  heroBadge: string;
  description: string;
  // Copy used on the Explore listing card for this club.
  exploreDescription: string;
  exploreOpenBadge: string;
  amenities: Amenity[];
  amenityDetails: Record<string, AmenityDetail>;
  events: ClubEvent[];
  eventGradients: string[];
  membershipPlans: MembershipPlan[];
  interestOptions: { key: string; label: string }[];
  todayHighlight: { badge: string; title: string; note: string };
  spaceCard: { badge: string; initial: string; stat: string };
};

// Each imported JSON file is asserted to the `Club` shape — the JSON
// itself is the source of truth, this just gives callers types.
export const clubs: Record<string, Club> = {
  pride: prideData as Club,
  sanctuary: sanctuaryData as Club,
};

// ---- Societies -------------------------------------------------------
// A society is a private, resident-verified community (as opposed to a
// club, which is a paid-membership clubhouse). Its public profile page is
// a teaser: amenities and a same events feed as residents see, but with
// non-public events' time/location withheld until sign-in.

export type SocietyAmenityDetail = {
  key: string;
  title: string;
  gradient: string;
  accentColor: string;
  description: string;
  hours: AmenityHours;
  highlights: string[];
  footer: string;
  secondaryCta: string;
  primaryCta: string;
};

export type SocietyEvent = {
  key: string;
  dateTime: string;
  title: string;
  detail: string;
  gradient: string;
  openToAll: boolean;
  going: number;
};

export type ClassifiedCategory = "sale" | "services" | "free";

export type ClassifiedListing = {
  key: string;
  category: ClassifiedCategory;
  title: string;
  price: number | null;
  unit: string;
  posted: string;
  description: string;
};

export type Society = {
  slug: string;
  name: string;
  tagline: string;
  accent: "brass" | "green";
  heroGradient: string;
  heroBadge: string;
  homesLabel: string;
  description: string;
  exploreDescription: string;
  exploreOpenBadge: string;
  amenities: Amenity[];
  amenityDetails: Record<string, SocietyAmenityDetail>;
  events: SocietyEvent[];
  classifiedCategories: { key: ClassifiedCategory; label: string }[];
  classifiedGradients: Record<ClassifiedCategory, string>;
  classifieds: ClassifiedListing[];
  spaceCard: { badge: string; initial: string; stat: string };
};

export const societies: Record<string, Society> = {
  palmgrove: palmgroveData as Society,
};

export type SpaceChip = {
  icon: "lightning" | "trophy" | "tennis" | "pool" | "gym" | "badminton" | "house" | "newspaper";
  label: string;
};

export type SpaceStatusBadge = {
  label: string;
  variant: "light" | "dark";
  dot?: boolean;
  icon?: "lock" | "check";
};

export type SpaceCategoryBadge = {
  label: string;
  variant: "light" | "dark";
};

export type SpaceVerification = {
  icon: "shield" | "wellness" | "badge";
  label: string;
};

export type SpaceCta = {
  label: string;
  icon: "chevron" | "arrowUpRight";
};

export type SpaceButton = {
  label: string;
  icon: "key" | "calendar" | "guest" | "pool" | "intercom" | "board";
  variant: "dark" | "cream";
};

export type Space = {
  key: string;
  name: string;
  tagline: string;
  stat: string;
  badge: string;
  initial: string;
  gradient: string;
  image: string;
  href: string | null;
  exploreDescription: string;
  exploreOpenBadge: string;
  category: "clubs" | "societies";
  hasSports?: boolean;
  hasWellness?: boolean;
  hasEvents?: boolean;
  statusBadge: SpaceStatusBadge;
  categoryBadge: SpaceCategoryBadge;
  chips: SpaceChip[];
  verification: SpaceVerification;
  cta: SpaceCta;
  residentBadge: string;
  residentBadgeVariant: "brass" | "green" | "dark";
  enclaveType: string;
  residentLocation: string;
  residentStat: string;
  topRightAction: "qr" | "share" | "notice";
  buttons: [SpaceButton, SpaceButton];
};

export const spaces: Space[] = [
  {
    key: "pride",
    name: clubs.pride.name,
    tagline: clubs.pride.tagline,
    stat: clubs.pride.spaceCard.stat,
    badge: clubs.pride.spaceCard.badge,
    initial: "P",
    gradient: clubs.pride.heroGradient,
    image: "/images/pride-club.jpg",
    href: "/club/pride",
    exploreDescription: "A gated, Lutyens-inspired community with a banquet hall, sports park and wellness lawns...",
    exploreOpenBadge: clubs.pride.exploreOpenBadge,
    category: "clubs",
    hasSports: true,
    hasWellness: true,
    hasEvents: true,
    statusBadge: {
      label: "Open to visit",
      variant: "light",
      dot: true,
    },
    categoryBadge: {
      label: "Sports Park · Banquet",
      variant: "dark",
    },
    chips: [
      { icon: "lightning", label: "Lit till 9 PM" },
      { icon: "trophy", label: "2 Events this week" },
      { icon: "tennis", label: "Tennis Courts" },
    ],
    verification: {
      icon: "shield",
      label: "Concierge Verified",
    },
    cta: {
      label: "View Space Details",
      icon: "chevron",
    },
    residentBadge: "Resident since 2021",
    residentBadgeVariant: "brass",
    enclaveType: "ENCLAVE PRIORITY",
    residentLocation: "BPTP Parklands Pride · Sector 77–78",
    residentStat: "2 events this week · Sports park lit till 9 PM",
    topRightAction: "qr",
    buttons: [
      { label: "Digital Key Card", icon: "key", variant: "dark" },
      { label: "Book Amenity", icon: "calendar", variant: "cream" },
    ],
  },
  {
    key: "sanctuary",
    name: clubs.sanctuary.name,
    tagline: clubs.sanctuary.tagline,
    stat: clubs.sanctuary.spaceCard.stat,
    badge: clubs.sanctuary.spaceCard.badge,
    initial: "S",
    gradient: clubs.sanctuary.heroGradient,
    image: "/images/sanctuary-club.jpg",
    href: "/club/sanctuary",
    exploreDescription: "A high-rise clubhouse featuring an Olympic-grade infinity pool, elevated TechnoGym facilities, and...",
    exploreOpenBadge: clubs.sanctuary.exploreOpenBadge,
    category: "clubs",
    hasSports: true,
    hasWellness: true,
    hasEvents: false,
    statusBadge: {
      label: "Open to visit",
      variant: "light",
      dot: true,
    },
    categoryBadge: {
      label: "High-Rise Clubhouse",
      variant: "dark",
    },
    chips: [
      { icon: "pool", label: "Infinity Pool" },
      { icon: "gym", label: "TechnoGym Suite" },
      { icon: "badminton", label: "Badminton" },
    ],
    verification: {
      icon: "wellness",
      label: "Wellness Access",
    },
    cta: {
      label: "View Space Details",
      icon: "chevron",
    },
    residentBadge: "Resident since 2022",
    residentBadgeVariant: "green",
    enclaveType: "WELLNESS SANCTUARY",
    residentLocation: "BPTP Discovery Park · Sector 80",
    residentStat: "2 events this week · Pool open till 9 PM",
    topRightAction: "share",
    buttons: [
      { label: "Guest Access", icon: "guest", variant: "cream" },
      { label: "Pool Pass", icon: "pool", variant: "dark" },
    ],
  },
  {
    key: "palmgrove",
    name: societies.palmgrove.name,
    tagline: "Residential Community · Quiet Sector Enclave",
    stat: societies.palmgrove.spaceCard.stat,
    badge: societies.palmgrove.spaceCard.badge,
    initial: "G",
    gradient: societies.palmgrove.heroGradient,
    image: "/images/palmgrove-society.jpg",
    href: "/society/palmgrove",
    exploreDescription: "A secluded enclave featuring palm-lined boulevards, quiet botanical gardens, and an...",
    exploreOpenBadge: societies.palmgrove.exploreOpenBadge,
    category: "societies",
    hasSports: false,
    hasWellness: true,
    hasEvents: true,
    statusBadge: {
      label: "Private Community",
      variant: "dark",
      icon: "lock",
    },
    categoryBadge: {
      label: "150 Residences",
      variant: "light",
    },
    chips: [
      { icon: "house", label: "1 Open House this week" },
      { icon: "newspaper", label: "3 Classifieds" },
    ],
    verification: {
      icon: "badge",
      label: "Resident Verification Req.",
    },
    cta: {
      label: "Request Resident Pass",
      icon: "arrowUpRight",
    },
    residentBadge: "Resident · Unit 14",
    residentBadgeVariant: "dark",
    enclaveType: "MASTER ESTATE",
    residentLocation: "Residential community · 180 homes",
    residentStat: "1 open house this week · 3 new classifieds",
    topRightAction: "notice",
    buttons: [
      { label: "Gate Intercom", icon: "intercom", variant: "cream" },
      { label: "Community Board", icon: "board", variant: "dark" },
    ],
  },
];
