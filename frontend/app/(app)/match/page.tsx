import LobbySkeleton from "@/features/match/components/LobbySkeleton";
import LobbyWrapper from "@/features/match/components/LobbyWrapper";
import { Suspense } from "react";

const page = async () => {
  return (
    <section className="h-full">
      <div className="container mx-auto w-full md:w-1/2 p-4 space-y-6">
        <Suspense fallback={<LobbySkeleton />}>
          <LobbyWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
