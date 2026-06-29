"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Overlay for Mobile Only*/}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-accent-foreground/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-primary-foreground/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl tracking-tight font-display font-black text-foreground">
              اللعبة<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Burger Menu (md:hidden) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-600 hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 animate-in fade-in zoom-in-50 duration-200" />
              ) : (
                <Menu className="h-6 w-6 animate-in fade-in zoom-in-50 duration-200" />
              )}
            </button>
          </div>

          {/* Links in Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="text-primary font-semibold">
              الرئيسية
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-primary transition-colors"
            >
              المتصدرين
            </Link>
            <Link
              href="#about"
              className="hover:text-primary transition-colors"
            >
              عن المنصة
            </Link>
          </nav>

          {/* CTA md:*/}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary text-primary-foreground font-bold rounded-full px-6 transition-all hover:scale-105"
            >
              <Link href="/register">ابدأ اللعب</Link>
            </Button>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              دخول
            </Link>
          </div>
        </div>

        {/* (Mobile Dropdown Menu) */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-primary-foreground border-b border-slate-100 transition-all duration-300 ease-in-out transform z-50 ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4 text-right font-medium text-slate-600">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-slate-50 hover:text-primary text-primary font-bold"
            >
              الرئيسية
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-slate-50 hover:text-primary"
            >
              المتصدرين
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-slate-50 hover:text-primary"
            >
              عن المنصة
            </Link>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                asChild
                className="bg-primary hover:bg-primary text-primary-foreground font-bold rounded-xl w-full h-11"
              >
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  ابدأ اللعب
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-200 text-slate-700 font-bold rounded-xl w-full h-11 bg-primary-foreground"
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  دخول
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
