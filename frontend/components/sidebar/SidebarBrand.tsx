"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Shield } from "lucide-react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarBrandProps {
  variant?: "user" | "admin";
}

export function SidebarBrand({ variant = "user" }: SidebarBrandProps) {
  const isAdmin = variant === "admin";
  const href = isAdmin ? "/admin/dashboard" : "/dashboard";
  const Icon = isAdmin ? Shield : Gamepad2;
  const title = isAdmin ? "إدارة اللعبة" : "اللعبة";
  const subtitle = isAdmin ? "لوحة المشرف" : "منصة المسابقات";

  return (
    <SidebarHeader className="border-b border-sidebar-border/60 pb-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href={href} className="group/brand">
              <motion.div
                className={cn(
                  "flex aspect-square size-9 items-center justify-center rounded-lg",
                  isAdmin
                    ? "bg-destructive/20 text-destructive ring-1 ring-destructive/30"
                    : "bg-sidebar-primary text-sidebar-primary-foreground",
                )}
                animate={{
                  boxShadow: isAdmin
                    ? [
                        "0 0 0 0 rgba(255,71,87,0.4)",
                        "0 0 0 8px rgba(255,71,87,0)",
                      ]
                    : [
                        "0 0 0 0 rgba(91,95,239,0.5)",
                        "0 0 0 10px rgba(91,95,239,0)",
                      ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                whileHover={{ scale: 1.08, rotate: isAdmin ? 0 : -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="size-5" />
              </motion.div>
              <div className="flex flex-col gap-0.5 leading-none">
                <motion.span
                  className="font-display text-base font-bold tracking-tight"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  {title}
                </motion.span>
                <motion.span
                  className={cn(
                    "text-xs",
                    isAdmin ? "text-destructive/80" : "text-sidebar-foreground/60",
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {subtitle}
                </motion.span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
