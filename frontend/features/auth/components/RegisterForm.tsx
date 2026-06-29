"use client";

import { useActionState } from "react";

import Input from "./Input";
import AuthButton from "./AuthButton";
import Header from "./Header";
import FormWrapper from "./FormWrapper";
import FooterWrapper from "./FooterWrapper";
import RedirectLink from "./RedirectLink";

import Motion from "@/components/shared/Motion";
// import { signUp } from "../actions";

import { fadeInRight } from "../animations";

import { registerBtns } from "../auth-btns";


export default function RegisterForm() {
  // const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <Motion
      as="div"
      variants={fadeInRight}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Header section */}
      <Header
        header="إنشاء حساب جديد"
        text="انضم اليوم وتحدَّ الجميع في مسابقات السرعة والذكاء!"
      />

      {/* <FormWrapper action={formAction}>
        {registerBtns.map((btn) => (
          <Input
            key={btn.name}
            {...btn}
            defaultValue={state?.userData?.[btn.name] || ""}
            disabled={isPending}
          />
        ))} */}

        {/* Submit button */}
        {/* <FooterWrapper>
          <AuthButton
            title="إنشاء الحساب"
            type="submit"
            isLoading={isPending}
            className="mt-2"
          /> */}

          {/* Redirect to Login */}
          {/* <RedirectLink
            link="/login"
            linkTitle="تسجيل الدخول"
            text="لديك حساب بالفعل؟"
          />
        </FooterWrapper>
      </FormWrapper> */}
    </Motion>
  );
}
