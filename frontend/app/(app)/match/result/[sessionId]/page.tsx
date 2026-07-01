import { apiServer } from "@/lib/apiServer";
import { redirect } from "next/navigation";
import ResultClient from "@/features/match/components/Game/ResultClient";

interface SessionResultResponse {
  status: boolean;
  sessionDetails: {
    score: number;
    correctAnswers: number;
    bestStreak: number;
  };
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

const ResultPage = async ({ params }: Props) => {
  const { sessionId } = await params;

  let initialDetails: SessionResultResponse["sessionDetails"] | null = null;

  try {
    const res = await apiServer<SessionResultResponse>("get", `/sessions/${sessionId}`);
    initialDetails = res.data.sessionDetails;
  } catch (err: unknown) {
    const axiosErr = err as {
      response?: { status?: number; data?: { message?: string } };
    };
    const status = axiosErr?.response?.status;
    const message = axiosErr?.response?.data?.message ?? "";

    if (status === 404) redirect("/match");

    if (message?.includes("under processing")) {
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

  if (initialDetails) {
    return <ResultClient details={initialDetails} />;
  }

  return <ResultClient sessionId={sessionId} poll />;
};

export default ResultPage;
