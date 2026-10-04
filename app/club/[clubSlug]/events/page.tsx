"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackHeader from "@/components/BackHeader";
import { clubs, type ClubEvent } from "@/lib/mockData";
import { accentClasses } from "@/lib/accent";
import copy from "@/data/copy/events.json";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function EventCard({ event, gradient }: { event: ClubEvent; gradient: string }) {
  const tag = event.open
    ? { label: copy.openTag, bg: "#E7F0E9", fg: "#2F6B46" }
    : { label: copy.membersOnlyTag, bg: "#F1ECE3", fg: "#7A7266" };

  return (
    <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-hairline2 shadow-card">
      <div className="h-[118px] relative" style={{ background: gradient }}>
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/[0.88] rounded-full text-[11px] font-semibold text-brass-dark">
          {event.date} · {event.time}
        </div>
        <div
          className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
          style={{ background: tag.bg, color: tag.fg }}
        >
          {tag.label}
        </div>
      </div>
      <div className="px-4 pt-3.5 pb-4">
        <div className="text-[15.5px] font-semibold">{event.title}</div>
        <div className="text-[12.5px] text-muted mt-1">{event.note}</div>
      </div>
    </div>
  );
}

export default function ClubEventsPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }
  const a = accentClasses[club.accent];

  const featured = club.events[0];

  // Unique days, in the order they first appear in the club's event list —
  // supports arbitrary per-club day slugs (e.g. "oct19", "oct24") rather
  // than a fixed set of day keys.
  const uniqueDays = Array.from(new Set(club.events.map((e) => e.day)));
  const dayLabelFor = (d: string) => club.events.find((e) => e.day === d)?.dayLabel ?? d;

  const [selectedDay, setSelectedDay] = useState<string>(featured.day);
  const [menuOpen, setMenuOpen] = useState(false);

  const dayEventsAll = club.events.filter((e) => e.day === selectedDay);
  const dayEvents = dayEventsAll.filter((e) => e.key !== featured.key);

  return (
    <>
      <BackHeader
        href={`/club/${club.slug}`}
        title={copy.title}
        subtitle={fillTemplate(copy.subtitleTemplate, { club: club.name })}
        accent={a.headerAccent}
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase mb-2">
            {copy.upNextLabel}
          </div>
          <EventCard event={featured} gradient={club.eventGradients[0]} />
        </div>

        <div className="relative flex items-center justify-between">
          <div>
            <div className="font-serif text-[19px] font-semibold">{dayLabelFor(selectedDay)}</div>
            <div className="text-[12px] text-muted mt-0.5">
              {dayEventsAll.length === 1 ? copy.eventSingular : fillTemplate(copy.eventPluralTemplate, { n: String(dayEventsAll.length) })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full ${a.bgLight} ${a.text} text-[12.5px] font-semibold shadow-pop`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            {copy.changeDayButton}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute top-[42px] right-0 w-[172px] bg-white border border-hairline rounded-2xl overflow-hidden shadow-pop z-10">
              {uniqueDays.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setSelectedDay(d);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-[13px] font-medium border-b border-hairline2 ${d === selectedDay ? `${a.bgLight} ${a.text}` : "bg-white text-ink"
                    }`}
                >
                  {dayLabelFor(d)}
                </button>
              ))}
            </div>
          )}
        </div>

        {dayEvents.map((event, i) => (
          <EventCard key={event.key} event={event} gradient={club.eventGradients[(i + 1) % club.eventGradients.length]} />
        ))}

        {dayEvents.length === 0 && (
          <div className="text-center py-4 text-[12.5px] text-muted">
            {copy.emptyDay}
          </div>
        )}
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar flex flex-col gap-2">
        <div className="text-[12px] text-muted text-center">
          {copy.membersFooter}
        </div>
        <Link
          href={`/club/${club.slug}/membership`}
          className={`block text-center py-3 rounded-xl ${a.bg} text-white text-[14px] font-semibold shadow-pop`}
        >
          {fillTemplate(copy.joinButtonTemplate, { club: club.name })}
        </Link>
      </div>
    </>
  );
}
