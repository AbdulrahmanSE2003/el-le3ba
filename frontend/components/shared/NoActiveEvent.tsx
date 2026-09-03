import { CalendarX2, Trophy, Sparkles } from "lucide-react";

interface NoActiveEventProps {
  type: "event" | "season";
  message?: string;
}

const CONTENT = {
  event: {
    icon: CalendarX2,
    title: "لا يوجد حدث نشط حالياً",
    subtitle:
      "عند بدء الحدث ستتمكن من المشاركة ومتابعة النتائج هنا. عد لاحقاً!",
  },
  season: {
    icon: Trophy,
    title: "لا يوجد موسم نشط حالياً",
    subtitle:
      "ستظهر قائمة الترتيب فور انطلاق الموسم الجديد. تابعنا لمعرفة المواعيد القادمة.",
  },
};

export default function NoActiveEvent({
  type,
  message,
}: NoActiveEventProps) {
  const { icon: Icon, title, subtitle } = CONTENT[type];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card to-card/50 px-6 py-16 text-center shadow-sm">
      {/* Background Decorative Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto">
        {/* Icon Container with Layered Rings */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5 transition-transform duration-300 hover:scale-105">
          <Icon className="h-10 w-10 text-primary stroke-[1.75]" />
          <Sparkles className="absolute -top-1.5 -right-1.5 h-5 w-5 text-amber-500 opacity-80 animate-pulse" />
        </div>

        {/* Text Details */}
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {message ?? subtitle}
        </p>
      </div>
    </div>
  );
}