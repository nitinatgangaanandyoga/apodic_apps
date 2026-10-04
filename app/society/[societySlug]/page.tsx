import Link from "next/link";
import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import { accentClasses } from "@/lib/accent";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/profile.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export function generateStaticParams() {
  return Object.keys(societies).map((societySlug) => ({ societySlug }));
}

export default function SocietyPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  const a = accentClasses[society.accent];

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-[260px] overflow-hidden" style={{ background: society.heroGradient }}>
          <div className="absolute w-[220px] h-[220px] rounded-full bg-white/[0.08] -top-[70px] -left-[60px]" />
          <div className="absolute w-[150px] h-[150px] rounded-full bg-white/[0.06] -bottom-[50px] -right-[30px]" />
          <div className="absolute left-0 right-0 bottom-0 h-[110px] bg-gradient-to-t from-black/30 to-transparent" />

          <BackButton
            fallbackHref="/explore"
            ariaLabel={copy.backAriaLabel}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center text-green shadow-cardSm"
          />
          <div className="absolute top-[18px] left-[60px] flex items-center gap-1.5 px-3 py-1.5 bg-white/85 rounded-full text-[11px] font-semibold tracking-[0.08em] text-green shadow-cardSm">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            {society.heroBadge}
          </div>
          <button
            aria-label={copy.saveAriaLabel}
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center text-green shadow-cardSm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4h12v16l-6-4-6 4z" />
            </svg>
          </button>

          <div className="absolute left-5 right-5 bottom-[18px] flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="font-serif text-[28px] font-semibold text-white leading-tight drop-shadow-sm">
                {society.name}
              </div>
              <div className="text-[13px] text-white/90 mt-1">{society.homesLabel}</div>
            </div>
            <Link
              href={`/society/${society.slug}/events`}
              className="flex-none flex items-center gap-1.5 px-4 py-2.5 bg-white/95 rounded-full text-[13px] font-semibold text-green whitespace-nowrap shadow-cardSm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              {copy.eventsButton}
            </Link>
          </div>
        </div>

        <div className="px-5 pt-6 pb-2 flex flex-col gap-[22px]">
          <p className="text-[14px] leading-relaxed text-bodytext m-0">{society.description}</p>

          <div>
            <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-3">
              {copy.amenitiesLabel}
            </div>
            <div className="flex flex-col gap-3.5">
              {society.amenities.map((amenity) => (
                <Link
                  key={amenity.key}
                  href={`/society/${society.slug}/amenities/${amenity.key}`}
                  className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card"
                >
                  <div className="h-[150px] relative" style={{ background: amenity.gradient }} />
                  <div className="px-4 pt-3.5 pb-4">
                    <div className="text-[16px] font-semibold">{amenity.name}</div>
                    <div className="text-[12.5px] text-muted leading-relaxed mt-1">{amenity.blurb}</div>
                    <div className={`flex items-center gap-1 mt-2 text-[12px] font-semibold ${a.text}`}>
                      {copy.seeDetails}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={`/society/${society.slug}/events`}
            className="block p-4 bg-white border border-hairline2 rounded-2xl shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-[10.5px] font-semibold tracking-[0.08em] text-green-mid uppercase">
                  {copy.teaserBadge}
                </div>
                <div className="text-[15px] font-semibold mt-1">
                  {fillTemplate(copy.teaserTemplate, { n: String(society.events.length) })}
                </div>
                <div className="text-[12.5px] text-muted mt-0.5">{copy.teaserSignInHint}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </Link>

          <div className="text-[12.5px] text-muted text-center pb-2">
            {copy.membersFooter}
          </div>
        </div>
      </div>

      <div className="flex-none flex gap-2.5 px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <button
          type="button"
          className={`flex-1 text-center py-3 rounded-xl border ${a.border} ${a.darkText} text-[14px] font-semibold`}
        >
          {copy.requestVisitButton}
        </button>
        <Link
          href={`/society/${society.slug}/verify/phone`}
          className={`flex-[1.3] flex items-center justify-center gap-2 text-center py-3 rounded-xl ${a.bg} text-white text-[14px] font-semibold shadow-pop`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
          </svg>
          {copy.residentSignInButton}
        </Link>
      </div>
    </>
  );
}
