"use client";

import Image from "next/image";
import { CheckCircle2, Timer, Zap } from "lucide-react";
import Motion from "@/components/shared/Motion";
/* ── Import animations variants ── */
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/components/shared/animations";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* ── Section Header Animation ── */}
        <Motion
          as="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-foreground">
            داخل الحلبة
          </h2>
          <p className="text-muted-foreground font-medium text-base md:text-lg">
            نظام لعب متطور يجمع بين الذكاء والسرعة والمخاطرة. اكتشف أوضاع اللعب
            المختلفة.
          </p>
        </Motion>

        {/* ── Feature Row 1 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Image slide from left */}
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            delay={0.1}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative p-2 rounded-3xl bg-card border border-border shadow-xl shadow-primary/5 max-w-md md:max-w-xl">
              <Image
                src="/images/feature-1.png"
                alt="واجهة اللعبة الذكية"
                width={600}
                height={400}
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </Motion>

          {/* Content slide from right */}
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            delay={0.2}
            className="space-y-6 order-1 lg:order-2 text-right lg:pr-8"
          >
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary border border-border">
              🎮 الوضع الكلاسيكي
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-foreground">
              واجهة ذكية لتجربة لعب ممتعة
            </h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              صممنا الواجهة عشان تكون سريعة ومريحة لعينك. تتبع نقاطك لحظة بلحظة
              وشوف سرعة إجابتك بتأثر إزاي على ترتيبك.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3 justify-start direction-rtl">
                <CheckCircle2 className="h-5 w-5 text-brand-success shrink-0" />
                <span className="font-semibold text-sm md:text-base text-foreground">
                  تفاعل لحظي مع الإجابات
                </span>
              </li>
              <li className="flex items-center gap-3 justify-start direction-rtl">
                <Timer className="h-5 w-5 text-primary shrink-0" />
                <span className="font-semibold text-sm md:text-base text-foreground">
                  مؤقت ذكي يحفز التفكير السريع
                </span>
              </li>
              <li className="flex items-center gap-3 justify-start direction-rtl">
                <Zap className="h-5 w-5 text-brand-yellow shrink-0" />
                <span className="font-semibold text-sm md:text-base text-foreground">
                  مضاعفة النقاط عند الإجابة المتتالية
                </span>
              </li>
            </ul>
          </Motion>
        </div>

        {/* ── Feature Row 2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content slide from left */}
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            delay={0.2}
            className="space-y-6 text-right lg:pl-8"
          >
            <span className="inline-flex items-center rounded-full bg-brand-yellow-dark/10 px-3 py-1 text-xs font-semibold text-brand-yellow-dark dark:text-brand-yellow border border-brand-yellow/20">
              🎲 وضع المخاطرة (Risk Game)
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-foreground">
              كل ما خاطرت أكثر، كسبت أكثر!
            </h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              اختار مستوى الصعوبة اللي يناسبك. 10 نقاط للأسئلة السهلة، أو جازف
              بـ 30 نقطة للأسئلة الصعبة عشان تقفز للمركز الأول في ثواني.
            </p>

            {/* Grid items animate smoothly within the content block */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-card border border-border text-center hover:border-brand-success/40 transition-colors">
                <span className="block font-black text-brand-success text-lg mb-1">
                  تكنولوجيا
                </span>
                <span className="text-xs text-muted-foreground">
                  واكب أحدث التقنيات
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border text-center hover:border-primary/40 transition-colors">
                <span className="block font-black text-primary text-lg mb-1">
                  تاريخ
                </span>
                <span className="text-xs text-muted-foreground">
                  تحديات في عمق التاريخ
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border text-center hover:border-brand-yellow/40 transition-colors">
                <span className="block font-black text-brand-yellow-dark dark:text-brand-yellow text-lg mb-1">
                  رياضة
                </span>
                <span className="text-xs text-muted-foreground">
                  لتحدي اللياقة والنشاط
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border text-center hover:border-indigo-400/40 transition-colors">
                <span className="block font-black text-indigo-500 text-lg mb-1">
                  منهج
                </span>
                <span className="text-xs text-muted-foreground">
                  لاختبار معلوماتك الدراسية
                </span>
              </div>
            </div>
          </Motion>

          {/* Image slide from right */}
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            delay={0.1}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative p-2 rounded-3xl bg-card border border-border shadow-xl shadow-primary/5 max-w-md md:max-w-xl">
              <Image
                src="/images/feature-2.png"
                alt="وضع المخاطرة والتصنيفات"
                width={600}
                height={400}
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </Motion>
        </div>
      </div>
    </section>
  );
}
