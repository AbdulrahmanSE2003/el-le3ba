"use client";

import { useState } from "react";
import { MyAlertModal } from "@/components/shared/MyAlertModal";
import StyleContainer from "@/components/shared/StyleContainer";

import Header from "./Header";
import Members from "./team-members/Members";

import { Member } from "@/shared/types/team";
import { changeCaptain, kickMember } from "../../actions";
import { showError, showSuccess } from "@/components/shared/notifications";

interface MembersListProps {
  members: Member[];
  myRole: "captain" | "member";
}

export default function MembersList({ members, myRole }: MembersListProps) {
  const [openKickModal, setOpenKickModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Trigger Kick Modal for selected member
  function handleKickClick(member: Member) {
    setSelectedMember(member);
    setOpenKickModal(true);
  }

  // Trigger Transfer Captaincy Modal for selected member
  function handleTransferClick(member: Member) {
    setSelectedMember(member);
    setOpenTransferModal(true);
  }

  // Action Handler: Execute Kick Member
  async function handleKickConfirm() {
    if (!selectedMember) return;

    const result = await kickMember(
      selectedMember.teamId,
      selectedMember.userId._id,
    );

    if (result.success) {
      showSuccess(result.message || "تم طرد العضو بنجاح");
      return true;
    }
    showError(result.error || "فشل طرد العضو");
  }

  // Action Handler: Execute Transfer Captaincy
  const handleTransferConfirm = async () => {
    if (!selectedMember) return;

    const result = await changeCaptain(
      selectedMember.teamId,
      selectedMember.userId._id,
    );

    if (result.success) {
      showSuccess(result.message || "تم نقل القيادة بنجاح");
      return true;
    }
    showError(result.error || "فشل نقل القيادة");
  };

  return (
    <StyleContainer className="p-6 md:p-8">
      {/* Header showing member count */}
      <Header membersLen={members.length} />

      {/* Grid of Team Members */}
      <Members
        myRole={myRole}
        members={members}
        onKickClick={handleKickClick}
        onTransferClick={handleTransferClick}
      />

      {/* Kick Member Confirmation Dialog */}
      <MyAlertModal
        open={openKickModal}
        onOpenChange={setOpenKickModal}
        title={`طرد ${selectedMember?.userId.name || "العضو"}؟`}
        description="هل أنت متأكد من طرد هذا العضو من الفريق؟ لن يتمكن من المشاركة في المباريات القادمة."
        confirmText="طرد"
        onConfirm={handleKickConfirm}
      />

      {/* Transfer Captain Confirmation Dialog */}
      <MyAlertModal
        open={openTransferModal}
        onOpenChange={setOpenTransferModal}
        title={`نقل القيادة إلى ${selectedMember?.userId.name || "العضو"}؟`}
        description="سيصبح هذا العضو هو كابتن الفريق وستفقد صلاحيات القيادة الحالية."
        confirmText="نقل القيادة"
        onConfirm={handleTransferConfirm}
      />
    </StyleContainer>
  );
}
