"use client";

import { motion } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooterActions } from "./SidebarFooterActions";
import { SidebarNav } from "./SidebarNav";
import { userNavItems } from "./nav-config";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <motion.div
        className="sidebar-game-bg relative flex h-full flex-col overflow-hidden"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        <div className="sidebar-game-glow pointer-events-none absolute inset-0" aria-hidden />
        <SidebarBrand variant="user" />
        <SidebarContent className="relative z-10">
          <SidebarNav items={userNavItems} label="القائمة الرئيسية" />
        </SidebarContent>
        <SidebarFooterActions />
      </motion.div>
      <SidebarRail />
    </Sidebar>
  );
}
