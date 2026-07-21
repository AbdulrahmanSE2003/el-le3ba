"use client";

import {
  CheckCircle,
  XCircle,
  Clock,
  Flame,
  AlertTriangle,
} from "lucide-react";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";

const endReasonConfig = {
  completed: { label: "مكتملة", icon: CheckCircle, color: "text-green-500" },
  expired: { label: "انتهى الوقت", icon: Clock, color: "text-yellow-500" },
  flagged: {
    label: "مُبلَّغ عنها",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  abandoned: {
    label: "تم التخلي",
    icon: XCircle,
    color: "text-muted-foreground",
  },
};

export default function MatchHistoryList() {
  const sessions = [
    {
      _id: 1,
      eventId: {
        _id: 1,
        title: `إيفنت trivia الكلية الجولة 1 🏆`,
      },
      finalScore: 100,
      correctAnswers: 10,
      totalQuestions: 15,
      bestStreak: 8,
      endReason: "completed" as any,
      completedAt: new Date().toISOString(),
    },
    {
      _id: 2,
      eventId: {
        _id: 2,
        title: `إيفنت trivia الكلية الجولة 1 🏆`,
      },
      finalScore: 100,
      correctAnswers: 10,
      totalQuestions: 15,
      bestStreak: 8,
      endReason: "completed" as any,
      completedAt: new Date().toISOString(),
    },
    {
      _id: 3,
      eventId: {
        _id: 3,
        title: `إيفنت trivia الكلية الجولة 1 🏆`,
      },
      finalScore: 100,
      correctAnswers: 10,
      totalQuestions: 15,
      bestStreak: 8,
      endReason: "completed" as any,
      completedAt: new Date().toISOString(),
    },
    {
      _id: 4,
      eventId: {
        _id: 4,
        title: `إيفنت trivia الكلية الجولة 1 🏆`,
      },
      finalScore: 100,
      correctAnswers: 10,
      totalQuestions: 15,
      bestStreak: 8,
      endReason: "completed" as any,
      completedAt: new Date().toISOString(),
    },
  ];

  if (sessions.length === 0) {
    return (
      <StyleContainer className="p-8 text-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="text-4xl">🏟️</span>
          <p className="text-sm font-medium">لا توجد مباريات مسجلة بعد</p>
          <p className="text-xs">ستظهر هنا نتائج المباريات بعد إكمالها</p>
        </div>
      </StyleContainer>
    );
  }

  return (
    <StyleContainer className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
        🏟️ سجل المباريات
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {sessions.length} مباراة
        </span>
      </h2>

      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {sessions.map((session) => {
          const config = endReasonConfig["completed"];
          const StatusIcon = config.icon;
          const accuracyPercent =
            session.totalQuestions > 0
              ? Math.round(
                  (session.correctAnswers / session.totalQuestions) * 100,
                )
              : 0;

          const completedDate = new Date(
            session.completedAt,
          ).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Motion
              as="div"
              key={session._id}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
            >
              {/* Left: Event info + status */}
              <div className="flex items-start gap-3 min-w-0">
                <div className={`mt-1 shrink-0 ${config.color}`}>
                  <StatusIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {session.eventId.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{completedDate}</span>
                    <span>•</span>
                    <span className={config.color}>{config.label}</span>
                  </div>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="flex items-center gap-4 sm:gap-6 text-sm shrink-0">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">النتيجة</p>
                  <p className="font-black text-foreground text-base">
                    {session.finalScore}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">الدقة</p>
                  <p className="font-bold text-foreground">
                    {accuracyPercent}%
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <p className="text-xs text-muted-foreground">ستريك</p>
                  <p className="font-bold text-orange-500 flex items-center gap-0.5">
                    <Flame className="w-3.5 h-3.5" />
                    {session.bestStreak}
                  </p>
                </div>
              </div>
            </Motion>
          );
        })}
      </Motion>

      {/* Load More */}
      {true && (
        <div className="mt-5 text-center">
          <button className="px-6 py-2.5 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition disabled:opacity-50">
            عرض المزيد
          </button>
        </div>
      )}
    </StyleContainer>
  );
}
