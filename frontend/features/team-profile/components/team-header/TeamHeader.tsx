import { Input } from "@/components/ui/input";

import StyleContainer from "@/components/shared/StyleContainer";
import TeamIdentity from "./TeamIdentity";
import TeamRank from "./TeamRank";
import TeamActions from "./TeamActions";

import { MyAlertModal } from "@/components/shared/MyAlertModal";

export default function TeamHeader({ teamId }: { teamId: string }) {
  const renameContent = (
    <div className="py-4">
      <Input
        placeholder="اسم الفريق الجديد"
        maxLength={20}
        className="text-right rounded-xl"
      />
    </div>
  );

  const removeContent = (
    <div className="py-4 text-right text-sm text-muted-foreground">
      هل أنت متأكد من حذف الفريق بالكامل؟ هذا الإجراء سيقوم بإزالة جميع الأعضاء
      ولن تتمكن من التراجع عن هذه الخطوة.
    </div>
  );

  return (
    <StyleContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 md:p-8">
      {/* Team Identity */}
      <TeamIdentity teamId={teamId} />

      {/* Rank Standing / Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-border">
        {/* Rank Badge */}
        <TeamRank />

        {/* Action Buttons */}
        <TeamActions />
      </div>

      {/* Rename Dialog */}
      <MyAlertModal title="تعديل اسم الفريق" content={renameContent} />

      {/* Delete Dialog */}
      <MyAlertModal title="تنبيه حذف الفريق" content={removeContent} />
    </StyleContainer>
  );
}
