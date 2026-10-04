import Link from "next/link";
import { notFound } from "next/navigation";
import BackHeader from "@/components/BackHeader";
import { clubs } from "@/lib/mockData";
import { accentClasses } from "@/lib/accent";
import copy from "@/data/copy/checkout.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export default function ClubMembershipCheckoutPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }
  const a = accentClasses[club.accent];
  const familyPlan = club.membershipPlans.find((p) => p.key === "family") ?? club.membershipPlans[0];

  const checkIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <>
      <BackHeader href={`/club/${club.slug}/membership`} title={copy.title} subtitle={club.name} accent={a.headerAccent} />

      <div className="flex-1 overflow-y-auto px-5 py-[18px] flex flex-col gap-[18px]">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-avatarbg rounded-full self-start">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6E6656" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-[11.5px] font-semibold text-avatartext">{fillTemplate(copy.signedInAsTemplate, { phone: copy.demoPhone })}</span>
        </div>

        <div className="rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
          <div className="px-[18px] py-4 flex items-center justify-between border-b border-hairline2">
            <div>
              <div className="text-[15.5px] font-semibold">{familyPlan.name} plan</div>
              <div className="text-[12px] text-muted mt-0.5">{copy.billedAnnually}</div>
            </div>
            <Link href={`/club/${club.slug}/membership`} className={`text-[12.5px] font-semibold ${a.text}`}>
              {copy.changeButton}
            </Link>
          </div>
          <div className="px-[18px] py-3.5 flex flex-col gap-2 border-b border-hairline2">
            {familyPlan.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-[12.5px] text-bodytext">
                {checkIcon}
                {f}
              </div>
            ))}
          </div>
          <div className="px-[18px] py-3.5 flex items-center justify-between">
            <div className="text-[13px] text-bodytext">{copy.totalDueToday}</div>
            <div className="font-serif text-[19px] font-semibold">{familyPlan.price}</div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2.5">
            {copy.paymentMethodLabel}
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 bg-white border border-hairline2 rounded-2xl shadow-cardSm">
            <div className="w-10 h-7 rounded-md bg-ink flex items-center justify-center flex-none">
              <svg width="20" height="14" viewBox="0 0 24 16" fill="none">
                <rect x="0.5" y="0.5" width="23" height="15" rx="2" stroke="#FFFFFF" strokeOpacity={0.5} />
                <rect x="3" y="4" width="18" height="3" fill="#FFFFFF" fillOpacity={0.6} />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold">{copy.cardLabel}</div>
              <div className="text-[11.5px] text-muted mt-0.5">{copy.cardExpiry}</div>
            </div>
            <button type="button" className={`text-[12.5px] font-semibold ${a.text}`}>
              {copy.changeButton}
            </button>
          </div>
        </div>

        <div className="text-[11.5px] text-muted leading-relaxed text-center px-2">
          {copy.disclaimer}
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/club/${club.slug}/membership/welcome`}
          className={`block text-center py-3 rounded-xl ${a.bg} text-white text-[14px] font-semibold shadow-pop`}
        >
          {fillTemplate(copy.payButtonTemplate, { price: familyPlan.price })}
        </Link>
      </div>
    </>
  );
}
