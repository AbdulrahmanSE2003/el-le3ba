"use client";

import GenericModal from "@/components/shared/GenericModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const PageHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إدارة المواسم</h1>
        <p className="text-sm text-muted-foreground mt-1">
          صفحة التحكم في جميع مواسم اللعبة
        </p>
      </div>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="gap-2 border border-accent"
      >
        <Plus className="h-4 w-4" />
        إنشاء موسم جديد
      </Button>
      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="إنشاء موسم"
        description="يمكنك من هنا إنشاء المواسم القادمة."
      >
        <div className={` `}>ss</div>
      </GenericModal>
    </div>
  );
};

export default PageHeader;
