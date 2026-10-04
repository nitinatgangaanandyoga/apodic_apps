import { notFound } from "next/navigation";
import { societies, type ClassifiedCategory } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/classifiedDetail.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

const categoryLabels: Record<ClassifiedCategory, string> = {
  sale: "For sale",
  services: "Services",
  free: "Free",
};

export function generateStaticParams() {
  return Object.values(societies).flatMap((society) =>
    society.classifieds.map((listing) => ({ societySlug: society.slug, listingId: listing.key }))
  );
}

export default function SocietyClassifiedDetailPage({
  params,
}: {
  params: { societySlug: string; listingId: string };
}) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }
  const listing = society.classifieds.find((l) => l.key === params.listingId);
  if (!listing) {
    notFound();
  }

  const priceLabel =
    listing.category === "free" ? copy.freePriceLabel : listing.category === "services" ? copy.serviceLabel : "₹" + (listing.price ?? 0).toLocaleString("en-IN");

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div
          className="relative h-[200px] flex items-center justify-center overflow-hidden"
          style={{ background: society.classifiedGradients[listing.category] }}
        >
          <BackButton
            fallbackHref={`/society/${society.slug}/classifieds`}
            ariaLabel={copy.backAriaLabel}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center text-green"
          />
          <div className="absolute top-4 right-4 px-2.5 py-1.5 rounded-full text-[10.5px] font-semibold bg-white/90 text-green">
            {categoryLabels[listing.category]}
          </div>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.57 3H4a1 1 0 0 0-1 1v5.57a2 2 0 0 0 .83 1.42l9.58 9.58a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83z" />
            <circle cx="7.5" cy="7.5" r="1" />
          </svg>
        </div>

        <div className="px-5 pt-5 pb-2 flex flex-col gap-[18px]">
          <div>
            <div className="font-serif text-[21px] font-semibold leading-snug">{listing.title}</div>
            <div className="font-serif text-[22px] font-semibold text-green mt-2">{priceLabel}</div>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-3 bg-white border border-hairline2 rounded-xl shadow-cardSm">
            <div className="w-[34px] h-[34px] rounded-full bg-green-light flex items-center justify-center text-[13px] font-semibold text-green flex-none">
              R
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold">{fillTemplate(copy.unitLabelTemplate, { unit: listing.unit })}</div>
              <div className="text-[11.5px] text-muted mt-0.5">{fillTemplate(copy.postedLabelTemplate, { posted: listing.posted })}</div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2">{copy.descriptionLabel}</div>
            <p className="m-0 text-[13.5px] leading-relaxed text-bodytext">{listing.description}</p>
          </div>

          <div className="text-[11.5px] text-faint text-center pb-2">{copy.footer}</div>
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <button
          type="button"
          className="block w-full text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {fillTemplate(copy.messageButtonTemplate, { unit: listing.unit })}
        </button>
      </div>
    </>
  );
}
