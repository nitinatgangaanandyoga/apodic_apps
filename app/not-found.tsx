import Link from "next/link";
import copy from "@/data/copy/notFound.json";

export default function NotFound() {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-2">
          <div className="w-[76px] h-[76px] rounded-full bg-avatarbg flex items-center justify-center shadow-pop">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6E6656" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
          </div>

          <div className="font-serif text-[24px] font-semibold">{copy.heading}</div>

          <p className="text-[14px] leading-relaxed text-bodytext max-w-[280px] m-0">
            {copy.body}
          </p>
        </div>
      </div>

      <div className="flex-none px-5 py-3.5 bg-ivory border-t border-hairline2 shadow-bar">
        <Link
          href="/"
          className="block text-center py-3 rounded-xl bg-ink text-white text-[14px] font-semibold shadow-[0_6px_16px_-6px_rgba(28,27,25,0.35)]"
        >
          {copy.backButton}
        </Link>
      </div>
    </>
  );
}
