import { Key, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ChangePasswordForm = () => {
  return (
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
  );
};

export default ChangePasswordForm;
