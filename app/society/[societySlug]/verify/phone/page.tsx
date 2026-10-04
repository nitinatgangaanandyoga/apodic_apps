import Link from "next/link";
import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/verifyPhone.json";

export default function SocietyVerifyPhonePage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  return (
    <>
      <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/society/${society.slug}`}
            ariaLabel={copy.backAriaLabel}
            className="w-8 h-8 rounded-full bg-green-light flex items-center justify-center flex-none text-green"
          />
          <div>
            <div className="font-serif text-[20px] font-semibold leading-tight">{copy.title}</div>
            <div className="text-[12px] text-muted">{copy.subtitle}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-[22px] pb-5 flex flex-col gap-5">
        <div className="w-[52px] h-[52px] rounded-2xl bg-green-light flex items-center justify-center shadow-cardSm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F4B3C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
        </div>

        <div>
          <div className="font-serif text-[19px] font-semibold">{copy.heading}</div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-bodytext m-0">{copy.body}</p>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.phoneLabel}</label>
          <input
            className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
            type="tel"
            placeholder={copy.phonePlaceholder}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-px bg-hairline" />
          <div className="text-[11px] text-faint uppercase tracking-[0.06em]">{copy.orDivider}</div>
          <div className="flex-1 h-px bg-hairline" />
        </div>

        <Link
          href={`/society/${society.slug}/verify/unit`}
          className="flex items-center justify-between px-4 py-3.5 bg-white border border-hairline2 rounded-2xl shadow-cardSm"
        >
          <div>
            <div className="text-[13.5px] font-semibold">{copy.newHereTitle}</div>
            <div className="text-[11.5px] text-muted mt-0.5">{copy.newHereNote}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D5C4A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>

        <div className="text-[12px] text-muted text-center">{copy.onFileNote}</div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/society/${society.slug}/verify/otp`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.sendCodeButton}
        </Link>
      </div>
    </>
  );
}
