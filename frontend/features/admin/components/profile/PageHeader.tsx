import { Button } from "@/components/ui/button";
import { Edit, User } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">الملف الشخصي</h1>
        </div>
        <p className="text-xs text-muted-foreground">
          إدارة بيانات الحساب والإعدادات الشخصية
        </p>
      </div>
      {/* <Button variant="outline" size="sm" className="gap-2">
        <Edit className="h-4 w-4" />
        تعديل
      </Button> */}
    </div>
  );
};

export default PageHeader;
