import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن اللعبة",
  description: "تعرف على منصة اللعبة — منصة المسابقات التنافسية لطلبة جامعة برج العرب التكنولوجية.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-16 space-y-8">
        <h1 className="text-4xl font-display font-black">عن اللعبة</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          اللعبة هي منصة تفاعلية للمسابقات التنافسية، صممت خصيصًا لطلبة جامعة برج العرب التكنولوجية (BATU).
          تهدف المنصة إلى تعزيز روح المنافسة العلمية بين الطلاب من خلال اختبارات تفاعلية في مجالات متنوعة.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">رؤيتنا</h2>
          <p className="leading-relaxed text-muted-foreground">
            نسعى لخلق بيئة تعليمية تنافسية تحفز الطلاب على تطوير مهاراتهم ومعارفهم
            بطريقة ممتعة وتفاعلية، مع بناء مجتمع جامعي متفاعل.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">كيف تعمل؟</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>قم بإنشاء حساب باستخدام بريدك الجامعي.</li>
            <li>انضم إلى فريق أو قم بتكوين فريق مع زملائك.</li>
            <li>شارك في المسابقات الدورية وأجب على الأسئلة بشكل جماعي.</li>
            <li>تسلق لوحة المتصدرين واكسب النقاط والجوائز.</li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
