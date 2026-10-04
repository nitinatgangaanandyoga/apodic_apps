"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-0.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7162" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function PassIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="2" />
      <line x1="15" y1="9" x2="19" y2="9" />
      <line x1="15" y1="13" x2="18" y2="13" />
    </svg>
  );
}

function ConciergeBellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 16v-2a6 6 0 0 0-12 0v2" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <line x1="2" y1="19" x2="22" y2="19" />
      <circle cx="12" cy="5" r="1" />
    </svg>
  );
}

function UserAvatarIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#1C1B19] text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90 transition-opacity">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

function ShieldKeyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function ClubMembershipPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }

  const [billingTenure, setBillingTenure] = useState<"annual" | "multi">("annual");

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-2 flex items-center justify-between bg-ivory z-20">
        <BackButton
          fallbackHref={`/club/${club.slug}`}
          ariaLabel="Back to club"
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
        />

        {/* Center Pill / Title */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#EBE4D8] rounded-full shadow-xs">
          <div className="w-5 h-5 rounded-full bg-[#FAF5EB] border border-[#E8DEC9] flex items-center justify-center text-[#8A6A3C] font-serif font-bold text-[11px]">
            A
          </div>
          <span className="text-[12.5px] font-serif font-bold text-ink">
            Membership Plans
          </span>
          <button type="button" aria-label="Info" className="text-[#8A7F6E] hover:text-ink transition-colors ml-0.5">
            <InfoIcon />
          </button>
        </div>

        {/* User Profile */}
        <UserAvatarIcon />
      </header>

      {/* Main Scrollable Body */}
      <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar pb-6 px-5 pt-1">
        {/* Enclave Membership Hero Banner */}
        <div className="rounded-[22px] bg-gradient-to-b from-[#F2ECE0] via-[#EAE1D2] to-[#DFD6C5] border border-[#DCD3C3] p-4.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>PRIVATE ENCLAVE MEMBERSHIP</span>
          </div>

          <h1 className="font-serif text-[26px] font-bold text-ink leading-tight mt-1">
            Membership Tiers
          </h1>

          <div className="flex items-center gap-1 text-[11px] text-[#7A7162] mt-1 font-medium">
            <LocationPinIcon />
            <span>{club.name} · Sector 77–78, Faridabad</span>
          </div>

          <p className="text-[12.5px] text-[#554E42] mt-2 leading-[1.5] m-0 font-normal">
            Privileged year-round access to the grand banquet suites, floodlit sports park, wellness lawns, and curated resident community events.
          </p>

          {/* Tenure Toggle Selector */}
          <div className="bg-[#DFD6C5]/70 p-1 rounded-full flex items-center max-w-[340px] mx-auto mt-4 border border-[#D5CBBA]">
            <button
              type="button"
              onClick={() => setBillingTenure("annual")}
              className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                billingTenure === "annual"
                  ? "bg-white text-ink shadow-xs"
                  : "text-[#7A7162] hover:text-ink"
              }`}
            >
              <span>Annual Tenure</span>
              <span className="bg-[#F7E7CE] text-[#8C5D1F] px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider">
                SAVINGS
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingTenure("multi")}
              className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-medium transition-all ${
                billingTenure === "multi"
                  ? "bg-white text-ink shadow-xs font-bold"
                  : "text-[#7A7162] hover:text-ink"
              }`}
            >
              Multi-Year Patron
            </button>
          </div>
        </div>

        {/* Plan 1: Individual Plan */}
        <div className="bg-white rounded-[22px] border border-[#EAE4D8] p-5 shadow-xs mt-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block bg-[#F5EDE1] text-[#7A6953] px-3 py-1 rounded-full text-[10.5px] font-semibold">
                Single Member Access
              </span>
              <h2 className="font-serif text-[24px] font-bold text-ink mt-1.5 mb-0">
                Individual
              </h2>
            </div>
            <div className="text-right">
              <div className="font-serif text-[24px] font-bold text-ink leading-tight">
                ₹25,000
              </div>
              <div className="text-[11px] text-[#7A7162]">/ year</div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2.5 mt-4">
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Full access for one member across all sports and clubhouse grounds</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Sports Park &amp; Wellness Lawns included (morning &amp; floodlit sessions)</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>10% privilege discount on grand banquet hall bookings</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Complimentary locker access &amp; equipment concierge</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/club/${club.slug}/membership/checkout?plan=individual`}
            className="w-full py-3 rounded-[16px] bg-[#EBE5DA] hover:bg-[#DFD7C9] text-ink font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 mt-5 shadow-xs active:scale-[0.98]"
          >
            <span>Choose Individual</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Plan 2: Family Plan (Featured / Most Popular) */}
        <div className="bg-white rounded-[24px] border-2 border-[#B99A66] p-5 shadow-[0_8px_30px_rgba(185,154,102,0.12)] mt-4 relative overflow-hidden">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="bg-[#A27B45] text-white px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide flex items-center gap-1 shadow-2xs">
              <span>★</span>
              <span>Most popular</span>
            </div>
            <div className="text-[#8A6A3C] font-bold text-[10px] tracking-[0.12em] uppercase">
              PRIORITY PRIVILEGES
            </div>
          </div>

          {/* Title & Price Row */}
          <div className="flex items-start justify-between mt-2.5">
            <div>
              <h2 className="font-serif text-[24px] font-bold text-ink mb-0">
                Family
              </h2>
              <div className="text-[11.5px] text-[#7A7162] mt-0.5 font-normal">
                Primary Resident &amp; Household
              </div>
            </div>
            <div className="text-right">
              <div className="font-serif text-[24px] font-bold text-ink leading-tight">
                ₹40,000
              </div>
              <div className="text-[11px] text-[#7A7162]">/ year</div>
            </div>
          </div>

          {/* Illuminated Metallic Membership Card Graphic */}
          <div className="rounded-[16px] bg-gradient-to-r from-[#DFD7CB] via-[#F4EFE6] to-[#D5CCBE] border border-[#C5BBAA] p-3.5 my-3.5 relative overflow-hidden shadow-sm">
            <div className="font-serif text-[15px] font-bold text-ink">
              ₹40,000 <span className="text-[11px] font-normal text-[#6E6556]">/ year</span>
            </div>
            <div className="text-[11px] text-[#554E42] mt-1 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8A6A3C]">✓</span>
                <span>Up to 4 family members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#8A6A3C]">✓</span>
                <span>Everything in Individual</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-white/70 border border-[#D2C8B8] text-[10px] font-semibold text-ink">
              <span>👥</span>
              <span>Includes 4 Family Memberships</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2.5 mt-3.5">
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Up to 4 family members included with individual digital keycards</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Everything included in Individual membership</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>2 free guest passes every month for sports park &amp; wellness events</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Priority reservations for community cricket leagues and dining</span>
            </div>
          </div>

          {/* Family CTA */}
          <Link
            href={`/club/${club.slug}/membership/checkout?plan=family`}
            className="w-full py-3.5 rounded-[16px] bg-[#A27B45] hover:bg-[#8F6C3A] text-white font-bold text-[13px] transition-all flex items-center justify-center gap-2 mt-5 shadow-sm active:scale-[0.98]"
          >
            <span>Choose Family</span>
            <ShieldKeyIcon />
          </Link>
        </div>

        {/* Plan 3: Corporate Plan */}
        <div className="bg-white rounded-[22px] border border-[#EAE4D8] p-5 shadow-xs mt-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block bg-[#F5EDE1] text-[#7A6953] px-3 py-1 rounded-full text-[10px] font-semibold">
                Bespoke Executive Enclave Access
              </span>
              <h2 className="font-serif text-[24px] font-bold text-ink mt-1.5 mb-0">
                Corporate
              </h2>
            </div>
            <div className="text-right">
              <div className="font-serif text-[20px] font-bold text-[#A27B45] leading-tight">
                Custom
              </div>
              <div className="text-[11px] text-[#7A7162] leading-tight mt-0.5">
                pricing for teams
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2.5 mt-4">
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Bulk seats with flexible quarterly or annual billing</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Dedicated club account manager &amp; VIP concierge assistance</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12.5px] text-[#4A4338] leading-[1.4]">
              <CheckCircleIcon />
              <span>Exclusive corporate banquet &amp; boardroom hosting privileges</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/club/${club.slug}/interest`}
            className="w-full py-3 rounded-[16px] bg-[#EBE5DA] hover:bg-[#DFD7C9] text-ink font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 mt-5 shadow-xs active:scale-[0.98]"
          >
            <span>Talk to us</span>
            <PhoneIcon />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="bg-[#F8F4EC] rounded-[18px] border border-[#ECE5D8] p-3.5 mt-5 grid grid-cols-3 gap-2 text-center shadow-2xs">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8A6A3C] shadow-2xs">
              <LockIcon />
            </div>
            <span className="text-[10px] text-[#6E6556] mt-1.5 font-medium leading-tight max-w-[85px]">
              256-bit encrypted checkout
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8A6A3C] shadow-2xs">
              <PassIcon />
            </div>
            <span className="text-[10px] text-[#6E6556] mt-1.5 font-medium leading-tight max-w-[85px]">
              Immediate digital pass issue
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8A6A3C] shadow-2xs">
              <ConciergeBellIcon />
            </div>
            <span className="text-[10px] text-[#6E6556] mt-1.5 font-medium leading-tight max-w-[85px]">
              Dedicated club concierge
            </span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-[#8A7F6E] text-center mt-3 mb-2 max-w-[320px] mx-auto leading-relaxed font-normal">
          Prices include taxes. Renews annually; cancel any time before renewal.
        </p>

        {/* Not Ready Yet CTA Card */}
        <Link
          href={`/club/${club.slug}/interest`}
          className="bg-[#F1ECE1] hover:bg-[#EAE3D7] rounded-[22px] border border-[#E3DBD0] p-4 text-center my-3 transition-all flex items-center justify-between group shadow-xs"
        >
          <span className="flex-1 text-center font-bold text-[12.5px] text-[#5C5243] group-hover:text-ink transition-colors">
            Not ready yet? Just tell us you&apos;re interested
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8A6A3C"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:translate-x-1 transition-transform flex-none ml-2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </main>
    </>
  );
}
