import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

import UserAvatar from "@/components/shared/UserAvatar";
import MemberInfo from "./MemberInfo";
import CaptainActions from "./CaptainActions";

import { TeamMember } from "@/features/team/types";

import { Dispatch, SetStateAction } from "react";

interface Props {
  member: TeamMember;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
}

export default function MemberCard({ member, openMenu, setOpenMenu }: Props) {
  return (
    <Motion
      as="div"
      key={member._id}
      variants={fadeInUp}
      className="relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
    >
      {/* Avatar */}
      <UserAvatar
        src={"avatar1.png"}
        fallback={member.name.slice(0, 1).toUpperCase()}
        size="xl"
      />

      {/* Info */}
      <MemberInfo
        name={member.name}
        joinedDate={member.joinedAt}
        role={member.role}
      />

      {/* Captain Actions */}
      <CaptainActions
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        member={member}
      />
    </Motion>
  );
}
