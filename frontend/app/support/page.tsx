import { Footer } from "@/features/landing/components/Footer";
import { Navbar } from "@/features/landing/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدعم الفني",
  description:
    "تواصل مع فريق الدعم الفني لمنصة اللعبة أو اطلع على الأسئلة الأكثر شيوعًا.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
          <div className="space-y-5 text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              الدعم الفني
            </span>

            <h1 className="text-4xl font-display font-black md:text-5xl">
              نحن هنا لمساعدتك
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              إذا واجهتك أي مشكلة أثناء استخدام منصة اللعبة أو كان لديك استفسار
              بخصوص الحساب أو الفرق أو المسابقات، يمكنك التواصل معنا وسنعمل على
              مساعدتك في أقرب وقت ممكن.
            </p>
          </div>

          <section className="mt-14 space-y-6">
            <h2 className="text-2xl font-display font-bold">طرق التواصل</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-bold">البريد الإلكتروني</h3>
                <p className="mt-2 text-muted-foreground">
                  support@el-le3ba.vercel.app
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-bold">منصة X (تويتر سابقًا)</h3>
                <p className="mt-2 text-muted-foreground">@el_le3ba</p>
              </div>
            </div>
          </section>

          <section className="mt-14 space-y-6">
            <h2 className="text-2xl font-display font-bold">الأسئلة الشائعة</h2>

            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold">كيف يمكنني تغيير كلمة المرور؟</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  يمكنك تغيير كلمة المرور من صفحة الإعدادات داخل حسابك بعد تسجيل
                  الدخول.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold">كيف يمكنني إنشاء فريق؟</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  انتقل إلى صفحة الفريق، ثم اختر إنشاء فريق جديد أو انضم إلى
                  فريق موجود باستخدام كود الفريق.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold">هل يمكنني المشاركة بدون فريق؟</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  تعتمد المشاركة على نظام المسابقة الحالي. في أغلب المواسم يجب
                  أن تكون عضوًا في فريق للمشاركة.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold">
                  ماذا أفعل إذا واجهت مشكلة أثناء المباراة؟
                </h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  تواصل مع فريق الدعم موضحًا المشكلة ووقت حدوثها، مع إرفاق لقطات
                  شاشة إن أمكن، حتى نتمكن من مراجعتها بسرعة.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
