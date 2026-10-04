"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";
import copy from "@/data/copy/amenity.json";

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TreePineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L5 12h4l-3 6h12l-3-6h4z" />
      <path d="M12 18v4" />
    </svg>
  );
}

function RacquetCourtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5a11 11 0 0 1 13 13" />
      <path d="M18.5 5.5a11 11 0 0 0-13 13" />
    </svg>
  );
}

function LightFloodIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SunMorningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonEveningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#88B79F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ClockWrenchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CricketSeamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5c4 4 4 9 0 13" />
      <path d="M18.5 5.5c-4 4-4 9 0 13" />
      <line x1="8" y1="8" x2="10" y2="10" />
      <line x1="7" y1="12" x2="10" y2="12" />
      <line x1="8" y1="16" x2="10" y2="14" />
    </svg>
  );
}

function ArenaFloodlightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v13M5 16h14M8 16l-3 5M16 16l3 5" />
      <rect x="7" y="3" width="10" height="6" rx="2" />
      <line x1="9" y1="9" x2="7" y2="13" />
      <line x1="15" y1="9" x2="17" y2="13" />
    </svg>
  );
}

function RunnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M7 21l3-5 3 2 4-5" />
      <path d="M10 11l3-2 3 2-2 4" />
      <path d="M5 14l3-3" />
    </svg>
  );
}

function HangerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a2 2 0 0 0-2 2c0 1.5 1.5 2 2 3l8 6a1 1 0 0 1-.6 1.8H4.6a1 1 0 0 1-.6-1.8l8-6" />
    </svg>
  );
}

function ShieldVerifiedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
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
    <div className="w-8 h-8 rounded-full bg-[#1C1B19] text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90 transition-opacity">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

export default function AmenityDetailPage({
  params,
}: {
  params: { clubSlug: string; amenitySlug: string };
}) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }
  const amenity = club.amenityDetails[params.amenitySlug];
  if (!amenity) {
    notFound();
  }

  const [isSaved, setIsSaved] = useState(false);
  const isSportsPark = params.amenitySlug === "sportspark";
  const isBanquet = params.amenitySlug === "banquet";

  // Pick high resolution real photo matching the amenity
  let amenityImage = "/images/pride-sports.jpg";
  if (isBanquet) {
    amenityImage = "/images/pride-banquet.jpg";
  } else if (!isSportsPark && club.slug === "sanctuary") {
    amenityImage = "/images/sanctuary-club.jpg";
  }

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-2 flex items-center justify-between bg-ivory z-20">
        <BackButton
          fallbackHref={`/club/${club.slug}`}
          ariaLabel={copy.backAriaLabel}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
        />

        {/* Center Pill / Title */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#EBE4D8] rounded-full shadow-xs">
          <div className="w-5 h-5 rounded-full bg-[#FAF5EB] border border-[#E8DEC9] flex items-center justify-center text-[#8A6A3C] font-serif font-bold text-[11px]">
            A
          </div>
          <span className="text-[12px] font-semibold text-ink truncate max-w-[130px]">
            {amenity.title || "Amenity Details"}
          </span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Share amenity"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Bookmark amenity"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
          >
            <BookmarkIcon active={isSaved} />
          </button>
          <UserAvatarIcon />
        </div>
      </header>

      {/* Main Scrollable Body */}
      <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar pb-6">
        {/* Hero Section Banner */}
        <div className="relative h-[255px] sm:h-[275px] overflow-hidden rounded-[24px] mx-5 mt-1 bg-[#EAE4D8] shadow-card">
          <Image
            src={amenityImage}
            alt={amenity.title}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
          {/* Gradients for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

          {/* Top Overlaid Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.1em] text-[#6E4E28] uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
              <span>ACTIVE ENCLAVE AMENITY</span>
            </div>

            <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10.5px] font-semibold text-ink flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B46]" />
              <span>Floodlit Facilities</span>
            </div>
          </div>

          {/* Bottom Overlaid Title & Subtitle */}
          <div className="absolute left-4 right-4 bottom-3.5 z-10">
            <div className="flex items-center gap-1 text-[11px] text-white/90 font-medium drop-shadow-sm">
              <LocationPinIcon />
              <span>{club.name} · Sector 77–78, Faridabad</span>
            </div>
            <h1 className="font-serif text-[27px] sm:text-[29px] font-bold text-white leading-tight drop-shadow-md mt-0.5">
              {amenity.title}
            </h1>
            <p className="text-[12px] text-white/90 leading-[1.4] drop-shadow-sm mt-1 max-w-[340px] m-0">
              Dedicated athletic sanctuary for private estate residents &amp; registered guests.
            </p>
          </div>
        </div>

        {/* ESTATE GROUNDS Section */}
        <div className="px-5 pt-4">
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase mb-1.5">
            ESTATE GROUNDS
          </div>
          <p className="text-[13px] leading-[1.6] text-[#554E42] m-0 font-normal">
            Courts and open lawns for cricket and badminton, open in a morning and an evening session and floodlit after dark. Designed with professional surfaces and pastoral perimeter views.
          </p>

          {/* 3 Estate Grounds Feature Pills */}
          <div className="flex flex-col items-start gap-2 mt-3.5">
            <div className="bg-[#F8F4EC] border border-[#EBE4D8] rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[12px] font-medium text-[#4A4338] shadow-2xs">
              <TreePineIcon />
              <span>12 Acres Sports Grounds</span>
            </div>
            <div className="bg-[#F8F4EC] border border-[#EBE4D8] rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[12px] font-medium text-[#4A4338] shadow-2xs">
              <RacquetCourtIcon />
              <span>Synthetic &amp; Grass Courts</span>
            </div>
            <div className="bg-[#F8F4EC] border border-[#EBE4D8] rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[12px] font-medium text-[#4A4338] shadow-2xs">
              <LightFloodIcon />
              <span>Professional Lighting</span>
            </div>
          </div>
        </div>

        {/* SESSIONS & SCHEDULE Section */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase">
              SESSIONS &amp; SCHEDULE
            </div>
            <div className="text-[11.5px] text-[#8A7F6E] font-medium">
              Two daily phases
            </div>
          </div>

          {/* Morning Session Card */}
          <div className="bg-white border border-[#EAE4D8] rounded-[20px] p-4.5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#7A7162]">
                <SunMorningIcon />
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">
                  MORNING SESSION
                </span>
              </div>
              <div className="bg-[#FDF4E6] text-[#9A6218] border border-[#F5E2C5] px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                Open to early risers
              </div>
            </div>
            <div className="font-serif text-[24px] font-bold text-ink mt-1.5 ps-2">
              6:00 – 9:00 AM
            </div>
            <p className="text-[12px] text-[#7A7162] mt-1 leading-[1.4] m-0 ps-3">
              Practice nets, personal conditioning &amp; open fitness lawns
            </p>

            {/* Decorative sunburst watermark */}
            <svg
              className="absolute -right-4 -bottom-6 w-32 h-32 text-[#8A6A3C]/[0.06] pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="50" cy="50" r="20" />
              <path d="M50 12v10M50 78v10M12 50h10M78 50h10M23 23l7 7M70 70l7 7M23 77l7-7M70 30l7-7" />
            </svg>
          </div>

          {/* Evening Session Card (Deep athletic green) */}
          <div className="bg-[#182C24] border border-[#243F34] rounded-[20px] p-4.5 shadow-md relative overflow-hidden mt-3 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#A6CDBA]">
                <MoonEveningIcon />
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">
                  EVENING SESSION
                </span>
              </div>
              <div className="bg-[#234236] text-[#A6CDBA] border border-[#2D5445] px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                High demand · Floodlit
              </div>
            </div>
            <div className="font-serif text-[24px] font-bold text-white mt-1.5">
              4:00 – 9:00 PM
            </div>
            <p className="text-[12px] text-[#A6CDBA]/85 mt-1 leading-[1.4] m-0">
              Floodlit league play, doubles matches &amp; social athletics
            </p>

            {/* Decorative floodlight watermark */}
            <svg
              className="absolute -right-5 -bottom-6 w-36 h-36 text-white/[0.04] pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="50" cy="50" r="22" strokeDasharray="4 4" />
              <path d="M50 10v12M50 78v12M10 50h12M78 50h12M22 22l8 8M70 70l8 8M22 78l8-8M70 30l8-8" />
            </svg>
          </div>

          {/* Maintenance Notice Card */}
          <div className="bg-[#F3ECE2] border border-[#E5DCD0] rounded-[16px] p-3.5 flex items-center gap-2.5 mt-2.5 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center flex-none">
              <ClockWrenchIcon />
            </div>
            <div className="text-[11.5px] text-[#6E6556] leading-[1.4]">
              Closed 9:00 AM – 4:00 PM daily for court resurfacing and turf maintenance.
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS & FACILITIES Section */}
        <div className="px-5 mt-5">
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase mb-2.5">
            HIGHLIGHTS &amp; FACILITIES
          </div>

          <div className="bg-white border border-[#EAE4D8] rounded-[22px] p-4 shadow-xs divide-y divide-[#F2EDE5]">
            {/* Item 1 */}
            <div className="pb-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#F0E8DC] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5">
                <CricketSeamIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-ink">Cricket Practice Nets</div>
                <div className="text-[12px] text-[#6E6556] mt-0.5 leading-[1.4]">
                  Automated adjustable spin &amp; pace ball projection machines with dedicated run-ups.
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="py-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#F0E8DC] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5">
                <RacquetCourtIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-ink">Racquet &amp; Hoop Arenas</div>
                <div className="text-[12px] text-[#6E6556] mt-0.5 leading-[1.4]">
                  4 international synthetic badminton courts and 2 regulation FIBA hardwood basketball courts.
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="py-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#F0E8DC] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5">
                <ArenaFloodlightIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-ink">Arena-Grade Floodlighting</div>
                <div className="text-[12px] text-[#6E6556] mt-0.5 leading-[1.4]">
                  Low-glare directional mast lights engineered specifically for evening ball tracking until 9:00 PM.
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="py-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#F0E8DC] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5">
                <RunnerIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-ink">Natural Turf Oval &amp; Tartan Track</div>
                <div className="text-[12px] text-[#6E6556] mt-0.5 leading-[1.4]">
                  Professionally maintained turf outfield paired with a 650m cushioned jogging promenade.
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="pt-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#F0E8DC] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5">
                <HangerIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-ink">Equipment Concierge &amp; Lockers</div>
                <div className="text-[12px] text-[#6E6556] mt-0.5 leading-[1.4]">
                  Complimentary tournament racquets, balls, changing suites, and chilled hydration points.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY AT THE PARK Section */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase">
              TODAY AT THE PARK
            </div>
            <Link
              href={`/club/${club.slug}/events`}
              className="text-[11.5px] text-[#8A6A3C] font-semibold flex items-center gap-0.5 hover:underline"
            >
              <span>Calendar</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>

          <Link
            href={`/club/${club.slug}/events`}
            className="group bg-[#F9F4EB] border border-[#ECE3D5] rounded-[20px] p-3.5 flex items-center gap-3.5 shadow-xs hover:border-[#DFD3C2] transition-all block"
          >
            <div className="flex items-center gap-3.5 w-full">
              <div className="w-11 h-11 rounded-[14px] bg-[#F5DEB8] flex items-center justify-center font-serif text-[16px] font-bold text-[#7A4515] flex-none shadow-2xs">
                24
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-bold text-ink group-hover:text-brass-dark transition-colors">
                  Community Twilight Cricket
                </div>
                <div className="text-[11.5px] text-[#6E6556] mt-0.5">
                  6:00 PM · Friendly match open to residents &amp; guests
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs text-ink group-hover:text-brass-dark group-hover:translate-x-0.5 transition-all flex-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Resident Access Policy Box */}
        <div className="px-5 mt-4">
          <div className="bg-white rounded-[22px] border border-[#EAE4D8] p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldVerifiedIcon />
              <span className="font-bold text-[14px] text-ink">Resident Access Policy</span>
            </div>
            <p className="text-[12px] text-[#6E6556] mt-2 leading-[1.5] m-0">
              Members book ahead via Apodic; guests are welcome when accompanied by a verified resident member. Please arrive 10 minutes prior to reserve session start.
            </p>
            <div className="pt-3 mt-3 border-t border-[#F2EDE4] flex items-center justify-between text-[11.5px]">
              <div className="flex items-center gap-1.5 text-[#6E6556]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Next available slot:</span>
                <span className="font-bold text-ink">Today, 5:30 PM</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-[#F3EDE2] text-[#8A6A3C] text-[10.5px] font-semibold border border-[#E6DDD0]">
                Courts 1 &amp; 3
              </div>
            </div>
          </div>
        </div>

        {/* Member Booking Privileges Subtext */}
        <div className="text-[11.5px] text-[#8A7F6E] text-center my-4 max-w-[310px] mx-auto leading-relaxed">
          Members enjoy complimentary booking privileges across all active amenities.
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="flex-none px-5 py-3.5 bg-white border-t border-[#EAE4D8] shadow-[0_-4px_16px_rgba(28,27,25,0.04)] flex gap-3 z-30">
        <Link
          href={`/club/${club.slug}/membership`}
          className="flex-1 py-3 text-center rounded-full bg-white border border-[#EAE4D8] text-ink font-bold text-[13px] hover:bg-[#FAF7F2] transition-all shadow-xs"
        >
          View membership
        </Link>
        <Link
          href={`/club/${club.slug}/interest`}
          className="flex-1 py-3 text-center rounded-full bg-[#1C3028] hover:bg-[#15251F] text-white font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Reserve a slot</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </footer>
    </>
  );
}
