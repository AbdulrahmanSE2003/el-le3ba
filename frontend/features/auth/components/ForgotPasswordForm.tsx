"use client";

import React, { useActionState } from "react";

import Link from "next/link";

import { Mail, ArrowRight } from "lucide-react";

import Logo from "@/features/auth/MainTitle";
import Input from "@/features/auth/Input";
import Button from "@/features/auth/AuthButton";
import Motion from "@/components/shared/Motion";
import SuccessCard from "@/components/shared/SuccessCard";
import ErrorBanner from "@/components/shared/ErrorBanner";

import { forgotPassword } from "./actions";
import { fadeInUp } from "./animations";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  return (
    <Motion
      as="div"
      variants={fadeInUp}
      duration={0.3}
      className="flex flex-col gap-6"
    >
      {/* Header section with logo */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo size="lg" />
        <h2 className="font-display font-bold text-2xl text-dark dark:text-white mt-2">
          إستعادة كلمة المرور
        </h2>
        <p className="font-body text-mid text-base">
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة مرورك.
        </p>
      </div>

      {/* Success State: Replace form completely (no redirect) */}
      {state?.success ? (
        <SuccessCard
          title="تم إرسال رابط إعادة التعيين!"
          message={
            state.message ||
            "يرجى التحقق من صندوق البريد الوارد الخاص بك واتباع التعليمات لتغيير كلمة المرور."
          }
        >
          <Link
            href="/login"
            className="w-full mt-2 h-12 inline-flex items-center justify-center gap-2 font-body font-bold text-lg bg-primary text-white rounded-[18px] hover:bg-primary-mid transition-all hover:scale-[1.02] active:scale-[0.98] select-none"
          >
            <span>العودة لتسجيل الدخول</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
        </SuccessCard>
      ) : (
        <form action={formAction} className="flex flex-col gap-4">
          {/* General error if any */}
          {state?.errors?.general && (
            <ErrorBanner message={state.errors.general[0]} />
          )}

          {/* Email input */}
          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            placeholder="name@example.com"
            icon={Mail}
            error={state?.errors?.email}
            defaultValue={state?.userData?.email || ""}
            disabled={isPending}
            required
          />

          {/* Submit button */}
          <Button type="submit" isLoading={isPending} className="mt-2">
            إرسال رابط التعيين
          </Button>

          {/* Redirect to Login */}
          <div className="text-center font-body text-base text-mid mt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-mid hover:underline transition-colors"
            >
              <span>العودة إلى تسجيل الدخول</span>
            </Link>
          </div>
        </form>
      )}
    </Motion>
  );
}
