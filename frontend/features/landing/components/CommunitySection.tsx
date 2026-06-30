"use client";

type BadgeItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  bgClass: string;
  textClass: string;
  icon: string;
};

const badges: BadgeItem[] = [
  {
    id: "ranked",
    titleEn: "Ranked",
    titleAr: "المصنف",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    textClass: "text-blue-500",
    icon: "🎮",
  },
  {
    id: "leaderboard",
    titleEn: "Leaderboard",
    titleAr: "المتصدرين",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-500",
    icon: "🏆",
  },
  {
    id: "speed",
    titleEn: "Speed",
    titleAr: "السرعة",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-500",
    icon: "⚡",
  },
  {
    id: "streak",
    titleEn: "Streak",
    titleAr: "التوالي",
    bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    textClass: "text-rose-500",
    icon: "🔥",
  },
  {
    id: "risk",
    titleEn: "Risk",
    titleAr: "المخاطرة",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    textClass: "text-purple-500",
    icon: "🎲",
  },
  {
    id: "accuracy",
    titleEn: "Accuracy",
    titleAr: "الدقة",
    bgClass: "bg-orange-500/10 dark:bg-orange-500/20",
    textClass: "text-orange-500",
    icon: "🎯",
  },
  {
    id: "team",
    titleEn: "Team",
    titleAr: "الفرق",
    bgClass: "bg-cyan-500/10 dark:bg-cyan-500/20",
    textClass: "text-cyan-500",
    icon: "👥",
  },
  {
    id: "puzzle",
    titleEn: "Puzzle",
    titleAr: "الألغاز",
    bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
    textClass: "text-indigo-500",
    icon: "🧩",
  },
];

export function CommunitySection() {
  return (
    <section className="py-20 bg-secondary text-foreground overflow-hidden border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Main Title*/}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-foreground">
            مجتمع تنافسي وحيوي
          </h2>
          <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed">
            نظام الأوسمة والليدربورد بيخليك دائماً متحمس تطور من نفسك وتنافس
            الفرق الثانية.
          </p>
        </div>

        {/* ── Infinite Marquee ── */}
        <div className="relative w-full max-w-5xl mx-auto mb-16 p-1 rounded-3xl bg-card border border-border/60 shadow-xl shadow-primary/5 overflow-hidden">
          {/*  (Fading Effect)  */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          <div className="relative py-6 overflow-hidden flex">
            <div className="flex gap-10 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {/* Group 1 */}
              <div className="flex gap-10 items-center shrink-0">
                {badges.map((badge) => (
                  <div
                    key={`m1-${badge.id}`}
                    className="flex flex-col items-center space-y-2 w-20"
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl ${badge.bgClass} flex items-center justify-center text-xl shadow-sm border border-border/10`}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {badge.titleEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Group 2 */}
              <div className="flex gap-12 items-center shrink-0">
                {badges.map((badge) => (
                  <div
                    key={`m2-${badge.id}`}
                    className="flex flex-col items-center space-y-2 w-20"
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl ${badge.bgClass} flex items-center justify-center text-xl shadow-sm border border-border/10`}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {badge.titleEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badge fixed*/}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto pt-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-110 cursor-pointer min-w-[70px]"
            >
              <div
                className={`h-14 w-14 rounded-full ${badge.bgClass} border border-border/40 flex items-center justify-center text-2xl shadow-md shadow-black/5`}
              >
                {badge.icon}
              </div>
              <div className="text-center">
                <span className="block text-xs font-black text-foreground mb-0.5">
                  {badge.titleAr}
                </span>
                <span className="block text-[12px] font-medium text-muted-foreground">
                  {badge.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
