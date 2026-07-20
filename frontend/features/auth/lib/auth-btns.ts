import { Lock, Mail, User } from "lucide-react";

export const registerBtns = [
  {
    label: "الاسم الكامل",
    type: "text",
    name: "name" as const,
    placeholder: "الاسم الكامل",
    icon: User,
  },
  {
    label: "البريد الالكتروني",
    type: "email",
    name: "email" as const,
    placeholder: "البريد الالكتروني",
    icon: Mail,
  },
  {
    label: "كلمة المرور",
    type: "password",
    name: "password" as const,
    placeholder: "••••••••",
    icon: Lock,
  },
  {
    label: "تأكيد كلمة المرور",
    type: "password",
    name: "passwordConfirm" as const,
    placeholder: "••••••••",
    icon: Lock,
  },
];
