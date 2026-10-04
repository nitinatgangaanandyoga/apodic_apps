"use client";

import { useRouter } from "next/navigation";

// A circular "back" button for hero-style pages (club profile, amenity
// detail) that don't use the flat BackHeader bar. Prefers real browser
// history (so it returns you to wherever you actually came from — Home or
// Explore) and falls back to a fixed href when there's no history to pop
// (e.g. the page was opened directly via a shared link).
export default function BackButton({
  fallbackHref,
  className,
  style,
  ariaLabel = "Go back",
}: {
  fallbackHref: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={className}
      style={style}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
  );
}
