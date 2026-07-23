"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Gamepad2,
  ArrowRight,
  Home,
  Compass,
  Search,
  ShieldAlert,
} from "lucide-react";
import Logo from "@/components/sidebar/Logo";
import { Button } from "@/components/ui/button";
import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-background text-foreground dir-rtl">
      {/* Dynamic Background Glow & Ambient Elements */}

      {/* Main Content Card */}
      <Motion
        as="div"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full flex flex-col items-center text-center px-6 py-10 rounded-3xl bg-card/80 backdrop-blur-md border border-border shadow-2xl"
      >
        {/* Header / Logo */}
        <div className="mb-6">
          <Logo size={20} />
        </div>

        {/* Level 404 Gamified Badge */}
        <Motion
          as="div"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-accent animate-bounce" />
          <span>المستوى 404: منطقة مجهولة</span>
        </Motion>

        {/* Glowing 404 Artwork */}
        <div className="relative mb-6 select-none flex items-center justify-center">
          <Motion
            as="h1"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-8xl sm:text-9xl font-extrabold font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary drop-shadow-lg"
          >
            404
          </Motion>

          {/* Floating Gamepad Icon overlay */}
          <Motion
            as="div"
            animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 p-3 rounded-2xl bg-accent text-accent-foreground shadow-lg border border-accent/40"
          >
            <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </Motion>
        </div>

        {/* Text Details */}
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
          ويبدو أنك ضللت الطريق!
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          الصفحة التي تحاول الوصول إليها قد تكون نُقلت، حُذفت، أو أنها غير
          موجودة في هذه الخريطة.
        </p>

        {/* Call-to-action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md mb-6">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto font-medium gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              الرئيسية
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="w-full sm:w-auto font-medium gap-2 hover:bg-secondary transition-all duration-300 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
            الصفحة السابقة
          </Button>
        </div>

        {/* Quick Navigation Links */}
        <div className="pt-6 border-t border-border/60 w-full flex flex-col sm:flex-row items-center justify-around gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <Compass className="w-4 h-4 text-primary" />
            روابط سريعة:
          </span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/home"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              المباريات
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/leaderboard"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              المتصدرين
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/profile"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              الملف الشخصي
            </Link>
          </div>
        </div>
      </Motion>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs text-muted-foreground font-body text-center"
      >
        منصة اللعبة — جميع الحقوق محفوظة {new Date().getFullYear()}
      </motion.p>
    </div>
  );
}
