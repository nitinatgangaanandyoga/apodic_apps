"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";

function ShieldMiniIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UserSilhouetteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A7162" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailEnvelopeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A7162" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6A5A3D" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7162" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function LockSmallIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A7F6E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

const defaultInterestOptions = [
  { key: "banquet", label: "Banquet Hall" },
  { key: "sportspark", label: "Sports Park" },
  { key: "lawns", label: "Wellness Lawns" },
  { key: "playarea", label: "Kids' Play Area" },
  { key: "events", label: "Events" },
  { key: "pricing", label: "Membership pricing" },
  { key: "keycard", label: "Resident Keycard" },
];

export default function ClubInterestPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }

  const router = useRouter();

  // Pre-selected matching screenshot: Banquet Hall & Events
  const [selectedInterests, setSelectedInterests] = useState<Record<string, boolean>>({
    banquet: true,
    events: true,
  });

  const [notes, setNotes] = useState("");

  const toggleInterest = (key: string) => {
    setSelectedInterests((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const addQuickChip = (chipText: string) => {
    setNotes((prev) => (prev ? `${prev}, ${chipText}` : chipText));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/club/${club.slug}/interest/sent`);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-2 flex items-center justify-between bg-ivory z-20">
        <BackButton
          fallbackHref={`/club/${club.slug}`}
          ariaLabel="Back to club profile"
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
        />

        {/* Center Pill / Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#FAF5EB] border border-[#E8DEC9] flex items-center justify-center text-[#8A6A3C] font-serif font-bold text-[12px] shadow-2xs">
            A
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-ink tracking-[0.06em]">
              APODIC
            </span>
            <span className="text-[9px] font-semibold text-[#7A7162] tracking-[0.1em] uppercase -mt-0.5">
              INQUIRY FORM
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Information" className="text-[#7A7162] hover:text-ink transition-colors">
            <InfoCircleIcon />
          </button>
          <UserAvatarIcon />
        </div>
      </header>

      {/* Main Scrollable Body */}
      <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar px-5 pt-2 pb-6">
        {/* Page Title & Context */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-[#8A6A3C] uppercase">
          <ShieldMiniIcon />
          <span>MEMBERSHIP &amp; PRIVILEGES</span>
        </div>

        <h1 className="font-serif text-[26px] font-bold text-ink leading-tight mt-1 mb-0">
          I’m interested
        </h1>

        <div className="text-[11.5px] text-[#7A7162] mt-0.5 font-normal">
          {club.name} · Sector 77–78, Faridabad
        </div>

        {/* Advisor Response Commitment Card */}
        <div className="rounded-[20px] bg-[#F7F2E9] border border-[#ECE5D8] p-4 mt-3.5 shadow-2xs">
          <p className="text-[12.5px] text-[#554E42] leading-[1.5] m-0 font-normal">
            Leave your details and a membership advisor will reach out within one business day — no pressure, just answers.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E8DFCFA] text-[10.5px] font-bold text-[#7A6038] mt-3 shadow-2xs">
            <ShieldMiniIcon />
            <span>24-Hour Advisor Response • Confidential</span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3.5">
          {/* FULL NAME */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.12em] text-[#7A7162] uppercase mb-1.5">
              FULL NAME
            </label>
            <div className="rounded-[16px] bg-white border border-[#EAE4D8] px-3.5 py-3 flex items-center gap-2.5 shadow-xs focus-within:border-[#8A6A3C] transition-colors">
              <UserSilhouetteIcon />
              <input
                type="text"
                name="name"
                defaultValue="Aditya Sharma"
                placeholder="Your full name"
                required
                className="w-full bg-transparent text-[13.5px] text-ink font-medium focus:outline-hidden"
              />
            </div>
          </div>

          {/* PHONE NUMBER */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold tracking-[0.12em] text-[#7A7162] uppercase">
                PHONE NUMBER
              </label>
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#6A5A3D]">
                <ChatBubbleIcon />
                <span>WhatsApp enabled</span>
              </div>
            </div>

            <div className="rounded-[16px] bg-white border border-[#EAE4D8] px-3.5 py-3 flex items-center gap-2.5 shadow-xs focus-within:border-[#8A6A3C] transition-colors">
              <div className="flex items-center gap-1.5 flex-none pr-1">
                <span className="text-[14px]">🇮🇳</span>
                <span className="text-[13.5px] font-bold text-ink">+91</span>
              </div>
              <input
                type="tel"
                name="phone"
                defaultValue="98765 43210"
                placeholder="00000 00000"
                required
                className="w-full bg-transparent text-[13.5px] text-ink font-medium focus:outline-hidden"
              />
            </div>
            <div className="text-[11px] text-[#8A7F6E] mt-1.5 font-normal">
              Direct concierge SMS &amp; secure phone updates only
            </div>
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.12em] text-[#7A7162] uppercase mb-1.5">
              EMAIL ADDRESS
            </label>
            <div className="rounded-[16px] bg-white border border-[#EAE4D8] px-3.5 py-3 flex items-center gap-2.5 shadow-xs focus-within:border-[#8A6A3C] transition-colors">
              <MailEnvelopeIcon />
              <input
                type="email"
                name="email"
                defaultValue="aditya.sharma@domain.com"
                placeholder="you@email.com"
                required
                className="w-full bg-transparent text-[13.5px] text-ink font-medium focus:outline-hidden"
              />
            </div>
          </div>

          {/* WHAT INTERESTS YOU MOST? */}
          <div className="mt-1">
            <div className="flex items-baseline justify-between mb-2.5">
              <h2 className="font-serif text-[16.5px] font-bold text-ink m-0">
                What interests you most?
              </h2>
              <span className="text-[11px] text-[#8A7F6E] font-normal">
                Select all that apply
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {defaultInterestOptions.map((opt) => {
                const isSelected = !!selectedInterests[opt.key];
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleInterest(opt.key)}
                    className={`px-3.5 py-2 rounded-full text-[12.5px] transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 ${
                      isSelected
                        ? "bg-[#A58253] text-white font-bold shadow-xs"
                        : "bg-white text-ink font-medium border border-[#EAE4D8] hover:border-[#DFD7C9]"
                    }`}
                  >
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ANYTHING ELSE? (OPTIONAL) */}
          <div className="mt-1">
            <label className="block text-[10px] font-bold tracking-[0.12em] text-[#7A7162] uppercase mb-1.5">
              ANYTHING ELSE? (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us what brings you to the club, preferred tour times, or specific questions..."
              className="w-full rounded-[18px] bg-white border border-[#EAE4D8] p-3.5 text-[13px] text-ink placeholder:text-[#9A9184] shadow-xs focus:outline-hidden focus:border-[#8A6A3C] transition-colors resize-none"
            />

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                onClick={() => addQuickChip("Private walkthrough")}
                className="bg-[#F2ECE1] hover:bg-[#EBE3D5] text-[#554E42] text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                + Private walkthrough
              </button>
              <button
                type="button"
                onClick={() => addQuickChip("Family tier")}
                className="bg-[#F2ECE1] hover:bg-[#EBE3D5] text-[#554E42] text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                + Family tier
              </button>
              <button
                type="button"
                onClick={() => addQuickChip("Private hosting")}
                className="bg-[#F2ECE1] hover:bg-[#EBE3D5] text-[#554E42] text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                + Private hosting
              </button>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="text-center mt-3">
            <p className="text-[11.5px] text-[#7A7162] m-0 font-normal">
              We’ll only use this to help you join — no spam, ever.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-[#8A7F6E] mt-1 font-medium">
              <LockSmallIcon />
              <span>Encrypted submission • Strictly private estate advisory</span>
            </div>
          </div>

          {/* Send Interest Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-[18px] bg-[#A58253] hover:bg-[#947345] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] mt-2"
          >
            <span>Send interest</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Concierge Call Link */}
        <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#4A4338] hover:text-[#8A6A3C] transition-colors mt-3.5 mb-2 cursor-pointer">
          <PhoneIcon />
          <span>Prefer to call immediately? Dial Concierge Desk</span>
        </div>
      </main>
    </>
  );
}
