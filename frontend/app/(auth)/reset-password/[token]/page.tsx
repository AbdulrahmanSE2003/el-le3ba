import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export const metadata = {
  title: "إعادة تعيين كلمة المرور",
  description: "أدخل كلمة مرور جديدة لحسابك في اللعبة",
};

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
}
