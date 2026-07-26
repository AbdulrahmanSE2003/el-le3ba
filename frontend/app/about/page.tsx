import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";

import { Trophy, Users, Brain, Rocket, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="container mx-auto max-w-6xl px-4 py-24 text-center">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary opacity-90">
              منصة المسابقات الجامعية
            </span>

            <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-foreground">
              عن <span className="text-primary">اللعبة</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              <strong className="text-foreground">اللعبة</strong> هي منصة
              إلكترونية للمسابقات الجماعية صُممت لطلاب جامعة برج العرب
              التكنولوجية، بهدف تحويل المنافسة العلمية إلى تجربة ممتعة وسريعة
              وعادلة.
            </p>

            <Button asChild size="lg" className="mt-10 rounded-xl px-6 py-6">
              <Link href="/register">
                ابدأ اللعب
                <ArrowLeft className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Vision */}
        <section className="container mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                لماذا اللعبة؟
              </h2>

              <p className="mt-6 leading-8 text-muted-foreground">
                نؤمن أن التعلم يصبح أكثر متعة عندما يمتزج بالمنافسة. لذلك تم
                إنشاء اللعبة لتمنح الطلاب تجربة تجمع بين المعرفة، والعمل
                الجماعي، وروح التحدي داخل الجامعة.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                كل مباراة هي فرصة لاكتساب معرفة جديدة، وكل موسم فرصة لإثبات تفوق
                فريقك على باقي الفرق.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<Brain className="h-7 w-7" />}
                title="تعلم بالمنافسة"
                description="أسئلة متنوعة تشجع على التفكير وحل المشكلات."
              />

              <FeatureCard
                icon={<Users className="h-7 w-7" />}
                title="عمل جماعي"
                description="كوّن فريقك وتعاون مع زملائك للوصول إلى القمة."
              />

              <FeatureCard
                icon={<Trophy className="h-7 w-7" />}
                title="لوحة المتصدرين"
                description="تنافس على المراكز الأولى طوال الموسم."
              />

              <FeatureCard
                icon={<Rocket className="h-7 w-7" />}
                title="تجربة حديثة"
                description="واجهة سريعة، سهلة، ومتوافقة مع جميع الأجهزة."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-muted/40">
          <div className="container mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-center text-3xl font-display font-bold">
              كيف تبدأ؟
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              <Step number="1" title="أنشئ حسابًا">
                سجل باستخدام بريدك الجامعي.
              </Step>

              <Step number="2" title="كوّن فريقًا">
                أنشئ فريقك أو انضم إلى فريق موجود.
              </Step>

              <Step number="3" title="شارك">
                ادخل المنافسات الموسمية وأجب عن الأسئلة.
              </Step>

              <Step number="4" title="تصدّر">
                اجمع النقاط وارتقِ في لوحة المتصدرين.
              </Step>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 className="text-4xl font-display font-black text-foreground">
            هل فريقك جاهز للتحدي؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            انضم الآن وابدأ رحلتك نحو صدارة المنافسة.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 rounded-xl px-10 py-6 text-lg"
          >
            <Link href="/register">ابدأ اللعب الآن</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md">
      <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <h3 className="font-semibold text-foreground">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
        {number}
      </div>

      <h3 className="mt-5 font-semibold text-foreground">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p>
    </div>
  );
}
