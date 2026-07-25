"use client";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

import MemberCard from "./card/MemberCard";

import { useState } from "react";

import { Member } from "@/shared/types/team";

interface Props {
  myRole: "captain" | "member";
  members: Member[];
  onKickClick: (member: Member) => void;
  onTransferClick: (member: Member) => void;
}

export default function Members({
  members,
  onKickClick,
  onTransferClick,
  myRole,
}: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {members.map((member) => {
        return (
          <MemberCard
            key={member._id}
            member={member}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            onKickClick={onKickClick}
            onTransferClick={onTransferClick}
            myRole={myRole}
          />
        );
      })}
    </Motion>
  );
}
