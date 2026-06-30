import StartMatch from "@/features/match/components/StartMatch";
const page = () => {
  return (
    <section
      className={`bg-foreground min-h-screen dark:bg-background flex justify-center items-center text-background dark:text-foreground`}
    >
      <StartMatch />
    </section>
  );
};

export default page;
