import { Trophy, Flame, Gamepad2, Star } from "lucide-react";
import { StatItem } from "./types";
import { formatNumber } from "@/components/shared/numbers-format";

export const ACHIEVEMENTS_POOL = [
  {
    title: "أول مباراة",
    description: "أكمل الفريق مباراة بنجاح",
    icon: "🎮",
    rarity: "common",
  },
  {
    title: "فريق متكامل",
    description: "انضمام 5 أعضاء للفريق",
    icon: "👥",
    rarity: "common",
  },
  {
    title: "ستريك أسطوري",
    description: "10 إجابات صحيحة متتالية",
    icon: "🔥",
    rarity: "rare",
  },
  {
    title: "دقة مطلقة",
    description: "100% إجابات صحيحة في جولة",
    icon: "🎯",
    rarity: "epic",
  },
  {
    title: "العمالقة",
    description: "تخطي 1000 نقطة إجمالية",
    icon: "🏆",
    rarity: "uncommon",
  },
  {
    title: "برق الميدان",
    description: "أسرع إجابة في جولة كاملة",
    icon: "⚡",
    rarity: "rare",
  },
];

export const statItems: StatItem[] = [
  {
    title: "إجمالي النقاط",
    value: formatNumber(150),
    icon: Trophy,
    iconBg: "bg-yellow-500/10 dark:bg-yellow-500/20",
    iconColor: "text-yellow-500",
  },
  {
    title: "المباريات المكتملة",
    value: 23,
    icon: Gamepad2,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "أعلى ستريك",
    value: 8,
    icon: Flame,
    iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "متوسط السكور",
    value: 55.7,
    icon: Star,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-500",
  },
];

export const sortedMembers = [
  {
    _id: "1",
    name: "Ahmed",
    role: "captain",
    joinedAt: "2022-01-01",
  },
  {
    _id: "2",
    name: "Abdo",
    role: "member",
    joinedAt: "2022-01-01",
  },
];
