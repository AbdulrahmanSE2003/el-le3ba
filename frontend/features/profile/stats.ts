import { Trophy, Flame, Gamepad2, Star } from "lucide-react";
import { Stat } from "./types";

export const stats: Stat[] = [
  {
    title: "إجمالي النقاط",
    label: "totalScore",
    icon: Trophy,
  },
  {
    title: "أعلى ستريك",
    label: "bestStreak",
    icon: Flame,
  },
  {
    title: "الجيمز المكتملة",
    label: "gamesPlayed",
    icon: Gamepad2,
  },
  {
    title: "أعلى سكور",
    label: "highestScore",
    icon: Star,
  },
];
