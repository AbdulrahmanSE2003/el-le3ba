import { Trophy, Medal } from "lucide-react";

export function LeaderboardEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl px-6 py-16 text-center">
      {/* Background Decorative Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl" 
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Icon Container with Layered Rings */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5 transition-transform duration-300 hover:scale-105">
          <Trophy className="h-10 w-10 text-primary stroke-[1.75]" />
          {/* <Sparkles className="absolute -top-1.5 -right-1.5 h-5 w-5 text-amber-500 animate-bounce" /> */}
        </div>

        {/* Text Details */}
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          لا توجد نتائج بعد
        </h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
          جدول الصدارة فارغ حالياً. كن أول فريق ينتهي من اللعبة ليتصدر القائمة!
        </p>

        {/* Action Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
          <Medal className="h-4 w-4" />
          <span>كن صاحب المركز الأول 🏆</span>
        </div>
      </div>
    </div>
  );
}