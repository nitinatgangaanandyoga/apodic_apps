"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import copy from "@/data/copy/bottomTabBar.json";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
  );
}

function SavedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12v16l-6-4-6 4z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

export default function BottomTabBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isExplore = pathname?.startsWith("/explore");

  return (
    <div className="flex-none flex border-t border-hairline2 bg-white shadow-bar">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center gap-[3px] py-[10px] pb-3 ${isHome ? "text-ink" : "text-faint"
          }`}
      >
        <HomeIcon active={isHome} />
        <span className={`text-[10.5px] ${isHome ? "font-semibold" : "font-medium"}`}>{copy.home}</span>
      </Link>
      <Link
        href="/explore"
        className={`flex-1 flex flex-col items-center gap-[3px] py-[10px] pb-3 ${isExplore ? "text-ink" : "text-faint"
          }`}
      >
        <CompassIcon />
        <span className={`text-[10.5px] ${isExplore ? "font-semibold" : "font-medium"}`}>{copy.explore}</span>
      </Link>
      <button className="flex-1 flex flex-col items-center gap-[3px] py-[10px] pb-3 text-faint" type="button">
        <SavedIcon />
        <span className="text-[10.5px] font-medium">{copy.saved}</span>
      </button>
      <button className="flex-1 flex flex-col items-center gap-[3px] py-[10px] pb-3 text-faint" type="button">
        <ProfileIcon />
        <span className="text-[10.5px] font-medium">{copy.profile}</span>
      </button>
    </div>
  );
}
