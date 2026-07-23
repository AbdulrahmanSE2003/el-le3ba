import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية الخاصة بمنصة اللعبة.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-16 space-y-8">
        <h1 className="text-4xl font-display font-black">سياسة الخصوصية</h1>
        <p className="text-muted-foreground">
          نحن في اللعبة نأخذ خصوصيتك على محمل الجد. تصف هذه السياسة كيفية جمع
          واستخدام وحماية معلوماتك الشخصية.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">المعلومات التي نجمعها</h2>
          <p className="leading-relaxed text-muted-foreground">
            نقوم بجمع المعلومات التي تقدمها عند إنشاء الحساب، مثل الاسم والبريد
            الإلكتروني الجامعي. كما نجمع بيانات الأداء مثل النقاط والمباريات
            التي تلعبها.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">كيف نستخدم معلوماتك</h2>
          <p className="leading-relaxed text-muted-foreground">
            نستخدم معلوماتك لتقديم وتحسين خدمات المنصة، والتواصل معك بخصوص
            المسابقات، وتحسين تجربة المستخدم.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">مشاركة المعلومات</h2>
          <p className="leading-relaxed text-muted-foreground">
            لا نقوم بمشاركة معلوماتك الشخصية مع أطراف ثالثة دون موافقتك، إلا
            عندما يقتضي القانون ذلك.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
