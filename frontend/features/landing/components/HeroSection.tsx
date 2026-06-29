import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PlayCircle,
  Trophy,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-slate-50/50 px-4 text-center overflow-hidden">
      {/* (Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* (Glowing Blurs) */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      {/* 3. عناصر الجيمينج الطايرة في الخلفية (Floating Icons) */}
      {/* العنصر الأول: كأس طاير يسار فوق */}
      <div className="absolute top-20 left-12 hidden lg:flex animate-bounce [animation-duration:4s] flex-col items-center justify-center h-14 w-14 rounded-2xl bg-primary-foreground shadow-xl shadow-indigo-100 border border-slate-100 text-amber-500 transform -rotate-12">
        <Trophy className="h-7 w-7" />
      </div>

      <div className="absolute top-32 right-16 hidden lg:flex animate-bounce [animation-duration:5s] flex-col items-center justify-center h-16 w-16 rounded-2xl bg-white shadow-xl shadow-purple-100 border border-slate-100 text-rose-500 transform rotate-12">
        <Target className="h-8 w-8" />
      </div>

      <div className="absolute bottom-24 left-24 hidden lg:flex animate-bounce [animation-duration:4.5s] flex-col items-center justify-center h-12 w-12 rounded-2xl bg-white shadow-xl shadow-blue-100 border border-slate-100 text-cyan-500 transform rotate-45">
        <Zap className="h-6 w-6" />
      </div>

      <div className="absolute bottom-36 right-28 hidden lg:flex animate-bounce [animation-duration:6s] flex-col items-center justify-center h-14 w-14 rounded-2xl bg-white shadow-xl shadow-amber-100 border border-slate-100 text-yellow-500 transform -rotate-6">
        <Sparkles className="h-6 w-6" />
      </div>

      {/* Hero */}
      <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10">
        {/* Icons */}
        <div className="flex items-center space-x-0 space-x-reverse mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground shadow-md text-lg border border-slate-50">
            ⚡
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground shadow-md text-xl border border-slate-50">
            🏆
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary-foreground bg-primary-foreground shadow-lg text-3xl">
            🎮
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground shadow-md text-xl border border-slate-50">
            🔥
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground shadow-md text-lg border border-slate-50">
            📚
          </div>
        </div>

        {/* Badge */}
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary mb-6 border border-indigo-100/80 shadow-sm">
          ✨ أقوى تحدي في الجامعة
        </span>

        {/* Main Title */}
        <h1 className="text-4xl font-black text-accent-foreground sm:text-6xl tracking-tight leading-[1.1] mb-6">
          تحدى أصحابك.. <br />
          <span className="text-primary relative inline-block mt-2">
            سيطر على الليدربورد
            <span className="absolute -bottom-1 -right-2 h-3 w-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-slate-500 max-w-xl font-medium leading-relaxed mb-10">
          أقوى تجربة كويزات تعليمية في الجامعة. العب، اكسب، ونافس الكل في جو من
          الحماس والمتعة.
        </p>

        {/* (CTA) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className=" hover:bg-indigo-700 text-primary-foreground bg-primary font-bold rounded-full px-8 h-14 text-base w-full sm:w-auto shadow-lg shadow-primary/25 transition-all hover:scale-105"
          >
            <Link href="/register" className="flex items-center gap-2">
              ابدأ اللعب الآن <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-full px-8 h-14 text-base w-full sm:w-auto bg-primary-foreground shadow-sm transition-all hover:scale-105"
          >
            <Link href="#about" className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-slate-400" /> شرح اللعبة
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
