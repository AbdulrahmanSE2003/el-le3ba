"use client";

import { motion } from "framer-motion";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarFooterActions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <SidebarFooter className="border-t border-sidebar-border/60">
      <SidebarMenu>
        <SidebarMenuItem>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            <SidebarMenuButton
              tooltip="تبديل المظهر"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              disabled={!mounted}
              className="transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="text-accent" />
                ) : (
                  <Moon />
                )}
              </motion.span>
              <span>{mounted && theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}</span>
            </SidebarMenuButton>
          </motion.div>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, type: "spring", stiffness: 300 }}
          >
            <SidebarMenuButton
              asChild
              tooltip="تسجيل الخروج"
              className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <a href="/login">
                <LogOut className="size-4" />
                <span>تسجيل الخروج</span>
              </a>
            </SidebarMenuButton>
          </motion.div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
