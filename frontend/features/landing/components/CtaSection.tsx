"use client";

import Link from "next/link";
import Motion from "@/components/shared/Motion";
import { scaleIn } from "@/components/shared/animations";

export function CtaSection() {
  return (
    <section className="py-16 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* ── Box Container Animation ── */}
        <Motion
          as="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          duration={0.4}
          className="relative max-w-5xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-brand-dark to-brand bg-brand text-white text-center shadow-2xl shadow-brand/20 overflow-hidden border border-brand/30"
        >
          {/* Decorative Radial Background Glow Elements */}
          <div className="absolute -top-24 -left-24 h-64 w-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-brand-success/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
              مستعد تبدأ التحدي؟
            </h2>

            <p className="text-brand-light/90 font-medium text-base md:text-lg leading-relaxed">
              انضم لأكثر من 5000 طالب في الجامعة يتنافسون يومياً، الموسم الجديد
              سيبدأ دلوقتي!
            </p>

            {/* Premium CTA Button */}
            <div className="pt-4">
              <Link
                href="/play"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-yellow px-8 text-sm md:text-base font-black text-brand-dark-bg border border-brand-yellow-dark/20 shadow-lg shadow-brand-yellow/10 hover:bg-brand-yellow-dark transition-all duration-300 hover:scale-105 active:scale-95"
              >
                ابدأ اللعب الآن مجاناً
              </Link>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
}
