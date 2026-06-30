import { Lock, Mail, User } from "lucide-react";

export const registerBtns = [
  {
    label: "الاسم الكامل",
    type: "text",
    name: "name",
    placeholder: "الاسم الكامل",
    icon: User,
  },
  {
    label: "البريد الالكتروني",
    type: "email",
    name: "email",
    placeholder: "البريد الالكتروني",
    icon: Mail,
  },
  {
    label: "كلمة المرور",
    type: "password",
    name: "password",
    placeholder: "••••••••",
    icon: Lock,
  },
  {
    label: "تأكيد كلمة المرور",
    type: "password",
    name: "passwordConfirm",
    placeholder: "••••••••",
    icon: Lock,
  },
];
