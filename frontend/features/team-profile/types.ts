import { LucideIcon } from "lucide-react";

export type TeamStats = {
  totalGames: number;
  totalPoints: number;
  bestStreak: number;
  averageScore: number;
  accuracyRate: number;
};

export type TeamProfileData = {
  _id: string;
  teamName?: string;
  teamCode: string;
  createdAt: string;
  isMyTeam: boolean;
  viewerRole: "visitor" | "member" | "captain" | "admin";
  stats: TeamStats;
};

export type TeamMember = {
  _id: string;
  role: "captain" | "member";
  joinedAt: string;
};

export type SessionHistory = {
  _id: string;
  eventId: {
    _id: string;
    title: string;
  };
  finalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  bestStreak: number;
  endReason: "completed" | "expired" | "flagged" | "abandoned";
  completedAt: string;
};

export type TeamAchievement = {
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  rarity: "common" | "uncommon" | "rare" | "epic";
};

export type TeamActivity = {
  _id: string;
  type:
    | "session_completed"
    | "member_joined"
    | "achievement_unlocked"
    | "rank_changed";
  description: string;
  timestamp: string;
};

export type StatItem = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};
