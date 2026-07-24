"use client";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

import MemberCard from "./card/MemberCard";

import { useState } from "react";

import { Member } from "@/shared/types/team";

export default function Members({ members }: { members: Member[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4"
    >
      {members.map((member) => {
        return (
          <MemberCard
            key={member._id}
            member={member}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        );
      })}
    </Motion>
  );
}
