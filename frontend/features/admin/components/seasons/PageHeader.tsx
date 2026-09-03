"use client";

import CreateReport from "@/components/shared/CreateReport";
import CreateSeasonModal from "./CreateSeasonModal";

const PageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إدارة المواسم</h1>
        <p className="text-sm text-muted-foreground mt-1">
          صفحة التحكم في جميع مواسم اللعبة
        </p>
      </div>
      <div className={`flex items-center gap-3`}>
        <CreateReport />
        <CreateSeasonModal />
      </div>
    </div>
  );
};

export default PageHeader;
