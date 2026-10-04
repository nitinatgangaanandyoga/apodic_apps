"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { societies } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/society/eventsMember.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export default function SocietyEventsMemberPage({ params }: { params: { societySlug: string } }) {
  const society = societies[params.societySlug];
  if (!society) {
    notFound();
  }

  // Demo-only RSVP state: "diwali" starts checked in, matching the design.
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({ diwali: true });

  return (
    <>
      <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/society/${society.slug}`}
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
          <div className="flex-1 text-center py-2 rounded-full bg-green text-white text-[12.5px] font-semibold">
            {copy.eventsTab}
          </div>
          <Link
            href={`/society/${society.slug}/classifieds`}
            className="flex-1 text-center py-2 rounded-full text-avatartext text-[12.5px] font-semibold"
          >
            {copy.classifiedsTab}
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">{copy.thisMonthLabel}</div>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-light text-green text-[11.5px] font-semibold shadow-pop"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {copy.newEventButton}
          </button>
        </div>

        {society.events.map((event) => {
          const isGoing = !!rsvps[event.key];
          const going = event.going + (isGoing ? 1 : 0);
          return (
            <div key={event.key} className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
              <div className="h-[118px] relative" style={{ background: event.gradient }}>
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/[0.9] rounded-full text-[11px] font-semibold text-green">
                  {event.dateTime}
                </div>
                {event.openToAll && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E7F0E9] text-[#2F6B46]">
                    Open to all
                  </div>
                )}
              </div>
              <div className="px-4 pt-3.5 pb-4">
                <div className="text-[15.5px] font-semibold">{event.title}</div>
                <div className="text-[12.5px] text-muted mt-1">{event.detail}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-[12px] text-muted">{fillTemplate(copy.goingLabelTemplate, { n: String(going) })}</div>
                  <button
                    type="button"
                    onClick={() => setRsvps((s) => ({ ...s, [event.key]: !isGoing }))}
                    className={`px-4 py-2 rounded-full text-[12.5px] font-semibold ${
                      isGoing ? "bg-green text-white" : "bg-transparent text-green border border-green-mid"
                    }`}
                  >
                    {isGoing ? copy.goingLabel : copy.rsvpLabel}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-none px-5 py-3 bg-ivory border-t border-hairline2 shadow-bar flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full bg-green-light flex items-center justify-center text-[12px] font-semibold text-green flex-none">
          {copy.demoAvatarInitial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-semibold">{fillTemplate(copy.signedInAsTemplate, { name: copy.demoName })}</div>
          <div className="text-[11px] text-muted">{copy.demoUnit}</div>
        </div>
        <button type="button" className="text-[12px] font-semibold text-muted">
          {copy.signOutButton}
        </button>
      </div>
    </>
  );
}
