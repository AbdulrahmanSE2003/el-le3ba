import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام الخاصة بمنصة اللعبة.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-16 space-y-8">
        <h1 className="text-4xl font-display font-black">الشروط والأحكام</h1>
        <p className="text-muted-foreground">
          باستخدامك لمنصة اللعبة، فإنك توافق على الشروط والأحكام التالية.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">الحساب</h2>
          <p className="leading-relaxed text-muted-foreground">
            يجب عليك تقديم معلومات دقيقة عند إنشاء الحساب. أنت المسؤول الوحيد عن
            الحفاظ على سرية كلمة المرور وجميع الأنشطة التي تتم ضمن حسابك.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">السلوك</h2>
          <p className="leading-relaxed text-muted-foreground">
            يمنع استخدام المنصة لأي أغراض غير قانونية أو غير أخلاقية. نحتفظ بالحق
            في تعليق أو حظر أي حساب يخالف هذه الشروط.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">الملكية الفكرية</h2>
          <p className="leading-relaxed text-muted-foreground">
            جميع المحتويات المعروضة على المنصة، بما في ذلك الأسئلة والتصميمات، هي
            ملك لفريق اللعبة ولا يجوز استخدامها دون إذن.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
