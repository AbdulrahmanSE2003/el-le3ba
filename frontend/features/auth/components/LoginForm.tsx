"use client";

import { useActionState, useEffect } from "react";

import Link from "next/link";

import { Mail, Lock } from "lucide-react";

import Input from "./Input";
import AuthButton from "./AuthButton";
import Header from "./Header";
import FormWrapper from "./FormWrapper";
import FooterWrapper from "./FooterWrapper";
import RedirectLink from "./RedirectLink";

import { signIn } from "../actions";

import { showError } from "@/components/shared/notifications";


export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, null);

  // show alert on error
  useEffect(() => {
    if (state?.errors) {
      // showError(state?.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header section with logo */}
      <Header header="تسجيل الدخول" text="يلا نلعب اللعبة 🤙🏻" />

      <FormWrapper action={formAction}>
        <Input
          label="البريد الإلكتروني"
          type="email"
          name="email"
          placeholder="name@example.com"
          icon={Mail}
          defaultValue={state?.userData?.email || ""}
          disabled={isPending}
          required
        />

        <Input
          label="كلمة السر"
          type="password"
          name="password"
          placeholder="••••••••"
          icon={Lock}
          disabled={isPending}
          required
        />

        <FooterWrapper>
          <div>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/90 duration-300 hover:underline"
            >
              نسيت كلمة السر؟
            </Link>
          </div>

          {/* Submit button */}
          <AuthButton
            title="تسجيل الدخول"
            type="submit"
            isLoading={isPending}
            className="mt-2"
          />

          {/* Redirect to Register link */}
          <RedirectLink
            text="معندكش حساب؟"
            link="/register"
            linkTitle="اعمل حساب جديد"
          />
        </FooterWrapper>
      </FormWrapper>
    </div>
  );
}
