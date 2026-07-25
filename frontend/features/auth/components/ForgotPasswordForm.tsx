"use client";

import { useActionState } from "react";

import { Mail } from "lucide-react";

import Input from "./Input";
import Button from "./AuthButton";
import SuccessCard from "./SuccessCard";
import Header from "./Header";
import FormWrapper from "./FormWrapper";
import RedirectLink from "./RedirectLink";
import FooterWrapper from "./FooterWrapper";

import { fadeInUp } from "../../../components/shared/animations";
import Motion from "@/components/shared/Motion";

import { forgotPassword } from "../actions";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  return (
    <Motion
      as="div"
      variants={fadeInUp}
      duration={0.3}
      className="flex flex-col gap-6"
    >
      <Header
        header="إستعادة كلمة السر"
        text="اكتب بريدك الإلكتروني وهنبعتلك لك رابط عشان تجدد كلمة السر."
      />

      {state?.success ? (
        <SuccessCard
          title="تم إرسال رابط إعادة التعيين!"
          message={
            state.message ||
            "يرجى التحقق من صندوق البريد الوارد الخاص بك واتباع التعليمات لتغيير كلمة المرور."
          }
        >
          <RedirectLink link="/login" linkTitle="العودة لتسجيل الدخول" />
        </SuccessCard>
      ) : (
        <FormWrapper action={formAction}>
          {/* Email input */}
          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            placeholder="name@example.com"
            icon={Mail}
            error={state?.error}
            defaultValue={state?.userData?.email || ""}
            disabled={isPending}
            required
          />

          <FooterWrapper>
            <Button
              type="submit"
              title="إرسال رابط التعيين"
              isLoading={isPending}
              className="mt-2"
            />

            <RedirectLink link="/login" linkTitle="العودة إلى تسجيل الدخول" />
          </FooterWrapper>
        </FormWrapper>
      )}
    </Motion>
  );
}
