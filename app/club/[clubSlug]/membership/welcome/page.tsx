import Link from "next/link";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import { accentClasses } from "@/lib/accent";
import copy from "@/data/copy/welcome.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

const stepIcons: Record<string, React.ReactNode> = {
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  card: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M14 10h4M14 14h4" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M2 12c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
    </svg>
  ),
};

export default function ClubMembershipWelcomePage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }
  const a = accentClasses[club.accent];

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div
          className="relative h-[200px] flex items-center justify-center overflow-hidden"
          style={{ background: club.heroGradient }}
        >
          <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.08] -top-[70px] -right-[50px]" />
          <div className="w-[68px] h-[68px] rounded-full bg-white/[0.92] flex items-center justify-center shadow-pop">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <div className="px-5 pt-6 pb-2 flex flex-col gap-[22px]">
          <div className="text-center">
            <div className="font-serif text-[24px] font-semibold">{fillTemplate(copy.headingTemplate, { club: club.name })}</div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-bodytext m-0">
              {fillTemplate(copy.bodyTemplate, { plan: copy.defaultPlan })}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {copy.nextSteps.map((step) =>
              step.linked ? (
                <Link
                  key={step.key}
                  href={fillTemplate(step.hrefTemplate ?? "", { slug: club.slug })}
                  className="flex items-center gap-3.5 px-4 py-3.5 bg-white border border-hairline2 rounded-2xl shadow-cardSm"
                >
                  <div className={`w-[38px] h-[38px] rounded-[10px] ${a.bgLight} flex items-center justify-center flex-none ${a.text}`}>
                    {stepIcons[step.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold">{step.title}</div>
                    <div className="text-[12px] text-muted mt-0.5">{step.note}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.iconStroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ) : (
                <button
                  key={step.key}
                  type="button"
                  className="flex items-center gap-3.5 px-4 py-3.5 bg-white border border-hairline2 rounded-2xl shadow-cardSm text-left w-full box-border"
                >
                  <div className={`w-[38px] h-[38px] rounded-[10px] ${a.bgLight} flex items-center justify-center flex-none ${a.text}`}>
                    {stepIcons[step.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold">{step.title}</div>
                    <div className="text-[12px] text-muted mt-0.5">{step.note}</div>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/club/${club.slug}`}
          className={`block text-center py-3 rounded-xl ${a.bg} text-white text-[14px] font-semibold shadow-pop`}
        >
          {copy.goToClubButton}
        </Link>
      </div>
    </>
  );
}
