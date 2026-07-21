"use client";

import React from "react";
import { TeamAchievement } from "../types";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";

interface Props {
  achievements: TeamAchievement[];
}

const rarityColors = {
  common: "border-zinc-300 dark:border-zinc-600",
  uncommon: "border-blue-400",
  rare: "border-purple-400",
  epic: "border-yellow-400",
};

const rarityLabels = {
  common: "عادي",
  uncommon: "غير شائع",
  rare: "نادر",
  epic: "أسطوري",
};

export default function AchievementGrid({ achievements }: Props) {
  const unlocked = achievements.filter((a) => a.unlockedAt);
  const locked = achievements.filter((a) => !a.unlockedAt);

  return (
    <StyleContainer className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
        🏅 الإنجازات
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {unlocked.length}/{achievements.length}
        </span>
      </h2>

      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {achievements.map((ach, index) => {
          const isUnlocked = !!ach.unlockedAt;
          const rColor = rarityColors[ach.rarity];

          return (
            <Motion
              as="div"
              key={index}
              variants={fadeInUp}
              className={`relative flex flex-col items-center text-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                isUnlocked
                  ? `${rColor} bg-card shadow-sm`
                  : "border-border bg-muted/30 opacity-50 grayscale"
              }`}
            >
              <span className="text-3xl">{ach.icon}</span>
              <p className="font-bold text-sm text-foreground">{ach.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ach.description}
              </p>

              {isUnlocked && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rColor} bg-background`}>
                  {rarityLabels[ach.rarity]}
                </span>
              )}

              {!isUnlocked && (
                <span className="text-[10px] text-muted-foreground mt-1">
                  🔒 لم يتحقق بعد
                </span>
              )}
            </Motion>
          );
        })}
      </Motion>
    </StyleContainer>
  );
}
