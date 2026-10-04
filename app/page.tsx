"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BottomTabBar from "@/components/BottomTabBar";
import { spaces, type Space, type SpaceButton } from "@/lib/mockData";
import nav from "@/data/copy/nav.json";
import copy from "@/data/copy/home.json";

console.log(spaces,"----------==--=");
// Header icon components
function ApodicLogoIcon() {
  return (
    <div className="w-[26px] h-[26px] rounded-[6px] border border-[#B08D57]/40 bg-[#F4EDE2] flex items-center justify-center shadow-xs">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A6A3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 14h6" />
        <path d="M12 7v7" />
      </svg>
    </div>
  );
}

function BellIcon({ hasNotification }: { hasNotification: boolean }) {
  return (
    <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#1C1B19] hover:bg-black/5 transition-colors cursor-pointer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      {hasNotification && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B08D57] ring-2 ring-[#FAF7F5]" />
      )}
    </div>
  );
}

function UserAvatarIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#1C1B19] text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90 transition-opacity">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

function VerifiedShieldIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6E6454" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <path d="M9 21v-7h6v7" />
    </svg>
  );
}

function QrCodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function ChatNoticeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ActionButtonIcon({ type }: { type: SpaceButton["icon"] }) {
  switch (type) {
    case "key":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="15.5" r="4.5" />
          <path d="M11 12l8-8" />
          <path d="M15 8l3 3" />
          <path d="M17 6l2 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "guest":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      );
    case "pool":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0" />
          <path d="M2 19c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0" />
          <circle cx="16" cy="5" r="2" />
          <path d="M7 8l4 2 3-2 3 3" />
        </svg>
      );
    case "intercom":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="3" />
          <circle cx="12" cy="8" r="2" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
    case "board":
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  const [activeCommunity, setActiveCommunity] = useState(nav.community || "THE BELVEDERE");
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="flex-none px-5 pt-3.5 pb-1 flex items-center justify-between bg-ivory z-20">
        <div className="flex items-center gap-2.5">
          <ApodicLogoIcon />
          <span className="text-[13px] font-bold tracking-[0.14em] text-ink uppercase">
            {nav.wordmark}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowCommunityMenu((prev) => !prev)}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFEAE0]/80 hover:bg-[#EAE4D7] border border-[#E3DBD0] text-[10px] font-semibold tracking-[0.06em] text-[#6E6454] transition-colors"
            >
              <span>{activeCommunity}</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showCommunityMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-48 rounded-xl bg-white border border-hairline shadow-lg py-1 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                {["THE BELVEDERE", "PARKLANDS PRIDE", "DISCOVERY PARK"].map((comm) => (
                  <button
                    key={comm}
                    onClick={() => {
                      setActiveCommunity(comm);
                      setShowCommunityMenu(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3.5 py-1.5 text-[11px] font-medium transition-colors ${
                      activeCommunity === comm
                        ? "bg-[#FAF7F2] text-brass-dark font-semibold"
                        : "text-[#4A453C] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    {comm}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BellIcon hasNotification={true} />
          <UserAvatarIcon />
        </div>
      </header>

      {/* Main Scrollable Dashboard */}
      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-10 scroll-smooth no-scrollbar">
        {/* Toast alert notification */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#1C1B19] text-white text-[12px] font-medium rounded-full shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {toastMessage}
          </div>
        )}

        {/* Greeting & Status Badge Row */}
        <div className="flex items-center justify-between mt-2 mb-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-[#3D5C4A] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F5C3E] inline-block" />
            <span>{copy.greeting}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFEAE0] border border-[#E3DBD0] text-[9.5px] font-bold tracking-[0.08em] text-[#6E6454] uppercase shadow-xs">
            <VerifiedShieldIcon />
            <span>{copy.statusBadge}</span>
          </div>
        </div>

        {/* Heading & Active Enclaves Count */}
        <div className="flex items-baseline justify-between mb-3.5">
          <h1 className="font-serif text-[28px] sm:text-[30px] font-semibold text-ink tracking-[-0.01em] leading-tight">
            {copy.heading}
          </h1>
          <span className="text-[10.5px] font-bold tracking-[0.08em] text-[#8A7F6E] uppercase">
            {copy.activeCount}
          </span>
        </div>

        {/* 3 Quick Stats Cards Row */}
        <div className="grid grid-cols-3 gap-2.5 mb-4.5">
          {copy.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-[16px] py-3 px-2 border border-[#EBE4D8] shadow-xs flex flex-col items-center justify-center relative"
            >
              {stat.hasAlert && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] absolute top-2 right-2" />
              )}
              <span className="font-serif text-[22px] sm:text-[24px] font-bold text-ink leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[10.5px] text-[#7A7162] font-medium mt-1 leading-tight text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Section Header: Spaces You Belong To & Manage Link */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[10px] font-bold tracking-[0.12em] text-[#8A7F6E] uppercase">
            {copy.sectionLabel} <span className="font-medium text-[#9E9484]">{copy.sectionCount}</span>
          </div>
          <button
            type="button"
            onClick={() => showToast("Opening enclave management...")}
            className="text-[10.5px] font-bold tracking-[0.08em] text-[#8A6A3C] uppercase flex items-center gap-1 hover:text-[#5B4423] transition-colors"
          >
            <span>{copy.manageLabel}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Resident Spaces Cards List */}
        <div className="flex flex-col gap-4">
          {spaces.map((space) => {
            const isPride = space.key === "pride";
            const isSanctuary = space.key === "sanctuary";

            return (
              <div
                key={space.key}
                className="group flex flex-col rounded-[22px] overflow-hidden bg-white border border-[#EAE4D8] shadow-[0_4px_20px_rgba(28,27,25,0.06)] hover:shadow-[0_8px_28px_rgba(28,27,25,0.1)] transition-all duration-300"
              >
                {/* Hero Image with Overlaid Badges and Enclave Title */}
                <div className="h-[165px] sm:h-[175px] relative w-full overflow-hidden bg-[#EAE4D8]">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    sizes="(max-width: 430px) 100vw, 430px"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={isPride}
                  />

                  {/* Gradient overlay for bottom title legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35 pointer-events-none" />

                  {/* Top-Left Resident Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {space.residentBadgeVariant === "brass" ? (
                      <div className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-semibold text-[#6E4E28] shadow-xs flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                        <span>{space.residentBadge}</span>
                      </div>
                    ) : space.residentBadgeVariant === "green" ? (
                      <div className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-semibold text-[#2D5A43] shadow-xs flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2D5A43" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a9 9 0 0 1 9 9c0 4-3 8-9 11C6 19 3 15 3 11a9 9 0 0 1 9-9z" />
                          <path d="M12 7v10" />
                        </svg>
                        <span>{space.residentBadge}</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-full text-[10px] font-semibold text-white shadow-xs flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>{space.residentBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Top-Right Quick Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (space.topRightAction === "qr") showToast("Opening pass scanner...");
                      else if (space.topRightAction === "share") showToast("Share link copied to clipboard");
                      else showToast("Opening resident notices...");
                    }}
                    aria-label="Card Action"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 z-10"
                  >
                    {space.topRightAction === "qr" && <QrCodeIcon />}
                    {space.topRightAction === "share" && <ShareIcon />}
                    {space.topRightAction === "notice" && <ChatNoticeIcon />}
                  </button>

                  {/* Bottom-Left Overlaid Space Title & Priority Tag */}
                  <div className="absolute bottom-3 left-3.5 z-10">
                    <span className="text-[9.5px] font-bold tracking-[0.14em] text-white/85 uppercase block">
                      {space.enclaveType}
                    </span>
                    <h2 className="font-serif text-[18px] sm:text-[19px] font-semibold text-white leading-tight drop-shadow-sm mt-0.5">
                      {space.name}
                    </h2>
                  </div>

                  {/* Monogram Watermark (bottom-right) */}
                  <div className="absolute right-3.5 bottom-0.5 font-serif text-[52px] font-bold text-white/20 select-none leading-none pointer-events-none drop-shadow-sm">
                    {space.initial}
                  </div>
                </div>

                {/* Card Content & Action Buttons */}
                <div className="p-3.5 pt-3 pb-3.5 flex flex-col gap-2.5">
                  {/* Location Row (clickable link to Space details) */}
                  <Link
                    href={space.href || "#"}
                    className="flex items-center justify-between py-0.5 group/loc"
                  >
                    <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#4A453C] group-hover/loc:text-ink transition-colors">
                      {isPride || isSanctuary ? <LocationPinIcon /> : <HouseIcon />}
                      <span>{space.residentLocation}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A7F6E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/loc:translate-x-0.5 transition-transform">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>

                  {/* Highlights / Active Stats Strip */}
                  <div className="bg-[#F9F6F0] border border-[#ECE5D8] rounded-[11px] px-3 py-1.5 flex items-center gap-2 text-[11px] text-[#4A453C]">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        space.key === "palmgrove" ? "bg-[#B08D57]" : "bg-[#16A34A]"
                      }`}
                    />
                    <span>{space.residentStat}</span>
                  </div>

                  {/* Action Buttons Pair */}
                  <div className="flex items-center gap-2.5 mt-0.5">
                    {space.buttons.map((btn, bIdx) => {
                      const isDark = btn.variant === "dark";

                      return (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => {
                            if (btn.label === "Digital Key Card") showToast("Access granted: Digital Key active");
                            else if (btn.label === "Book Amenity") showToast("Opening amenity booking...");
                            else if (btn.label === "Guest Access") showToast("Guest pass created for today");
                            else if (btn.label === "Pool Pass") showToast("Pool entry barcode ready");
                            else if (btn.label === "Gate Intercom") showToast("Connecting to gate guard...");
                            else showToast("Loading community board...");
                          }}
                          className={`flex-1 py-2.5 px-3 rounded-[13px] text-[12px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs ${
                            isDark
                              ? "bg-[#1C1B19] hover:bg-black text-white"
                              : "bg-[#EFEAE0] hover:bg-[#E5DFD4] text-[#1C1B19]"
                          }`}
                        >
                          <ActionButtonIcon type={btn.icon} />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Prompt Banner */}
        <Link
          href="/explore"
          className="mt-5 rounded-[20px] bg-[#EFEAE0] border border-[#E2DAD0] p-3.5 flex items-center justify-between shadow-xs hover:bg-[#EAE4D8] transition-colors block"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8A6A3C] shadow-xs flex-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-[0.14em] text-[#8A7F6E] uppercase block">
                {copy.exploreBanner.eyebrow}
              </span>
              <span className="text-[12.5px] font-bold text-[#1C1B19] block mt-0.5">
                {copy.exploreBanner.heading}
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1C1B19] shadow-xs flex-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>

        {/* Concierge Desk Helper Link */}
        <button
          type="button"
          onClick={() => showToast("Calling Front Desk concierge...")}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#7A7162] mt-3.5 mb-2 hover:text-ink transition-colors cursor-pointer text-center"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M12 2v2" />
          </svg>
          <span>{copy.frontDeskNote}</span>
        </button>
      </main>

      <BottomTabBar />
    </>
  );
}
