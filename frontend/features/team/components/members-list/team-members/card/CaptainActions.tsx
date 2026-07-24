import { Dispatch, SetStateAction } from "react";

import ActionBtn from "./ActionBtn";
import OpenMenu from "./OpenMenu";

import { TeamMember } from "@/features/team/types";

import { ShieldCheck, UserMinus } from "lucide-react";

interface Props {
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  member: TeamMember;
}

export default function CaptainActions({
  openMenu,
  setOpenMenu,
  member,
}: Props) {
  return (
    "captain" == "captain" && (
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
              onClick={() => setOpenMenu(null)}
              icon={ShieldCheck}
              color="text-blue-500"
            />

            <ActionBtn
              title="طرد العضو"
              onClick={() => setOpenMenu(null)}
              icon={UserMinus}
              color="text-red-500"
            />
          </div>
        )}
      </div>
    )
  );
}
