import Link from "next/link";
import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import copy from "@/data/copy/society/verifyPending.json";

export default function SocietyVerifyPendingPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-2">
          <div className="w-[76px] h-[76px] rounded-full bg-green-light flex items-center justify-center shadow-pop">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F4B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>

          <div className="font-serif text-[24px] font-semibold">{copy.heading}</div>

          <p className="text-[14px] leading-relaxed text-bodytext max-w-[280px] m-0">{copy.body}</p>
        </div>
      </div>

      <div className="flex-none flex flex-col gap-2.5 px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/society/${society.slug}/events`}
          className="block text-center py-3 rounded-xl border border-green-mid text-green text-[14px] font-semibold"
        >
          {copy.browseEventsButton}
        </Link>
        <Link
          href={`/society/${society.slug}`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.backToSocietyButton}
        </Link>
      </div>
    </>
  );
}
