"use client";

import { useActionState, useEffect } from "react";
import { Lock } from "lucide-react";

import Input from "./Input";
import AuthButton from "./AuthButton";
import Header from "./Header";
import FormWrapper from "./FormWrapper";
import FooterWrapper from "./FooterWrapper";
import RedirectLink from "./RedirectLink";

import { fadeInUp } from "../animations";
import Motion from "@/components/shared/Motion";

import { resetPassword } from "../actions";
import { showError } from "@/components/shared/notifications";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, formAction, isPending] = useActionState(
    resetPasswordWithToken,
    null,
  );

  useEffect(() => {
    if (state?.error) {
      showError(state.error);
    }
  }, [state]);

  return (
    <Motion
      as="div"
      variants={fadeInUp}
      duration={0.3}
      className="flex flex-col gap-6"
    >
      <Header
        header="إعادة تعيين كلمة السر"
        text="اكتب كلمة السر الجديدة لتأمين حسابك."
      />

      <FormWrapper action={formAction}>
        {/* Password input */}
        <Input
          label="كلمة السر الجديدة"
          type="password"
          name="password"
          placeholder="••••••••"
          icon={Lock}
          disabled={isPending}
          required
        />

        {/* Password Confirmation input */}
        <Input
          label="تأكيد كلمة السر الجديدة"
          type="password"
          name="passwordConfirm"
          placeholder="••••••••"
          icon={Lock}
          disabled={isPending}
          required
        />

        <FooterWrapper>
          <AuthButton
            type="submit"
            title="تحديث كلمة السر"
            isLoading={isPending}
            className="mt-2"
          />

          <RedirectLink link="/login" linkTitle="العودة إلى تسجيل الدخول" />
        </FooterWrapper>
      </FormWrapper>
    </Motion>
  );
}
