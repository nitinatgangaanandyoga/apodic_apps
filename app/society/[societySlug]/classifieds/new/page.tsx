"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { societies, type ClassifiedCategory } from "@/lib/mockData";
import BackHeader from "@/components/BackHeader";
import copy from "@/data/copy/society/classifiedNew.json";

const categoryOptions: { key: ClassifiedCategory; label: string }[] = [
  { key: "sale", label: "For sale" },
  { key: "services", label: "Services" },
  { key: "free", label: "Free" },
];

export default function SocietyClassifiedNewPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  const [category, setCategory] = useState<ClassifiedCategory>("sale");

  return (
    <>
      <BackHeader
        href={`/society/${society.slug}/classifieds`}
        title={copy.title}
        subtitle={`${society.name} · ${copy.subtitle}`}
        accent="green"
      />

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-[18px]">
        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-2">{copy.categoryLabel}</label>
          <div className="flex gap-2">
            {categoryOptions.map((opt) => {
              const isOn = category === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setCategory(opt.key)}
                  className={`flex-1 py-2.5 rounded-full text-[12.5px] font-semibold border ${
                    isOn ? "bg-green text-white border-green" : "bg-white text-bodytext border-hairline"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.titleLabel}</label>
          <input
            className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
            type="text"
            placeholder={copy.titlePlaceholder}
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.priceLabel}</label>
          <input
            className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
            type="text"
            placeholder={copy.pricePlaceholder}
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-1.5">{copy.descriptionLabel}</label>
          <textarea
            className="w-full box-border px-3.5 py-3 rounded-xl border border-hairline bg-white text-[14px] placeholder:text-faint"
            rows={4}
            placeholder={copy.descriptionPlaceholder}
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-avatartext mb-2">{copy.photoLabel}</label>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 w-full py-[22px] border-[1.5px] border-dashed border-hairline rounded-2xl bg-white text-muted"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8A7F6E" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="M21 15l-5-5-9 9" />
            </svg>
            <span className="text-[12.5px] font-semibold">{copy.addPhotoButton}</span>
          </button>
        </div>

        <div className="text-[11.5px] text-muted text-center">{copy.disclaimer}</div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/society/${society.slug}/classifieds`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.submitButton}
        </Link>
      </div>
    </>
  );
}
