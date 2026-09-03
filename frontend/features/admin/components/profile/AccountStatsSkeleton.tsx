import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

export const AccountStatsSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">إحصائيات الحساب</h2>
      </div>

      <Separator className="bg-border" />

      {/* Stats Cards Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg bg-muted/50 p-4 border border-border space-y-2 text-right"
          >
            <Skeleton className="h-3.5 w-24 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountStatsSkeleton;
