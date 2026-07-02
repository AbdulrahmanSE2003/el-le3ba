"use client";

import Link from "next/link";

import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

import Logo from "./Logo";

import Motion from "../shared/Motion";
import { fadeInDown } from "../shared/animations";

interface SidebarBrandProps {
  variant?: "user" | "admin";
}

export function SidebarBrand({ variant = "user" }: SidebarBrandProps) {
  const isAdmin = variant === "admin";
  const href = isAdmin ? "/admin/dashboard" : "/dashboard";

  const { state } = useSidebar(); // "expanded" | "collapsed"
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="pb-3 overflow-hidden border-b">
      <Link
        href={href}
        className="flex justify-center items-center duration-300 p-3"
      >
        <Motion
          as="div"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <Logo size={isCollapsed ? "xs" : "sm"} />
        </Motion>
      </Link>
    </SidebarHeader>
  );
}
