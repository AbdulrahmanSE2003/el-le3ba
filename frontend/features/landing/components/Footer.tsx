"use client";

import Link from "next/link";
import Motion from "@/components/shared/Motion";
/* ── Import animations variants ── */
import { fadeInUp } from "@/components/shared/animations";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background text-foreground border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* ── Footer Motion Container ── */}
        <Motion
          as="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Right Side: Logo or App Name */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-xl font-black tracking-tight text-foreground">
              اللعبة<span className="text-brand">.</span>
            </span>
          </div>

          {/* Center: Minimalist Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-brand transition-colors">
              عن اللعبة
            </Link>
            <Link href="/terms" className="hover:text-brand transition-colors">
              الشروط والأحكام
            </Link>
            <Link
              href="/privacy"
              className="hover:text-brand transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/support"
              className="hover:text-brand transition-colors"
            >
              الدعم الفني
            </Link>
          </nav>

          {/* Left Side: Copyright Text */}
          <div className="text-xs font-medium text-muted-foreground/80 text-center md:text-left direction-ltr">
            &copy; {currentYear} El-Le3ba. All rights reserved.
          </div>
        </Motion>
      </div>
    </footer>
  );
}
