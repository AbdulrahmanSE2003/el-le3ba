import Homepage from "@/features/dashboard/components/Homepage";
import HomepageSkeleton from "@/features/dashboard/components/HomepageSkeleton";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <section className={`py-4`}>
      <Suspense fallback={<HomepageSkeleton />}>
        <Homepage />
      </Suspense>
    </section>
  );
}
