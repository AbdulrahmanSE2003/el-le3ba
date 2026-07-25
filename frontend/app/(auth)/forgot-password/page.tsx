import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export const metadata = {
  title: "استعادة كلمة المرور",
  description: "أدخل بريدك الإلكتروني لاستعادة كلمة المرور الخاصة بك في اللعبة",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

