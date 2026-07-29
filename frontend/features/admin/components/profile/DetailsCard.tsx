import Error from "@/app/error";
import { formatCreatedAt } from "@/lib/utils";
import { getCurrentUser } from "@/shared/api/helpers";
import { Calendar, Mail, ShieldCheck, User } from "lucide-react";

const DetailsCard = async () => {
  const profileRes = await getCurrentUser();
  if (!profileRes.success) return <Error />;

  const profile = profileRes.data.userData;
  return (
    <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between gap-y-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-2 border border-border py-1.5 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="size-4" />
            الاسم
          </span>
          <p className="text-sm font-semibold">{profile.name}</p>
        </div>

        <div className="space-y-2 border border-border py-1.5 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Mail className="size-4" />
            البريد الإلكتروني
          </span>
          <p className="text-sm font-semibold">{profile.email}</p>
        </div>

        <div className="space-y-2 border border-border py-1.5 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4" />
            الدور
          </span>
          <p className="text-sm">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize">
              {profile.role}{" "}
            </span>
          </p>
        </div>

        <div className="space-y-2 border border-border py-1.5 p-3 rounded-md shadow">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-4" />
            تاريخ إنشاء الحساب
          </span>
          <p className="text-sm font-semibold">
            {formatCreatedAt(profile.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
