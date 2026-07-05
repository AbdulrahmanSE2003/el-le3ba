import { fadeInLeft } from "@/components/shared/animations";
import StyleContainer from "./StyleContainer";
import Motion from "@/components/shared/Motion";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/actions";

export default function Logout() {
  return (
    <Motion
      as="button"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
      className="w-full py-4 bg-destructive/10 text-destructive font-bold rounded-xl hover:bg-destructive/20 border border-destructive/20 flex items-center justify-center gap-2 cursor-pointer"
      onClick={logout}
    >
      <span>تسجيل الخروج</span>
      <LogOut />
    </Motion>
  );
}
