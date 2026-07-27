import { Metadata } from "next";

import PageHeader from "@/features/admin/components/PageHeader";
import { SessionsKpiCards } from "@/features/admin/components/sessions/SessionsKpiCards";
import { SessionsTableSection } from "@/features/admin/components/sessions/SessionsTableSection";
import { SessionsPagination } from "@/features/admin/components/sessions/SessionsPagination";
import { AdminSession, SessionsKpis } from "@/features/admin/types/session";

export const metadata: Metadata = {
  title: "المباريات | الإدارة",
  description: "متابعة كل المباريات الشغالة والمكتملة على المنصة.",
};

/**
 * TODO(backend): GET /admin/sessions?page&limit&status&eventId&search
 * Response: { results: number, sessions: AdminSession[] }
 * Dummy data below stands in until the endpoint above is ready — see
 * the shared wireframe doc for the full contract.
 */
async function getSessionsData(): Promise<AdminSession[]> {
  const events = [
    { _id: "evt-1", title: "بطولة الصيف" },
    { _id: "evt-2", title: "الموسم التمهيدي" },
  ];

  const teams = [
    { _id: "t-1", teamName: "الفرسان", teamCode: "FR-990" },
    { _id: "t-2", teamName: "النسور", teamCode: "NS-102" },
    { _id: "t-3", teamName: "الجبابرة", teamCode: "JB-770" },
    { _id: "t-4", teamName: "الصقور", teamCode: "SQ-504" },
    { _id: "t-5", teamName: "الأسود", teamCode: "AS-301" },
    { _id: "t-6", teamName: "الأبطال", teamCode: "AB-881" },
  ];

  const now = Date.now();
  const HOUR = 60 * 60 * 1000;

  const buildSession = (
    id: number,
    teamIdx: number,
    eventIdx: number,
    status: AdminSession["status"],
    hoursAgo: number,
    durationSeconds: number | null,
    finalScore: number,
    correctAnswers: number,
    bestStreak: number,
  ): AdminSession => {
    const startedAt = new Date(now - hoursAgo * HOUR).toISOString();
    const completedAt =
      status === "in_progress"
        ? null
        : new Date(
            now - hoursAgo * HOUR + (durationSeconds ?? 0) * 1000,
          ).toISOString();

    return {
      _id: `session-${id}`,
      teamId: teams[teamIdx],
      eventId: events[eventIdx],
      status,
      endReason: status === "in_progress" ? null : status,
      startedAt,
      completedAt,
      durationSeconds,
      finalScore,
      correctAnswers,
      totalQuestions: 15,
      bestStreak,
    };
  };

  return [
    buildSession(1, 0, 0, "in_progress", 0.05, null, 320, 6, 4),
    buildSession(2, 3, 0, "in_progress", 0.2, null, 180, 4, 3),
    buildSession(3, 1, 0, "completed", 2, 540, 1450, 14, 9),
    buildSession(4, 2, 0, "completed", 3, 480, 1200, 12, 7),
    buildSession(5, 4, 0, "abandoned", 5, 210, 320, 5, 3),
    buildSession(6, 5, 0, "completed", 6, 610, 1890, 15, 10),
    buildSession(7, 0, 1, "completed", 8, 560, 1600, 13, 8),
    buildSession(8, 1, 1, "expired", 10, 900, 90, 2, 1),
    buildSession(9, 3, 1, "completed", 12, 500, 1750, 14, 11),
    buildSession(10, 2, 1, "abandoned", 14, 150, 210, 3, 2),
    buildSession(11, 5, 1, "completed", 20, 630, 2100, 15, 12),
    buildSession(12, 4, 1, "completed", 24, 470, 980, 10, 6),
    buildSession(13, 0, 0, "completed", 30, 540, 1320, 13, 8),
    buildSession(14, 1, 0, "completed", 36, 505, 1100, 11, 7),
    buildSession(15, 2, 1, "expired", 40, 850, 60, 1, 1),
    buildSession(16, 3, 1, "completed", 48, 600, 2250, 15, 13),
  ];
}

async function getSessionsKpisData(): Promise<SessionsKpis> {
  const sessions = await getSessionsData();
  const liveNow = sessions.filter((s) => s.status === "in_progress").length;
  const today = new Date();

  const completedToday = sessions.filter(
    (s) =>
      s.status === "completed" &&
      s.completedAt &&
      new Date(s.completedAt).toDateString() === today.toDateString(),
  ).length;

  const finishedDurations = sessions
    .map((s) => s.durationSeconds)
    .filter((d): d is number => d !== null);

  const avgDurationSeconds =
    finishedDurations.length > 0
      ? Math.round(
          finishedDurations.reduce((sum, d) => sum + d, 0) /
            finishedDurations.length,
        )
      : 0;

  return {
    totalSessions: sessions.length,
    liveNow,
    completedToday,
    avgDurationSeconds,
  };
}

function getEventsOptions() {
  return [
    { _id: "evt-1", title: "بطولة الصيف" },
    { _id: "evt-2", title: "الموسم التمهيدي" },
  ];
}

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const [sessions, kpis] = await Promise.all([
    getSessionsData(),
    getSessionsKpisData(),
  ]);
  const events = getEventsOptions();

  const { page = "1", limit = "10" } = await searchParams;
  const currentPage = Number(page);
  const currentLimit = Number(limit);

  const totalResults = sessions.length;
  const totalPages = Math.ceil(totalResults / currentLimit) || 1;

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = startIndex + currentLimit;
  const paginatedSessions = sessions.slice(startIndex, endIndex);

  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      <PageHeader
        title="المباريات"
        description="متابعة كل المباريات اللي بتتلعب على المنصة، سواء شغالة دلوقتي أو خلصت."
      />

      <SessionsKpiCards kpis={kpis} />

      <div className="space-y-4">
        <SessionsTableSection
          key={currentPage || currentLimit}
          initialSessions={paginatedSessions}
          events={events}
        />

        <SessionsPagination
          page={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          limit={currentLimit}
        />
      </div>
    </div>
  );
}
