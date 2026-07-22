import { Skeleton } from "@/components/ui/skeleton";
import TeamDataSkeleton from "@/features/team-profile/components/TeamDataSkeleton";
import TeamContainer from "@/features/team-profile/TeamContainer";
import { Suspense } from "react";

export default async function TeamPage() {
  return (
    <section className={`max-sm:px-4 max-sm:pt-6`}>
      <Suspense
        fallback={
          <div className={`flex flex-col gap-y-6`}>
            <Skeleton className={`w-full h-44 rounded-2xl`} />
            <Skeleton className={`w-full h-52 rounded-2xl`} />
            <TeamDataSkeleton />
          </div>
        }
      >
        <TeamContainer />
      </Suspense>
    </section>
  );
}
