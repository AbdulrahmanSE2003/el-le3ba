import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata = {
  title: "إنشاء حساب جديد",
  description: "أنشئ حساباً جديداً للانضمام وتحدي أصدقائك في اللعبة",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
