import Link from "next/link";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import { accentClasses } from "@/lib/accent";
import copy from "@/data/copy/interestSent.json";

export default function ClubInterestSentPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }
  const a = accentClasses[club.accent];

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-2">
          <div className={`w-[76px] h-[76px] rounded-full ${a.bgLight} flex items-center justify-center shadow-pop`}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <div className="font-serif text-[24px] font-semibold">{copy.heading}</div>

          <p className="text-[14px] leading-relaxed text-bodytext max-w-[280px] m-0">
            {copy.body}
          </p>
        </div>
      </div>

      <div className="flex-none flex flex-col gap-2.5 px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/club/${club.slug}/events`}
          className={`block text-center py-3 rounded-xl border ${a.border} ${a.text} text-[14px] font-semibold`}
        >
          {copy.browseEventsButton}
        </Link>
        <Link
          href={`/club/${club.slug}`}
          className={`block text-center py-3 rounded-xl ${a.bg} text-white text-[14px] font-semibold shadow-pop`}
        >
          {copy.backToClubButton}
        </Link>
      </div>
    </>
  );
}
