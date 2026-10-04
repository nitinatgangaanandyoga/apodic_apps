import Link from "next/link";
import BottomTabBar from "@/components/BottomTabBar";
import { spaces } from "@/lib/mockData";
import nav from "@/data/copy/nav.json";
import copy from "@/data/copy/explore.json";

export default function ExplorePage() {
  return (
    <>
      <div className="flex-none px-5 pt-5 flex items-center justify-between">
        <div className="text-[12.5px] font-bold tracking-[0.14em]">{nav.wordmark}</div>
        <div className="w-[34px] h-[34px] rounded-full bg-avatarbg flex items-center justify-center text-[13px] font-semibold text-avatartext">
          {nav.avatarInitial}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
        <div className="text-[12.5px] text-muted">{copy.eyebrow}</div>
        <div className="font-serif text-[27px] font-semibold mt-0.5">{copy.heading}</div>

        <div className="flex items-center gap-2.5 mt-4 px-3.5 py-3 bg-white border border-hairline2 rounded-[14px] shadow-cardSm">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8A7F6E" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span className="text-[13.5px] text-muted">{copy.searchPlaceholder}</span>
        </div>

        <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mt-[26px] mb-3">
          {copy.sectionLabel}
        </div>

        <div className="flex flex-col gap-3.5">
          {spaces.map((space) => {
            const card = (
              <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
                <div className="h-[140px] relative" style={{ background: space.gradient }}>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/90 rounded-full text-[10.5px] font-semibold text-brass-dark">
                    {space.exploreOpenBadge}
                  </div>
                  <div className="absolute right-4 bottom-1 font-serif text-[48px] font-semibold text-white/25">
                    {space.initial}
                  </div>
                </div>
                <div className="px-4 pt-3.5 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] font-semibold">{space.name}</div>
                    {space.href && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    )}
                  </div>
                  <div className="text-[12px] text-muted mt-0.5">{space.tagline}</div>
                  <div className="text-[12.5px] text-bodytext leading-relaxed mt-2">
                    {space.exploreDescription}
                  </div>
                </div>
              </div>
            );

            return space.href ? (
              <Link key={space.key} href={space.href}>
                {card}
              </Link>
            ) : (
              <div key={space.key} className="relative opacity-90">
                {card}
                <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-ink/80 rounded-full text-[9.5px] font-semibold text-white">
                  {copy.comingSoonBadge}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[12px] text-muted text-center mt-[18px]">
          {copy.footer}
        </div>
      </div>

      <BottomTabBar />
    </>
  );
}
