import LoginForm from "@/features/auth/components/LoginForm";

export const metadata = {
  title: "تسجيل الدخول",
  description: "سجل دخولك لبدء المسابقات والترتيب والتحدي مع أصدقائك في اللعبة",
};

export default async function LoginPage() {
  const wait = await new Promise((resolve) => setTimeout(resolve, 5000)); 
  return <LoginForm />;
}

