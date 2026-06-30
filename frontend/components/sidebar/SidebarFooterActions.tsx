"use client";

import { motion } from "framer-motion";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import SidebarFooterBtn from "./SidebarFooterBtn";
import { logout } from "@/features/auth/actions";

export function SidebarFooterActions({ className }: { className: string }) {
  const { theme, setTheme } = useTheme();

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
        />

        <SidebarFooterBtn
          title="تسجيل الخروج"
          tooltip="تسجيل الخروج"
          icon={<LogOut className="text-red-500" />}
          onclick={logout}
        />
      </SidebarMenu>
    </SidebarFooter>
  );
}
