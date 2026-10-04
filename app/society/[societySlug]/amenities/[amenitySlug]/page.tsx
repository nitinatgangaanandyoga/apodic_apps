import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/amenity.json";

export function generateStaticParams() {
  return Object.values(societies).flatMap((society) =>
    Object.keys(society.amenityDetails).map((amenitySlug) => ({ societySlug: society.slug, amenitySlug }))
  );
}

const clockIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export default function SocietyAmenityDetailPage({
  params,
}: {
  params: { societySlug: string; amenitySlug: string };
}) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }
  const amenity = society.amenityDetails[params.amenitySlug];
  if (!amenity) {
    notFound();
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-[220px] overflow-hidden" style={{ background: amenity.gradient }}>
          <BackButton
            fallbackHref={`/society/${society.slug}`}
            ariaLabel={copy.backAriaLabel}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center"
            style={{ color: amenity.accentColor }}
          />
          <div className="absolute left-5 right-5 bottom-4">
            <div className="font-serif text-[26px] font-semibold text-white">{amenity.title}</div>
            <div className="text-[12.5px] text-white/90 mt-1">{society.name}</div>
          </div>
        </div>

        <div className="px-5 pt-[22px] pb-2 flex flex-col gap-5">
          <p className="text-[14px] leading-relaxed text-bodytext m-0">{amenity.description}</p>

          {amenity.hours.kind === "single" && (
            <div className="flex items-center gap-2.5 px-3.5 py-3 bg-white border border-hairline2 rounded-xl shadow-cardSm text-green">
              {clockIcon}
              <div className="text-[13px] text-bodytext">{amenity.hours.text}</div>
            </div>
          )}

          <div>
            <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2.5">
              {copy.highlightsLabel}
            </div>
            <div className="flex flex-col gap-2">
              {amenity.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-[13px] text-bodytext">
                  <span className="w-1.5 h-1.5 rounded-full flex-none bg-green" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[12.5px] text-muted text-center pb-2">
            {amenity.footer}
          </div>
        </div>
      </div>

      <div className="flex-none flex gap-2.5 px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <button
          type="button"
          className="flex-1 text-center py-3 rounded-xl border text-[14px] font-semibold"
          style={{ borderColor: "#3D5C4A", color: "#2F4B3C" }}
        >
          {amenity.secondaryCta}
        </button>
        <button
          type="button"
          className="flex-[1.3] text-center py-3 rounded-xl text-white text-[14px] font-semibold shadow-pop"
          style={{ background: "#2F4B3C" }}
        >
          {amenity.primaryCta}
        </button>
      </div>
    </>
  );
}
