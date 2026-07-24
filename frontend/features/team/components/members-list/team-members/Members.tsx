"use client";

import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";

import { sortedMembers } from "../../../constants";

import MemberCard from "./card/MemberCard";

import { useState } from "react";

export default function Members() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4"
    >
      {sortedMembers.map((member) => {
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
