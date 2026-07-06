"use client";

import { LogOut, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import SidebarFooterBtn from "./SidebarFooterBtn";

import { logout } from "@/features/auth/actions";
import { useEffect, useState } from "react";

interface Props {
  className: string;
}

export function SidebarFooterActions({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SidebarMenuButton title="جاري التحميل..." onClick={toggleTheme} />;
  }

  return (
    <SidebarFooter className={`border-t border-border ${className}`}>
      <SidebarMenu
        className={`p-5 list-none flex flex-col ${isCollapsed ? "items-center" : "items-stretch"}`}
      >
        <SidebarFooterBtn
          tooltip="تبديل المظهر"
          title={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
          onclick={toggleTheme}
          icon={theme === "dark" ? <Sun className="text-accent" /> : <Moon />}
          className="
            dark:bg-sidebar-accent
            bg-foreground/90
            hover:bg-foreground
            text-sidebar-foreground
            dark:hover:bg-sidebar-accent/80
          "
        />

        <SidebarFooterBtn
          title="تسجيل الخروج"
          tooltip="تسجيل الخروج"
          icon={<LogOut className="text-red-800" />}
          onclick={logout}
          className="text-red-500 bg-red-500/15 hover:bg-red-500/20 mt-2"
        />
      </SidebarMenu>
    </SidebarFooter>
  );
}
