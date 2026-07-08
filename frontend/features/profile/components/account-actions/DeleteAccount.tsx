import { fadeInRight } from "@/components/shared/animations";

import { Trash2 } from "lucide-react";

import ActionBtn from "./ActionBtn";

export default function DeleteAccount() {
  return (
    <ActionBtn
      fade={fadeInRight}
      text="حذف الحساب"
      icon={Trash2}
      className="bg-destructive text-primary-foreground hover:bg-destructive/90"
    />
  );
}
