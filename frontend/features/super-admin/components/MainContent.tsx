import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import QuickActions from "./QuickActions";
import RecentAdminLogs from "./RecentAdminLogs";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import RecentAdminLogsSkeleton from "./RecentAdminLogsSkeleton";

const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Admin Activity */}
      <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm space-y-4">
        <div>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-base font-semibold">نشاط المسؤولين الأخير</h2>
            <Button
              variant="link"
              size="sm"
              className="gap-1.5 text-xs"
              asChild
            >
              <Link href={"/super-admin/logs"}>
                عرض الكل
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          </div>
          <Separator className="bg-border" />
        </div>

        <Suspense fallback={<RecentAdminLogsSkeleton />}>
          <RecentAdminLogs />
        </Suspense>
      </div>

      {/* Quick Actions Panel */}
      <QuickActions />
    </div>
  );
};

export default MainContent;
