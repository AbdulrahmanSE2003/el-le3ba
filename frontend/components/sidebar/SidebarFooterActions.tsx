"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { SidebarFooter, SidebarMenu } from "@/components/ui/sidebar";

import SidebarFooterBtn from "./SidebarFooterBtn";
import { logout } from "@/features/auth/actions";
import { useEffect, useState } from "react";

export function SidebarFooterActions({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <SidebarFooter
      className={`border-t justify-self-end border-border p-5 ${className}`}
    >
      <SidebarMenu>
        <SidebarFooterBtn
          tooltip="تبديل المظهر"
          title={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
          onclick={toggleTheme}
          icon={theme === "dark" ? <Sun className="text-accent" /> : <Moon />}
          className={`${theme === "dark" ? "bg-black text-white hover:bg-black hover:text-accent" : "bg-white text-black hover:bg-white hover:text-accent"}`}
        />

        <SidebarFooterBtn
          title="تسجيل الخروج"
          tooltip="تسجيل الخروج"
          icon={<LogOut className="text-red-800" />}
          onclick={logout}
          className="bg-red-400 hover:bg-red-500 mt-2"
        />
      </SidebarMenu>
    </SidebarFooter>
  );
}
