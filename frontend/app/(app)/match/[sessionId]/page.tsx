import Quiz from "@/features/match/components/Game/Quiz";
import QuizModel from "@/features/match/components/QuizModel";

const page = async () => {
  return (
    <section className={`bg-background h-screen text-foreground`}>
      <Quiz />
    </section>
  );
};

export default page;
