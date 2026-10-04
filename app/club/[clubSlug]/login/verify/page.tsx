import Link from "next/link";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/verify.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

const digits = copy.demoDigits;

export default function ClubLoginVerifyPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }

  return (
    <>
      <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/club/${club.slug}/login`}
            ariaLabel={copy.backAriaLabel}
            className="w-8 h-8 rounded-full bg-avatarbg flex items-center justify-center flex-none text-avatartext"
          />
          <div>
            <div className="font-serif text-[20px] font-semibold leading-tight">{copy.title}</div>
            <div className="text-[12px] text-muted">{copy.subtitle}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-5 flex flex-col gap-[22px]">
        <p className="text-[13.5px] leading-relaxed text-bodytext m-0">
          {fillTemplate(copy.bodyTemplate, { phone: copy.maskedPhone })}
        </p>

        <div className="flex gap-2 justify-center">
          {digits.map((d, i) => (
            <input
              key={i}
              className="w-11 h-[52px] rounded-xl border border-hairline2 bg-white text-center text-[19px] font-semibold shadow-cardSm focus:outline-none focus:border-ink focus:ring-[3px] focus:ring-ink/10"
              maxLength={1}
              inputMode="numeric"
              defaultValue={d}
            />
          ))}
        </div>

        <div className="text-center">
          <button type="button" className="text-[12.5px] font-semibold text-ink">
            {copy.resendButton}
          </button>
          <span className="text-[12.5px] text-faint"> {copy.countdown}</span>
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/club/${club.slug}/membership/checkout`}
          className="block text-center py-3 rounded-xl bg-ink text-white text-[14px] font-semibold shadow-[0_6px_16px_-6px_rgba(28,27,25,0.35)]"
        >
          {copy.verifyButton}
        </Link>
      </div>
    </>
  );
}
