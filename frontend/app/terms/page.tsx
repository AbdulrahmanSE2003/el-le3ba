import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

import {
  ShieldCheck,
  UserRound,
  Scale,
  Ban,
  TriangleAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام الخاصة بمنصة اللعبة.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              الشروط والأحكام
            </span>

            <h1 className="mt-6 text-5xl font-display font-black text-foreground">
              شروط استخدام <span className="text-primary">اللعبة</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              باستخدامك لمنصة اللعبة فإنك توافق على الالتزام بالشروط التالية،
              والتي تهدف إلى توفير تجربة عادلة وآمنة لجميع المشاركين.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-6">
            <TermCard icon={<UserRound className="h-6 w-6" />} title="الحساب">
              يجب استخدام بيانات صحيحة عند إنشاء الحساب، وأنت المسؤول عن الحفاظ
              على سرية كلمة المرور وعدم مشاركتها مع أي شخص.
            </TermCard>

            <TermCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="الاستخدام المقبول"
            >
              تستخدم المنصة للأغراض التعليمية والترفيهية فقط. يمنع استغلالها في
              أي نشاط مخالف للقانون أو يسبب ضررًا للمستخدمين أو للجامعة.
            </TermCard>

            <TermCard
              icon={<Ban className="h-6 w-6" />}
              title="السلوك داخل المنصة"
            >
              يمنع الغش أو محاولة استغلال الثغرات أو انتحال شخصية الآخرين أو
              الإساءة لباقي المستخدمين. يحق للإدارة تعليق أو حذف أي حساب مخالف.
            </TermCard>

            <TermCard
              icon={<Scale className="h-6 w-6" />}
              title="الملكية الفكرية"
            >
              جميع الأسئلة، التصاميم، الشعارات، والمحتوى الموجود داخل المنصة ملك
              لمنصة اللعبة، ولا يجوز إعادة استخدامه أو نشره دون إذن مسبق.
            </TermCard>

            <TermCard
              icon={<TriangleAlert className="h-6 w-6" />}
              title="تعديل الشروط"
            >
              قد يتم تحديث هذه الشروط في أي وقت عند الحاجة. استمرارك في استخدام
              المنصة بعد نشر التحديثات يعني موافقتك على النسخة الجديدة.
            </TermCard>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              استمرارك في استخدام المنصة يعني موافقتك على جميع الشروط والأحكام.
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              إذا كنت لا توافق على أي من هذه الشروط، يرجى التوقف عن استخدام
              المنصة.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TermCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>

        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>

      <p className="mt-5 leading-8 text-muted-foreground">{children}</p>
    </div>
  );
}
