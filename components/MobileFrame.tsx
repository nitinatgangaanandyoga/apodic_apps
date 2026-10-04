/**
 * Every screen in this prototype was designed as a 390x844 mobile
 * screen. On an actual phone this frame is invisible (the app just
 * fills the viewport). On a wider screen it centers the app in a
 * phone-shaped column so the design reads the way it was intended,
 * without needing a separate "desktop layout".
 */
export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center sm:py-8">
      <div className="relative w-full sm:max-w-[430px] sm:rounded-[36px] sm:shadow-2xl sm:overflow-hidden bg-ivory sm:h-[880px] h-screen">
        <div className="h-full w-full flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
