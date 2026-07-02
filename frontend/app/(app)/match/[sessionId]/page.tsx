import Quiz from "@/features/match/components/Game/Quiz";
import { apiServer } from "@/lib/apiServer";
import { redirect } from "next/navigation";

interface SessionDetailsResponse {
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

const page = async ({ params }: Props) => {
  const { sessionId } = await params;

  try {
    const res = await apiServer<SessionDetailsResponse>("get", `/sessions/${sessionId}`);
    const details = res.data?.sessionDetails;
    if (details) {
      redirect(`/match/result/${sessionId}`);
    }
  } catch (err: unknown) {
    const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
    const status = axiosErr?.response?.status;
    const message = axiosErr?.response?.data?.message ?? "";

    if (status === 404) {
      redirect("/match");
    }

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

  return (
    <section className="bg-background h-screen text-foreground">
      <Quiz />
    </section>
  );
};

export default page;
