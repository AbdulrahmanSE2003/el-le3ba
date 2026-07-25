import LobbySkeleton from "@/features/match/components/lobby/LobbySkeleton";
import LobbyWrapper from "@/features/match/components/LobbyWrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  return (
    <section className="h-full">
      <div className="container mx-auto w-full  p-4 space-y-6">
        <Suspense fallback={<LobbySkeleton />}>
          <LobbyWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
