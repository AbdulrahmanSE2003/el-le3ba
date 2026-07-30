"use client";

import { ReactNode } from "react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { motion } from "framer-motion";

import Icon from "./Icon";

import Link from "next/link";

interface SidebarNavBtnProps {
  title: string;
  tooltip: string;
  href: string;
  icon: ReactNode;
  isActive?: boolean;
  delay?: number;
}

export default function SidebarNavBtn({
  title,
  icon,
  tooltip,
  href,
  isActive = false,
}: SidebarNavBtnProps) {
  return (
    <SidebarMenuItem
      className={`hover:-translate-x-1 duration-300 rounded-md ${!isActive ? "hover:bg-primary/30" : ""}`}
    >
      {isActive && (
        <motion.span
          layoutId="active-sidebar"
          layout="position"
          className="absolute inset-0 rounded-md bg-primary"
        />
      )}

      <SidebarMenuButton
        tooltip={{
          children: tooltip,
          className:
            "[&_svg]:hidden! bg-primary text-white border-none font-body text-xs px-2 py-1.5 rounded-lg ms-2 shadow-lg",
        }}
        asChild
        isActive={isActive}
        className={`mb-2.5 z-10 self-stretch relative cursor-pointer text-muted-foreground duration-300 transition-all p-5 ${isActive && "text-white"}`}
      >
        <Link href={href} className="">
          <Icon icon={icon} />
          <span className="font-body ms-1">{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
