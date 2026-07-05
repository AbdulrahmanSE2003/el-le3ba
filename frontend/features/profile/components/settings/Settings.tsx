"use client";

import { Settings } from "lucide-react";

import StyleContainer from "../StyleContainer";
import SettingCard from "./SettingCard";

import { useTheme } from "next-themes";
import { fadeInRight } from "@/components/shared/animations";

export default function SettingsSection() {
  const { theme, setTheme } = useTheme();

  return (
    <StyleContainer
      header="الإعدادات"
      icon={Settings}
      iconColor="text-muted-foreground"
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <SettingCard theme={theme} setTheme={setTheme} />
    </StyleContainer>
  );
}
