import Link from "next/link";
import { notFound } from "next/navigation";
import BackHeader from "@/components/BackHeader";
import { societies } from "@/lib/mockData";
import copy from "@/data/copy/society/events.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export default function SocietyEventsPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  const featured = society.events.find((e) => e.openToAll) ?? society.events[0];
  const hiddenEvents = society.events.filter((e) => e.key !== featured.key);

  return (
    <>
      <BackHeader
        href={`/society/${society.slug}`}
        title={copy.title}
        subtitle={`${society.name} · ${copy.subtitle}`}
        accent="green"
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-[18px]">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2">
            {copy.openToEveryoneLabel}
          </div>
          <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
            <div className="h-[130px] relative overflow-hidden" style={{ background: featured.gradient }}>
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/[0.9] rounded-full text-[11px] font-semibold text-green">
                {featured.dateTime}
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E7F0E9] text-[#2F6B46]">
                {copy.openToAllTag}
              </div>
            </div>
            <div className="px-4 pt-3.5 pb-4">
              <div className="text-[15.5px] font-semibold">{featured.title}</div>
              <div className="text-[12.5px] text-muted mt-1">{featured.detail}</div>
              <Link
                href={`/society/${society.slug}`}
                className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-2 rounded-full border border-green-mid text-[12.5px] font-semibold text-green"
              >
                {copy.interestedButton}
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2">
            {copy.thisMonthLabel}
          </div>
          <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-hairline2">
              <div className="text-[13px] text-bodytext">
                {fillTemplate(copy.moreEventsTemplate, { n: String(hiddenEvents.length) })}
              </div>
              <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-hairline2 text-[#7A7266]">
                {copy.residentsOnlyTag}
              </div>
            </div>
            {hiddenEvents.map((event) => (
              <div key={event.key} className="flex items-center gap-3 px-4 py-3 border-b border-hairline2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ABA396" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold">{event.title}</div>
                  <div className="text-[11.5px] text-faint mt-0.5">{copy.hiddenDetail}</div>
                </div>
              </div>
            ))}
            <Link
              href={`/society/${society.slug}/verify/phone`}
              className="flex items-center justify-center gap-1.5 py-3.5 bg-[#FAFBF9] text-[12.5px] font-semibold text-green"
            >
              {copy.signInToSeeMore}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2F4B3C" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar flex flex-col gap-2">
        <div className="text-[12px] text-muted text-center">{copy.residentsFooter}</div>
        <Link
          href={`/society/${society.slug}/verify/phone`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.residentSignInButton}
        </Link>
      </div>
    </>
  );
}
