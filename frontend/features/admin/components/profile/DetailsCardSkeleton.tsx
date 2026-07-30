import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Mail, ShieldCheck, User } from "lucide-react";

export const DetailsCardSkeleton = () => {
  return (
    <div className="md:col-span-2 rounded-xl max-h-104 border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 h-full">
        {/* Name */}
        <div className="space-y-2.5 border border-border py-2 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="size-4" />
            الاسم
          </span>
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>

        {/* Email */}
        <div className="space-y-2.5 border border-border py-2 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Mail className="size-4" />
            البريد الإلكتروني
          </span>
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>

        {/* Role */}
        <div className="space-y-2.5 border border-border py-2 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4" />
            الدور
          </span>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Created At */}
        <div className="space-y-2.5 border border-border py-2 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-4" />
            تاريخ إنشاء الحساب
          </span>
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DetailsCardSkeleton;
