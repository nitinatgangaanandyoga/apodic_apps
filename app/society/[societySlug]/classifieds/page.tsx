"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { societies, type ClassifiedCategory } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/classifieds.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function priceLabel(category: ClassifiedCategory, price: number | null) {
  if (category === "free") return copy.freePriceLabel;
  if (category === "services") return copy.serviceLabel;
  return "₹" + (price ?? 0).toLocaleString("en-IN");
}

export default function SocietyClassifiedsPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  const [activeCategory, setActiveCategory] = useState<"all" | ClassifiedCategory>("all");

  const listings =
    activeCategory === "all" ? society.classifieds : society.classifieds.filter((l) => l.category === activeCategory);

  return (
    <>
      <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/society/${society.slug}/events/member`}
            ariaLabel={copy.backAriaLabel}
            className="w-8 h-8 rounded-full bg-green-light flex items-center justify-center flex-none text-green"
          />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-[20px] font-semibold leading-tight">{copy.title}</div>
            <div className="text-[12px] text-muted">{society.name}</div>
          </div>
          <div className="flex-none flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 bg-green-light rounded-full">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2F4B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-[10.5px] font-semibold text-green">{copy.residentBadge}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5">
        <div className="flex gap-1 p-1 bg-hairline2 rounded-full">
          <Link
            href={`/society/${society.slug}/events/member`}
            className="flex-1 text-center py-2 rounded-full text-avatartext text-[12.5px] font-semibold"
          >
            {copy.eventsTab}
          </Link>
          <div className="flex-1 text-center py-2 rounded-full bg-green text-white text-[12.5px] font-semibold">
            {copy.classifiedsTab}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`flex-none px-3.5 py-2 rounded-full text-[12.5px] font-semibold ${
              activeCategory === "all" ? "bg-green text-white" : "bg-white text-bodytext"
            }`}
          >
            {copy.allCategory}
          </button>
          {society.classifiedCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-none px-3.5 py-2 rounded-full text-[12.5px] font-semibold ${
                activeCategory === cat.key ? "bg-green text-white" : "bg-white text-bodytext"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {listings.map((item) => (
            <Link
              key={item.key}
              href={`/society/${society.slug}/classifieds/${item.key}`}
              className="flex gap-3 p-3 bg-white border border-hairline2 rounded-2xl shadow-cardSm"
            >
              <div
                className="w-[60px] h-[60px] rounded-xl flex-none flex items-center justify-center"
                style={{ background: society.classifiedGradients[item.category] }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeOpacity={0.9} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.57 3H4a1 1 0 0 0-1 1v5.57a2 2 0 0 0 .83 1.42l9.58 9.58a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83z" />
                  <circle cx="7.5" cy="7.5" r="1" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold leading-snug">{item.title}</div>
                <div className="text-[12.5px] text-green font-semibold mt-1">{priceLabel(item.category, item.price)}</div>
                <div className="text-[11.5px] text-faint mt-0.5">
                  {fillTemplate(copy.unitPostedTemplate, { unit: item.unit, posted: item.posted })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-6 text-[12.5px] text-muted">{copy.emptyState}</div>
        )}
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href={`/society/${society.slug}/classifieds/new`}
          className="block text-center py-3 rounded-xl bg-green text-white text-[14px] font-semibold shadow-pop"
        >
          {copy.postListingButton}
        </Link>
      </div>
    </>
  );
}
