"use client";

import Link from "next/link";
import { Gamepad2, Shield } from "lucide-react";

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
    <SidebarHeader className="pb-3 bg-muted overflow-hidden">
      <Link
        href={href}
        className="flex flex-col justify-center items-center rounded-lg duration-300 p-3 border border-primary hover:bg-amber-100 hover:text-white"
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {!isCollapsed && (
            <Motion
              as="div"
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <Logo size="lg" />
            </Motion>
          )}

          <div className="w-fit text-primary text-2xl">
            {isAdmin ? <Shield /> : <Gamepad2 />}
          </div>
        </div>
      </Link>
    </SidebarHeader>
  );
}
