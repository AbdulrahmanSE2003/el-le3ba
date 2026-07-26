import { Navbar } from "@/features/landing/components/Navbar";
import { Footer } from "@/features/landing/components/Footer";
import type { Metadata } from "next";

import { Shield, Database, Eye, Lock, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية الخاصة بمنصة اللعبة.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              سياسة الخصوصية
            </span>

            <h1 className="mt-6 text-5xl font-display font-black text-foreground">
              خصوصيتك <span className="text-primary">أولوية لدينا</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              توضح هذه الصفحة نوع المعلومات التي نجمعها، وكيفية استخدامها،
              والإجراءات التي نتخذها لحماية بيانات مستخدمي منصة اللعبة.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-6">
            <PrivacyCard
              icon={<Database className="h-6 w-6" />}
              title="المعلومات التي نجمعها"
            >
              عند إنشاء حساب، نجمع البيانات الأساسية مثل الاسم والبريد
              الإلكتروني الجامعي. كما نقوم بتخزين بيانات مرتبطة باستخدامك
              للمنصة، مثل نتائج المباريات، النقاط، وسجل المشاركات.
            </PrivacyCard>

            <PrivacyCard
              icon={<Eye className="h-6 w-6" />}
              title="كيفية استخدام البيانات"
            >
              نستخدم معلوماتك لإدارة حسابك، وتنظيم المسابقات، وعرض نتائجك
              وإحصاءات فريقك، بالإضافة إلى تحسين تجربة استخدام المنصة وتطوير
              ميزاتها.
            </PrivacyCard>

            <PrivacyCard
              icon={<Lock className="h-6 w-6" />}
              title="حماية البيانات"
            >
              نتخذ إجراءات تقنية مناسبة لحماية معلوماتك من الوصول غير المصرح به
              أو التعديل أو الفقدان، ولا نتيح الوصول إليها إلا عند الحاجة.
            </PrivacyCard>

            <PrivacyCard
              icon={<Shield className="h-6 w-6" />}
              title="مشاركة المعلومات"
            >
              لا نقوم ببيع أو مشاركة بياناتك الشخصية مع أي جهة خارجية، إلا إذا
              كان ذلك مطلوبًا بموجب القانون أو كان ضروريًا لتقديم خدمات المنصة.
            </PrivacyCard>

            <PrivacyCard
              icon={<Cookie className="h-6 w-6" />}
              title="ملفات تعريف الارتباط (Cookies)"
            >
              تستخدم المنصة ملفات تعريف الارتباط وتقنيات مشابهة للحفاظ على تسجيل
              الدخول، وتحسين الأداء، وتقديم تجربة استخدام أكثر سلاسة.
            </PrivacyCard>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              باستخدامك للمنصة فإنك توافق على سياسة الخصوصية هذه.
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              قد يتم تحديث هذه السياسة عند إضافة ميزات جديدة أو إجراء تحسينات،
              وسيتم نشر أي تحديثات على هذه الصفحة.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PrivacyCard({
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
