"use client";

import { Trophy, ShieldAlert, Zap, Sparkles, Plus } from "lucide-react";
import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
  glowColor: string;
};

const features: FeatureCard[] = [
  {
    id: "challenges",
    title: "تحديات يومية",
    description:
      "كويزات جديدة كل يوم في مختلف التخصصات عشان تزود معلوماتك وتكسب جوائز.",
    icon: <Trophy className="h-6 w-6" />,
    iconBg: "bg-brand-yellow/10 dark:bg-brand-yellow/20",
    iconColor: "text-brand-yellow-dark dark:text-brand-yellow",
    hoverBorder: "hover:border-brand-yellow/40 hover:shadow-brand-yellow/5",
    glowColor: "group-hover:bg-brand-yellow/10",
  },
  {
    id: "leaderboard",
    title: "ليدربورد لايف",
    description:
      "نافس زمايلك في الجامعة وشوف ترتيبك بيتغير لحظة بلحظة مع كل إجابة صح.",
    icon: <Zap className="h-6 w-6" />,
    iconBg: "bg-brand/10 dark:bg-brand/20",
    iconColor: "text-brand",
    hoverBorder: "hover:border-brand/40 hover:shadow-brand/5",
    glowColor: "group-hover:bg-brand/10",
  },
  {
    id: "badges",
    title: "تطوير و Badges",
    description:
      "اجمع أوسمة نادرة لتطوير مستواك الشخصي وافتح تحديات جديدة ومثيرة.",
    icon: <ShieldAlert className="h-6 w-6" />,
    iconBg: "bg-brand-success/10 dark:bg-brand-success/20",
    iconColor: "text-brand-success",
    hoverBorder: "hover:border-brand-success/40 hover:shadow-brand-success/5",
    glowColor: "group-hover:bg-brand-success/10",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative py-20 bg-background text-foreground overflow-hidden">
      {/* ── VISUAL BACKGROUND PLAYGROUND ── */}

      {/* 1. Linear Gaming Grid Pattern (Different scale from Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(circle_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-20 dark:opacity-10 pointer-events-none" />

      {/* 2. Floating Background Sparkles & Crosses */}
      <div className="absolute top-16 left-[10%] opacity-40 dark:opacity-20 animate-pulse [animation-duration:3s] text-brand-yellow-dark dark:text-brand-yellow pointer-events-none">
        <Sparkles className="h-6 w-6 rotate-12" />
      </div>
      <div className="absolute top-1/3 right-[8%] opacity-30 dark:opacity-10 animate-bounce [animation-duration:6s] text-brand pointer-events-none">
        <Plus className="h-5 w-5 transform rotate-45" />
      </div>
      <div className="absolute bottom-20 left-[6%] opacity-30 dark:opacity-10 animate-bounce [animation-duration:5s] text-brand-success pointer-events-none">
        <Plus className="h-4 w-4" />
      </div>
      <div className="absolute bottom-16 right-[12%] opacity-40 dark:opacity-20 animate-pulse [animation-duration:4s] text-brand pointer-events-none">
        <Sparkles className="h-5 w-5 -rotate-12" />
      </div>

      {/* 3. Smooth Cinematic Ambient Glows */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-[120px] dark:bg-brand/5 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-brand-yellow/10 blur-[120px] dark:bg-brand-yellow/5 pointer-events-none" />

      {/* ── Section Content ── */}
      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        {/* ── Header Animation ── */}
        <Motion
          as="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-foreground">
            ليه تختار اللعبة؟
          </h2>
          <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed">
            صممنا النظام عشان يقدم تجربة تعليمية فريدة من نوعها وتنافسية لأبعد
            حد.
          </p>
        </Motion>

        {/* ── Premium Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Motion
              key={feature.id}
              as="div"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              delay={index * 0.1} /* Stagger effect for cards */
              className={`group relative flex flex-col items-center p-8 rounded-3xl bg-card border border-border/60 shadow-lg shadow-black/5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer text-center overflow-hidden ${feature.hoverBorder}`}
            >
              {/* Dynamic Inner Glow Effect on Hover */}
              <div
                className={`absolute -inset-px rounded-3xl bg-transparent blur-xl transition-all duration-500 pointer-events-none -z-10 ${feature.glowColor}`}
              />

              {/* Icon Container with subtle glow */}
              <div
                className={`h-14 w-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center text-2xl mb-6 shadow-inner relative z-10 transition-transform duration-500 group-hover:rotate-12`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-black text-foreground mb-3 relative z-10">
                {feature.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed relative z-10">
                {feature.description}
              </p>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
}
