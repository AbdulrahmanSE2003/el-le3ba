import { fadeInLeft } from "@/components/shared/animations";

import { LogOut } from "lucide-react";

import { logout } from "@/features/auth/actions";

import ActionBtn from "./ActionBtn";

export default function Logout() {
  return (
    <ActionBtn
      fade={fadeInLeft}
      handleAction={logout}
      text="تسجيل الخروج"
      icon={LogOut}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    />
  );
}
