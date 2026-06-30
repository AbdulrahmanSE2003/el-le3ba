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
import { adminNavItems } from "./nav-config";

export function AdminSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" variant="sidebar">
      <motion.div
        className="sidebar-game-bg sidebar-admin-bg relative flex h-full flex-col overflow-hidden"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        <div className="sidebar-admin-glow pointer-events-none absolute inset-0" aria-hidden />
        <SidebarBrand variant="admin" />
        <SidebarContent className="relative z-10">
          <SidebarNav
            items={adminNavItems}
            label="إدارة المنصة"
            accentClass="bg-destructive/15 ring-destructive/30"
          />
        </SidebarContent>
        <SidebarFooterActions />
      </motion.div>
      <SidebarRail />
    </Sidebar>
  );
}
