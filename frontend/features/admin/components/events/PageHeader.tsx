"use client";

import { Season } from "../../api/events";
import CreateEventModal from "./CreateEventModal";
import CreateReport from "@/components/shared/CreateReport";



const PageHeader = ({ seasons }: { seasons:Season[] }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إدارة الأحداث</h1>
        <p className="text-sm text-muted-foreground mt-1">
          صفحة التحكم في جميع أحداث اللعبة
        </p>
      </div>
      <div className={`flex items-center gap-3`}>
        <CreateReport />
        <CreateEventModal seasons={seasons} />
      </div>
    </div>
  );
};

export default PageHeader;
