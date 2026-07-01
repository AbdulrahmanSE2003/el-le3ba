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

interface ResultPageProps {
  params: Promise<{ sessionId: string }>;
}

const ResultPage = async ({ params }: ResultPageProps) => {
  const { sessionId } = await params;
  return (
    <div className={``}>
      <ResultClient sessionId={sessionId} poll />
    </div>
  );
};

export default ResultPage;
