// Small helper that maps a club's `accent` key to the Tailwind classes and
// raw hex values used for icon strokes across the club-scoped pages. Keeps
// every page from having to redefine the same brass/green branching.

export type AccentKey = "brass" | "green";

export const accentClasses: Record<
  AccentKey,
  {
    text: string; // accent-colored text (links, "see details", etc.)
    bg: string; // solid accent background (primary buttons)
    bgLight: string; // tinted light background (chips, icon tiles)
    border: string; // accent-colored border (outline buttons)
    darkText: string; // darkest shade, used on light badges
    iconStroke: string; // raw hex for inline SVG stroke props
    headerAccent: "brass" | "green"; // for BackHeader's `accent` prop
  }
> = {
  brass: {
    text: "text-brass-accent",
    bg: "bg-brass",
    bgLight: "bg-brass-light",
    border: "border-brass",
    darkText: "text-brass-dark",
    iconStroke: "#B08D57",
    headerAccent: "brass",
  },
  green: {
    text: "text-green",
    bg: "bg-green",
    bgLight: "bg-green-light",
    border: "border-green",
    darkText: "text-green-dark",
    iconStroke: "#2F4B3C",
    headerAccent: "green",
  },
};
