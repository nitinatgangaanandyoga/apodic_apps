"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/club.json";

function VerifiedShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BookmarkIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#8A6A3C" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1B19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function UserAvatarIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#1C1B19] text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90 transition-opacity">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

// Amenity chip icons
function ChipIcon({ type }: { type: string }) {
  switch (type) {
    case "users":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "catering":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2v20M2 2v20M6 2v6a4 4 0 0 0 8 0V2" />
        </svg>
      );
    case "parking":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    case "clock":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "tennis":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M5.5 5.5a11 11 0 0 1 13 13" />
          <path d="M18.5 5.5a11 11 0 0 0-13 13" />
        </svg>
      );
    case "yoga":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 10v6M7 13l5-3 5 3M9 21l3-5 3 5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ClubPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }

  const [isSaved, setIsSaved] = useState(false);
  const isPride = club.slug === "pride";

  // Data for Pride Club matching reference screenshot
  const heroImage = isPride ? "/images/pride-club.jpg" : "/images/sanctuary-club.jpg";

  const keyFacts = isPride
    ? [
        { value: "156", label: "ACRES PLOTTED", isAccent: false },
        { value: "Lutyens", label: "ARCHITECTURE", isAccent: false },
        { value: "Private", label: "CONCIERGE", isAccent: true },
      ]
    : [
        { value: "1,274", label: "LUXURY HOMES", isAccent: false },
        { value: "High-Rise", label: "CLUBHOUSE", isAccent: false },
        { value: "Private", label: "CONCIERGE", isAccent: true },
      ];

  const curatedAmenities = isPride
    ? [
        {
          key: "banquet",
          badge: "Grand Ballroom & Private Dining",
          index: "01",
          name: "Banquet Hall",
          image: "/images/pride-banquet.jpg",
          blurb: "A grand hall for weddings, receptions and community events, with in-house catering on request.",
          chips: [
            { icon: "users", label: "Cap. 450 guests" },
            { icon: "catering", label: "Catering on request" },
            { icon: "parking", label: "Valet parking" },
          ],
        },
        {
          key: "sportspark",
          badge: "Floodlit till 9 PM",
          index: "02",
          name: "Sports Park & Wellness Lawns",
          image: "/images/pride-sports.jpg",
          blurb: "Olympic-standard tennis courts, manicured outdoor yoga lawns, and tree-lined jogging avenues.",
          chips: [
            { icon: "clock", label: "Lit till 9 PM" },
            { icon: "tennis", label: "Tennis Courts" },
            { icon: "yoga", label: "Yoga Deck" },
          ],
        },
      ]
    : club.amenities.map((a, i) => ({
        key: a.key,
        badge: "Curated Suite",
        index: `0${i + 1}`,
        name: a.name,
        image: isPride ? "/images/pride-banquet.jpg" : "/images/sanctuary-club.jpg",
        blurb: a.blurb,
        chips: [
          { icon: "clock", label: "Open Daily" },
          { icon: "users", label: "Members Only" },
        ],
      }));

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-2 flex items-center justify-between bg-ivory z-20">
        <BackButton
          fallbackHref="/explore"
          ariaLabel={copy.backAriaLabel}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
        />

        <div className="px-3 py-1 rounded-full bg-[#F3EDE2] border border-[#E5DDD2] text-[10px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
          <span>{club.heroBadge || "PUBLIC PREVIEW"}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            aria-label={copy.saveAriaLabel}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
          >
            <BookmarkIcon active={isSaved} />
          </button>
          <UserAvatarIcon />
        </div>
      </header>

      {/* Main Scrollable Body */}
      <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar pb-6">
        {/* Hero Section Banner with Real Architectural Image */}
        <div className="relative h-[250px] sm:h-[270px] overflow-hidden rounded-[24px] mx-5 mt-1 bg-[#EAE4D8] shadow-card">
          <Image
            src={heroImage}
            alt={club.name}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
          {/* Subtle contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

          {/* Top Overlaid Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.1em] text-[#6E4E28] uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
              <span>RESIDENCE PREVIEW</span>
            </div>

            <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10.5px] font-semibold text-ink flex items-center gap-1.5 shadow-xs">
              <VerifiedShieldIcon />
              <span>Verified Enclave</span>
            </div>
          </div>

          {/* Bottom Title & Location + Events Pill */}
          <div className="absolute left-4 right-4 bottom-3.5 flex items-end justify-between gap-3 z-10">
            <div className="min-w-0">
              <h1 className="font-serif text-[24px] sm:text-[26px] font-semibold text-white leading-tight drop-shadow-sm">
                {club.name}
              </h1>
              <div className="flex items-center gap-1 text-[11px] text-white/90 mt-1 font-normal">
                <LocationPinIcon />
                <span className="truncate">{club.tagline}</span>
              </div>
            </div>

            <Link
              href={`/club/${club.slug}/events`}
              className="flex-none flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white rounded-full text-[11.5px] font-semibold text-ink whitespace-nowrap shadow-xs transition-all active:scale-95"
            >
              <CalendarIcon />
              <span>2 Events</span>
            </Link>
          </div>
        </div>

        {/* Community Description */}
        <p className="px-5 pt-4 pb-1 text-[13px] leading-[1.6] text-[#554E42] m-0 font-normal">
          {club.description}
        </p>

        {/* 3 Key Stats / Enclave Overview Cards */}
        <div className="grid grid-cols-3 gap-2.5 my-3 px-5">
          {keyFacts.map((fact, idx) => (
            <div
              key={idx}
              className="bg-[#F8F4ED] rounded-[16px] py-3 px-2 flex flex-col items-center justify-center border border-[#EBE4D8] text-center shadow-xs"
            >
              <span
                className={`font-serif text-[20px] sm:text-[22px] font-bold leading-tight ${
                  fact.isAccent ? "text-[#8A6A3C]" : "text-ink"
                }`}
              >
                {fact.value}
              </span>
              <span className="text-[9px] font-bold tracking-[0.08em] text-[#8A7F6E] uppercase mt-0.5">
                {fact.label}
              </span>
            </div>
          ))}
        </div>

        {/* Amenities Section Header */}
        <div className="px-5 flex items-center justify-between mt-3 mb-2.5">
          <div className="text-[10px] font-bold tracking-[0.12em] text-[#8A7F6E] uppercase">
            AMENITIES <span className="font-medium text-[#9E9484]">(4 Curated)</span>
          </div>
          <div className="text-[10px] font-bold tracking-[0.1em] text-[#8A6A3C] uppercase">
            ARCHITECTURAL SUITES
          </div>
        </div>

        {/* Curated Amenity Cards List */}
        <div className="px-5 flex flex-col gap-4">
          {curatedAmenities.map((amenity) => (
            <div
              key={amenity.key}
              className="group flex flex-col rounded-[22px] overflow-hidden bg-white border border-[#EAE4D8] shadow-[0_4px_20px_rgba(28,27,25,0.06)] hover:shadow-[0_8px_28px_rgba(28,27,25,0.1)] transition-all duration-300"
            >
              {/* Amenity Photo with Overlaid Tag */}
              <div className="h-[160px] sm:h-[175px] relative w-full overflow-hidden bg-[#EAE4D8]">
                <Image
                  src={amenity.image}
                  alt={amenity.name}
                  fill
                  sizes="(max-width: 430px) 100vw, 430px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badge Top-Left */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10.5px] font-semibold text-ink shadow-xs">
                  {amenity.badge}
                </div>

                {/* Subtle Index Number Bottom-Right */}
                <div className="absolute right-3.5 bottom-1 font-mono text-[13px] font-bold text-white/50 select-none">
                  {amenity.index}
                </div>
              </div>

              {/* Amenity Content */}
              <div className="p-4.5 pt-3.5 pb-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16.5px] font-bold text-ink group-hover:text-brass-dark transition-colors">
                    {amenity.name}
                  </h3>
                  <Link
                    href={`/club/${club.slug}/amenities/${amenity.key}`}
                    className="text-[11.5px] font-semibold text-brass-accent hover:text-brass-dark flex items-center gap-0.5 transition-colors"
                  >
                    <span>See details</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>

                <p className="text-[12px] text-[#554E42] mt-1 leading-[1.5] m-0 font-normal">
                  {amenity.blurb}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {amenity.chips.map((chip, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-[#F6F1E9] border border-[#EDE6DB] text-[#4A453C] rounded-lg px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <ChipIcon type={chip.icon} />
                      <span>{chip.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visitor Access & Concierge Hours Notice */}
        <div className="mx-5 my-3.5 p-4 rounded-[20px] bg-[#F1ECE1] border border-[#E4DBD0] flex items-start gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#8A6A3C] flex-none shadow-xs mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <div className="text-[12.5px] font-bold text-ink">
              Visitor Access &amp; Concierge Hours
            </div>
            <div className="text-[11.5px] text-[#554E42] mt-0.5 leading-[1.5]">
              Visitor hours 07:00 AM – 09:00 PM · Prior digital pass or concierge appointment required for amenity tours.
            </div>
          </div>
        </div>

        {/* Today at the Club Event Highlight & Member Footer */}
        {club.todayHighlight && (
          <div className="px-5 mt-3.5 mb-2">
            <Link
              href={`/club/${club.slug}/events`}
              className="group block p-4.5 bg-white border border-[#EAE4D8] rounded-[20px] shadow-[0_2px_12px_rgba(28,27,25,0.03)] hover:shadow-card hover:border-[#DFD7C9] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase">
                    {club.todayHighlight.badge ? club.todayHighlight.badge.toUpperCase() : "TODAY AT THE CLUB"}
                  </div>
                  <div className="text-[16px] font-bold text-ink mt-0.5 group-hover:text-brass-dark transition-colors">
                    {club.todayHighlight.title}
                  </div>
                  <div className="text-[12.5px] text-[#7A7162] mt-0.5">
                    {club.todayHighlight.note}
                  </div>
                </div>

                <div className="flex-none pl-2 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8A6A3C"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform group-hover:translate-x-0.5 transition-transform"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </Link>

            <p className="text-[12px] text-[#7A7162] text-center max-w-[285px] mx-auto leading-relaxed mt-4 mb-2 font-normal">
              {copy.membersFooter}
            </p>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="flex-none px-5 py-3.5 bg-white border-t border-[#EAE4D8] shadow-[0_-4px_16px_rgba(28,27,25,0.04)] flex gap-3 z-30">
        <Link
          href={`/club/${club.slug}/membership`}
          className="flex-1 text-center py-3 rounded-full bg-white border border-[#EAE4D8] hover:bg-[#FAF7F2] text-ink font-bold text-[13px] transition-all active:scale-[0.98] shadow-xs"
        >
          View membership
        </Link>
        <Link
          href={`/club/${club.slug}/interest`}
          className="flex-1 text-center py-3 rounded-full bg-[#A58253] hover:bg-[#947345] text-white font-bold text-[13px] transition-all active:scale-[0.98] shadow-xs"
        >
          I&apos;m interested
        </Link>
      </footer>
    </>
  );
}
