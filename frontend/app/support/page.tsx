import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدعم الفني",
  description: "تواصل مع فريق الدعم الفني لمنصة اللعبة.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-16 space-y-8">
        <h1 className="text-4xl font-display font-black">الدعم الفني</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          نواجهك مشكلة؟ نحن هنا لمساعدتك.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">طرق التواصل</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>البريد الإلكتروني: support@el-le3ba.vercel.app</li>
            <li>تويتر: @el_le3ba</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold">كيف يمكنني تغيير كلمة المرور؟</h3>
              <p className="text-muted-foreground">
                يمكنك تغيير كلمة المرور من صفحة الملف الشخصي &gt; تغيير كلمة المرور.
              </p>
            </div>
            <div>
              <h3 className="font-bold">كيف يمكنني تكوين فريق؟</h3>
              <p className="text-muted-foreground">
                بعد تسجيل الدخول، انتقل إلى صفحة الفريق وادخل كود الفريق أو قم بإنشاء فريق جديد.
              </p>
            </div>
            <div>
              <h3 className="font-bold">ليس لدي فريق، هل يمكنني المشاركة؟</h3>
              <p className="text-muted-foreground">
                نعم، يمكنك الانضمام إلى أي فريق موجود باستخدام كود الفريق.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
