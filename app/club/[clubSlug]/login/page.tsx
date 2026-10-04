"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { clubs } from "@/lib/mockData";
import BackButton from "@/components/BackButton";

function ShieldCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
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

function ConciergeHouseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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

export default function ClubLoginPage({ params }: { params: { clubSlug: string } }) {
  const club = clubs[params.clubSlug];
  if (!club) {
    notFound();
  }

  const router = useRouter();
  const [phone, setPhone] = useState("90000 04213");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/club/${club.slug}/login/verify`);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-2 flex items-center justify-between bg-ivory z-20">
        <BackButton
          fallbackHref={`/club/${club.slug}`}
          ariaLabel="Back to club"
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#EAE4D8] flex items-center justify-center text-ink shadow-xs transition-transform active:scale-90"
        />

        {/* Center Logo & Title */}
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
        {/* Verification Hero Card */}
        <div className="rounded-[24px] bg-[#FAF5EE] border border-[#ECE5D8] p-5 shadow-xs relative overflow-hidden text-center">
          {/* Emblem with Shield Badge */}
          <div className="w-16 h-16 rounded-full bg-[#EAE2D4] border border-[#DDD3C2] flex items-center justify-center mx-auto shadow-xs relative">
            <div className="text-[#8A6A3C] font-serif font-bold text-[24px]">
              A
            </div>
            <div className="w-6 h-6 rounded-full bg-[#9E7B4C] text-white flex items-center justify-center absolute -right-1 -bottom-1 shadow-xs border-2 border-white">
              <ShieldCheckIcon />
            </div>
          </div>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDE2] text-[#8A6A3C] text-[10px] font-bold tracking-[0.12em] uppercase mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>PRIVATE ENCLAVE VERIFICATION</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-[24px] font-bold text-ink leading-tight mt-2.5 mb-0">
            Verify your phone to join {club.name}
          </h1>

          {/* Subtitle */}
          <p className="text-[12.5px] text-[#554E42] mt-2 max-w-[320px] mx-auto leading-relaxed font-normal">
            We’ll text a secure one-time passcode. New to Apodic? This effortlessly establishes your resident profile.
          </p>

          {/* Faint Watermark A */}
          <span className="absolute -right-3 -bottom-5 font-serif text-[90px] font-bold text-[#8A6A3C]/[0.08] pointer-events-none select-none">
            A
          </span>
        </div>

        {/* Mobile Number Input Card */}
        <div className="bg-white rounded-[22px] border border-[#EAE4D8] p-4.5 shadow-xs mt-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold tracking-[0.12em] text-[#7A7162] uppercase">
                MOBILE NUMBER
              </label>
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#8A6A3C]">
                <ChatBubbleIcon />
                <span>SMS or WhatsApp</span>
              </div>
            </div>

            {/* Input Row */}
            <div className="rounded-[16px] bg-[#F7F2E9] border border-[#EBE4D8] p-2 flex items-center gap-2 mt-1.5">
              {/* Country Code Pill */}
              <div className="bg-white/90 border border-[#E5DDD0] rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 flex-none shadow-2xs">
                <span className="text-[13px]">🇮🇳</span>
                <span className="font-bold text-[13px] text-ink">+91</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-[#7A7162]">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="00000 00000"
                required
                className="w-full bg-transparent text-[14.5px] font-semibold text-ink tracking-wide pl-1 focus:outline-hidden"
              />

              {/* Verified Check Icon */}
              <div className="flex-none pr-1 text-[#9E7B4C]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2.5 2.5L16 9" />
                </svg>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-[16px] bg-[#161513] hover:bg-black text-white font-bold text-[12.5px] tracking-wider uppercase flex items-center justify-center gap-2 mt-3.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>SEND VERIFICATION CODE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Encryption Trust Subtext */}
            <div className="text-[10.5px] text-[#8A7F6E] flex items-center justify-center gap-1.5 mt-3 font-medium">
              <LockSmallIcon />
              <span>256-bit resident encryption · Instant dispatch</span>
            </div>
          </form>
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-4.5">
          <div className="flex-1 h-px bg-[#E8E1D5]" />
          <span className="text-[10px] font-bold tracking-[0.14em] text-[#8A7F6E] uppercase">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-[#E8E1D5]" />
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={() => router.push(`/club/${club.slug}/login/verify`)}
          className="w-full py-3.5 px-4 rounded-[18px] bg-white border border-[#EAE4D8] shadow-xs flex items-center justify-center gap-2.5 hover:bg-[#FAF7F2] transition-all active:scale-[0.98] cursor-pointer"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" className="flex-none">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.44.36-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
          <span className="font-bold text-[13.5px] text-ink">
            Continue with Google
          </span>
        </button>

        {/* Curated Resident Access Card */}
        <div className="bg-[#F2ECE1] rounded-[20px] border border-[#E5DDD0] p-4.5 mt-4 text-left shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#E0D8CB] flex items-center justify-center text-[#8A6A3C] flex-none mt-0.5 shadow-2xs">
            <ShieldCheckIcon />
          </div>
          <div>
            <div className="font-bold text-[14px] text-ink">
              Curated Resident Access
            </div>
            <div className="text-[12px] text-[#554E42] mt-1 leading-[1.5]">
              Members enjoy private dining salons, automated amenity reservations, and discreet estate privileges.
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-[#7A7162] text-center mt-4.5 leading-normal font-normal">
          By continuing, you agree to Apodic’s{" "}
          <Link href="#" className="underline text-ink font-semibold">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline text-ink font-semibold">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Enclave Concierge Help Link */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#4A4338] hover:text-[#8A6A3C] transition-colors mt-3 mb-4 cursor-pointer">
          <ConciergeHouseIcon />
          <span>Need help? Contact Enclave Concierge</span>
        </div>
      </main>
    </>
  );
}
