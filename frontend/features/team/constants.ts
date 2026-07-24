import {
  Trophy,
  Flame,
  Gamepad2,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { sessionsType, StatItem, TeamMember } from "./types";
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

export const sessions: sessionsType[] = [
  {
    _id: 1,
    eventId: {
      _id: 1,
      title: `إيفنت trivia الكلية الجولة 1 🏆`,
    },
    finalScore: 100,
    correctAnswers: 10,
    totalQuestions: 15,
    bestStreak: 8,
    endReason: "completed" as any,
    completedAt: new Date().toISOString(),
    label: "مكتملة",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    _id: 2,
    eventId: {
      _id: 2,
      title: `إيفنت trivia الكلية الجولة 1 🏆`,
    },
    finalScore: 100,
    correctAnswers: 10,
    totalQuestions: 15,
    bestStreak: 8,
    endReason: "completed" as any,
    completedAt: new Date().toISOString(),
    label: "انتهى الوقت",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    _id: 3,
    eventId: {
      _id: 3,
      title: `إيفنت trivia الكلية الجولة 1 🏆`,
    },
    finalScore: 100,
    correctAnswers: 10,
    totalQuestions: 15,
    bestStreak: 8,
    endReason: "completed" as any,
    completedAt: new Date().toISOString(),
    label: "مُبلَّغ عنها",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    _id: 4,
    eventId: {
      _id: 4,
      title: `إيفنت trivia الكلية الجولة 1 🏆`,
    },
    finalScore: 100,
    correctAnswers: 10,
    totalQuestions: 15,
    bestStreak: 8,
    endReason: "completed" as any,
    completedAt: new Date().toISOString(),
    label: "تم التخلي",
    icon: XCircle,
    color: "text-muted-foreground",
  },
];
