"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import type { NavItem } from "./nav-config";
import Motion from "../shared/Motion";

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const { state } = useSidebar(); // "expanded" | "collapsed"
  const isCollapsed = state === "collapsed";

  return (
    <Motion
      as="div"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      initial="hidden"
      animate="visible"
      className={`p-5 list-none flex flex-col ${isCollapsed ? "items-center" : ""} overflow-hidden`}
    >
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <Motion
            key={item.href}
            as="div"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: {} },
            }}
          >
            <SidebarMenuItem>
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className={`absolute w-full h-full bg-primary rounded-md`}
                />
              )}

              <SidebarMenuButton
                asChild
                isActive={isActive}
                className="mb-5 z-10 self-stretch relative cursor-pointer text-white duration-300 transition-all p-6 hover:text-accent"
              >
                <Link href={item.href} className="w-full flex items-center">
                  <item.icon className=" duration-300" />
                  <span className="font-body ms-1">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Motion>
        );
      })}
    </Motion>
  );
}
