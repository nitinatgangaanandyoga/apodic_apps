import BackButton from "@/components/BackButton";

type Accent = "brass" | "green" | "neutral";

const accentBg: Record<Accent, string> = {
  brass: "bg-brass-light text-brass-accent",
  green: "bg-green-light text-green",
  neutral: "bg-avatarbg text-avatartext",
};

export default function BackHeader({
  href,
  title,
  subtitle,
  accent = "brass",
  right,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent?: Accent;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex-none px-5 pt-5 pb-4 border-b border-hairline">
      <div className="flex items-center gap-3">
        <BackButton
          fallbackHref={href}
          ariaLabel="Go back"
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-none ${accentBg[accent]}`}
        />
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[20px] font-semibold leading-tight">{title}</div>
          <div className="text-[12px] text-muted">{subtitle}</div>
        </div>
        {right}
      </div>
    </div>
  );
}
