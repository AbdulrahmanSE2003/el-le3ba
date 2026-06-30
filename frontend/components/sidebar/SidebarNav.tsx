"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import type { NavItem } from "./nav-config";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24, scale: 0.92 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

interface SidebarNavProps {
  items: NavItem[];
  label: string;
  accentClass?: string;
}

export function SidebarNav({ items, label, accentClass }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-display text-sidebar-foreground/60">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <motion.div variants={listVariants} initial="hidden" animate="show">
          <SidebarMenu>
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <SidebarMenuItem key={item.href}>
                  <motion.div variants={itemVariants} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-md bg-sidebar-primary/20 ring-1 ring-sidebar-primary/40",
                          accentClass,
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "relative z-10 transition-transform duration-200",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        isActive &&
                          "text-sidebar-primary-foreground shadow-[0_0_20px_-4px_var(--sidebar-primary)]",
                      )}
                    >
                      <Link href={item.href}>
                        <NavIcon icon={item.icon} isActive={isActive} />
                        <span className="font-body">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge
                        className={cn(
                          "bg-accent text-accent-foreground font-display animate-pulse",
                          "shadow-[0_0_12px_-2px_var(--accent)]",
                        )}
                      >
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </motion.div>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </motion.div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavIcon({
  icon: Icon,
  isActive,
}: {
  icon: LucideIcon;
  isActive: boolean;
}) {
  return (
    <motion.span
      animate={
        isActive
          ? { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={
        isActive
          ? { duration: 0.5, ease: "easeOut" }
          : { type: "spring", stiffness: 400, damping: 20 }
      }
      whileHover={{ scale: 1.12, rotate: -6 }}
      className="inline-flex"
    >
      <Icon className={cn(isActive && "text-accent drop-shadow-[0_0_6px_var(--accent)]")} />
    </motion.span>
  );
}
