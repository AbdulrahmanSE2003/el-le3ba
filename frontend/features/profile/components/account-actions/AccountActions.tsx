import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";

import { AlertModal } from "@/components/shared/AlertModal";

import { deleteAccount } from "../../actions";

export default function AccountActions() {
  return (
    <div className="flex flex-col gap-5">
      <Logout />

      <AlertModal
        trigger={<DeleteAccount />}
        title="متأكد إنك عايز تعمل كدا؟"
        description="تنبيه: لو الأمر دا تم مش هينفع الرجوع فيه نهائيا."
        confirmText="إكمال"
        cancelText="إلغاء"
        onConfirm={deleteAccount}
      />
    </div>
  );
}
