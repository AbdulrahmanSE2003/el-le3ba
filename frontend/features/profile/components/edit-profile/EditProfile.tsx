"use client";

import { UserCircle } from "lucide-react";
import { User as UserIcon } from "lucide-react";

import { fadeInUp } from "@/components/shared/animations";

import StyleContainer from "../StyleContainer";
import EditableField from "./EditableField";
import ResetPassword from "./ResetPassword";

import { UserProfileProps } from "../../types";
import { updateName } from "../../actions";

export default function EditProfile({ user }: UserProfileProps) {
  const { name } = user;

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
      <div className="flex flex-col">
        {/* Edit Name */}
        <EditableField
          label="الاسم"
          icon={UserIcon}
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
