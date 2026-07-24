import ResultClient from "@/features/match/components/Game/ResultClient";

interface ResultPageProps {
  params: Promise<{ sessionId: string }>;
}

const ResultPage = async ({ params }: ResultPageProps) => {
  const { sessionId } = await params;
  return (
    <div>
      <ResultClient sessionId={sessionId} poll />
    </div>
  );
};

export default ResultPage;
