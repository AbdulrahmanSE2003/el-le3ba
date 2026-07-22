import { AlertModal } from "@/components/shared/AlertModal";
import StyleContainer from "@/components/shared/StyleContainer";

import Header from "./Header";
import Members from "./team-members/Members";

export default function MembersList() {
  return (
    <StyleContainer className="p-6 md:p-8">
      <Header />

      <Members />

      {/* Kick Confirmation */}
      <AlertModal
        title={`طرد احمد؟`}
        description="هل أنت متأكد من طرد هذا العضو من الفريق؟ لن يتمكن من المشاركة في المباريات القادمة."
        confirmText="طرد"
      />

      {/* Transfer Captain Confirmation */}
      <AlertModal
        title={`نقل القيادة إلى احمد؟`}
        description="سيصبح هذا العضو هو كابتن الفريق وستفقد صلاحيات القيادة الحالية."
        confirmText="نقل القيادة"
      />
    </StyleContainer>
  );
}
