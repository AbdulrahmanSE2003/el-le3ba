import { Trophy, Flame, Gamepad2, Star } from "lucide-react";
import { StatItem, TeamMember } from "./types";
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

export const sortedMembers: TeamMember[] = [
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
