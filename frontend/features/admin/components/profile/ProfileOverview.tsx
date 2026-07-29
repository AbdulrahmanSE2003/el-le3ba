import { User, Mail, ShieldCheck, Calendar, Key, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ProfileOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Change Password Form */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-y-2 justify-between md:col-span-3">
        <div className={`flex flex-col gap-y-4`}>
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold">تغيير كلمة المرور</h2>
          </div>
          <Separator className="bg-border" />
        </div>
        <form
          className="flex flex-col gap-y-6 max-w-2xl"
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              كلمة المرور الحالية
            </label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background"
              />
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 h-full">
            <Button size={"lg"} className={`mt-auto gap-2`} type="submit">
              <Key className="h-4 w-4" />
              تغيير كلمة المرور
            </Button>
          </div>
        </form>
      </div>

      {/* Details Card */}
      <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between gap-y-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-1 border border-border py-1.5 p-3 rounded-md shadow">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <User className="size-4" />
              الاسم
            </span>
            <p className="text-sm font-semibold">عبدالرحمن السيد</p>
          </div>

          <div className="space-y-1 border border-border py-1.5 p-3 rounded-md shadow">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Mail className="size-4" />
              البريد الإلكتروني
            </span>
            <p className="text-sm font-semibold">admin@el-le3ba.com</p>
          </div>

          <div className="space-y-1 border border-border py-1.5 p-3 rounded-md shadow">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-4" />
              الدور
            </span>
            <p className="text-sm">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Admin
              </span>
            </p>
          </div>

          <div className="space-y-1 border border-border py-1.5 p-3 rounded-md shadow">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-4" />
              تاريخ إنشاء الحساب
            </span>
            <p className="text-sm font-semibold">24 Jul 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
