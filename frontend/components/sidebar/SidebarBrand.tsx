"use client";

import Link from "next/link";

import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

import Logo from "./Logo";

import Motion from "../shared/Motion";
import { fadeInDown } from "../shared/animations";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SidebarBrandProps {
  variant?: "user" | "admin";
}

export function SidebarBrand({ variant = "user" }: SidebarBrandProps) {
  const isAdmin = variant === "admin";
  const href = isAdmin ? "/admin/" : "/dashboard";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { theme } = useTheme();

  const { state } = useSidebar(); // "expanded" | "collapsed"
  const isCollapsed = state === "collapsed";

  if (!mounted) {
    return (
      <div className="text-xl font-black tracking-tight text-primary">
        <span className="text-accent text-2xl">.</span>
      </div>
    );
  }

  return (
    <SidebarHeader
      className={` overflow-hidden border-b ${isCollapsed ? "p-1" : "p-2"}`}
    >
      <Link
        href={href}
        className="flex justify-center items-center duration-300"
      >
        <Motion
          as="div"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          {isCollapsed ? (
            <Logo />
          ) : (
            <span
              className={cn(
                "text-xl font-black tracking-tight text-primary",
                theme === "dark" ? "text-accent" : "",
              )}
            >
              اللعبة{" "}
              <span
                className={cn(
                  "text-accent text-2xl",
                  theme === "dark" ? "text-primary" : "",
                )}
              >
                .
              </span>
            </span>
          )}
        </Motion>
      </Link>
    </SidebarHeader>
  );
}
