"use client";

import { Trophy, Flame, Gamepad2, Star, LucideIcon } from "lucide-react";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";
import { statItems } from "../contants";

export default function TeamStatsGrid() {
  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-2 gap-4"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <StyleContainer
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring" }}
            className="flex justify-between items-center p-5 rounded-2xl border border-border shadow-sm bg-white dark:bg-card"
          >
            <div className="flex flex-col gap-1.5 text-right">
              <span className="text-xs font-semibold text-muted-foreground">
                {item.title}
              </span>
              <p className="text-xl md:text-2xl font-black text-foreground">
                {item.value}
              </p>
            </div>

            <div
              className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} border border-current/10`}
            >
              <Icon size={20} />
            </div>
          </StyleContainer>
        );
      })}
    </Motion>
  );
}
