"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Overlay for Mobile Only */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-accent-foreground/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl tracking-tight font-display font-black text-foreground">
              اللعبة<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Burger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 animate-in fade-in zoom-in-50 duration-200" />
              ) : (
                <Menu className="h-6 w-6 animate-in fade-in zoom-in-50 duration-200" />
              )}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-md font-medium text-card-foreground">
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
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              asChild
              className="bg-primary hover:bg-primary text-primary-foreground font-bold rounded-full px-6 transition-all hover:scale-105"
            >
              <Link href="/register">ابدأ اللعب</Link>
            </Button>
            <Link
              href="/login"
              className="text-sm font-medium text-card-foreground hover:text-primary transition-colors"
            >
              دخول
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-background border-b border-border transition-all duration-300 ease-in-out transform z-50 ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4 text-right font-medium text-muted-foreground">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-border hover:text-primary text-primary font-bold"
            >
              الرئيسية
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-border hover:text-primary"
            >
              المتصدرين
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="pb-2 border-b border-border hover:text-primary"
            >
              عن المنصة
            </Link>

            {/* In Mobile */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  مظهر اللعبة
                </span>
                <ThemeToggle />
              </div>

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
                className="border-input text-foreground font-bold rounded-xl w-full h-11 bg-background"
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
