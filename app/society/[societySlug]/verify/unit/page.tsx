import Link from "next/link";
import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/verifyUnit.json";

export default function SocietyVerifyUnitPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  return (
    <>
      <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/society/${society.slug}/verify/phone`}
            ariaLabel={copy.backAriaLabel}
            className="w-8 h-8 rounded-full bg-green-light flex items-center justify-center flex-none text-green"
          />
          <div>
            <div className="font-serif text-[20px] font-semibold leading-tight">{copy.title}</div>
            <div className="text-[12px] text-muted">{copy.subtitle}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-[22px] pb-5 flex flex-col gap-[18px]">
        <p className="text-[13.5px] leading-relaxed text-bodytext m-0">{copy.intro}</p>

        <div className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.nameLabel}</label>
            <input
              className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
              type="text"
              placeholder={copy.namePlaceholder}
              defaultValue={copy.nameDefault}
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.unitLabel}</label>
            <input
              className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
              type="text"
              placeholder={copy.unitPlaceholder}
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.phoneLabel}</label>
            <input
              className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
              type="tel"
              placeholder={copy.phonePlaceholder}
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.relationshipLabel}</label>
            <input
              className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
              type="text"
              placeholder={copy.relationshipPlaceholder}
            />
          </div>
        </div>

        <div className="text-[12px] text-muted text-center">{copy.committeeNote}</div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/society/${society.slug}/verify/pending`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.submitButton}
        </Link>
      </div>
    </>
  );
}
