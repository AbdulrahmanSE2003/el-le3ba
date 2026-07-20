import Quiz from "@/features/match/components/Game/Quiz";
import { serverFetch } from "@/shared/api/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface SessionDetailsResponse {
  sessionDetails: {
    score: number;
    correctAnswers: number;
    bestStreak: number;
  };
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

const page = async ({ params }: Props) => {
  const { sessionId } = await params;

  const result = await serverFetch<SessionDetailsResponse>(
    `sessions/${sessionId}`,
  );

  if (!result.success) {
    if (result.status === 404) {
      redirect("/match");
    }

    if (result.error?.includes("under processing")) {
      return (
        <section className="flex h-screen items-center justify-center bg-background text-foreground">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">الجلسة قيد المراجعة</h1>
            <p className="text-muted-foreground">يرجى التحقق لاحقًا</p>
          </div>
        </section>
      );
    }
  }

  if (result.success && result.data.sessionDetails) {
    redirect(`/match/result/${sessionId}`);
  }

  return (
    <section className="bg-background h-screen text-foreground">
      <Quiz />
    </section>
  );
};

export default page;
