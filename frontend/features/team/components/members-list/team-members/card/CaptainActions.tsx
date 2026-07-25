import { Dispatch, SetStateAction } from "react";

import ActionBtn from "./ActionBtn";
import OpenMenu from "./OpenMenu";

import { ShieldCheck, UserMinus } from "lucide-react";
import { Member } from "@/shared/types/team";

interface Props {
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  member: Member;
  onKickClick: (member: Member) => void;
  onTransferClick: (member: Member) => void;
}

export default function CaptainActions({
  openMenu,
  setOpenMenu,
  member,
  onKickClick,
  onTransferClick,
}: Props) {
  // Do not show management actions on the captain member card itself
  if (member.role === "captain") return null;

  return (
    <div className="absolute top-3 left-3">
      <OpenMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        memberId={member._id}
      />

      {openMenu === member._id && (
        <div className="absolute left-0 mt-1 bg-popover border border-border rounded-xl shadow-lg p-1.5 z-50 w-50">
          <ActionBtn
            title="نقل القيادة"
            onClick={() => {
              setOpenMenu(null);
              onTransferClick(member);
            }}
            icon={ShieldCheck}
            color="text-blue-500"
          />

          <ActionBtn
            title="طرد العضو"
            onClick={() => {
              setOpenMenu(null);
              onKickClick(member);
            }}
            icon={UserMinus}
            color="text-red-500"
          />
        </div>
      )}
    </div>
  );
}
