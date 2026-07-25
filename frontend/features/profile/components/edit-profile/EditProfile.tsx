import { UserCircle } from "lucide-react";
import { User as UserIcon } from "lucide-react";

import { fadeInUp } from "@/components/shared/animations";

import StyleContainer from "../../../../components/shared/StyleContainer";
import EditableField from "./EditableField";
import ResetPassword from "./change-password/ResetPassword";

import { UserProfileProps } from "../../types";

import { updateName } from "../../actions";
import UpdateAvatar from "./avatar/UpdateAvatar";

export default function EditProfile({ user }: UserProfileProps) {
  const { name, avatar } = user;

  return (
    <StyleContainer
      header="تعديل الحساب"
      icon={UserCircle}
      iconColor="text-primary"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-6">
        {/* Edit Avatar */}
        <UpdateAvatar avatar={avatar} />

        {/* Edit Name */}
        <EditableField
          label="الاسم"
          icon={<UserIcon className="text-primary" />}
          value={name}
          onSave={updateName}
          placeholder="ادخل اسمك الجديد"
        />

        {/* Change Password */}
        <ResetPassword />
      </div>
    </StyleContainer>
  );
}
