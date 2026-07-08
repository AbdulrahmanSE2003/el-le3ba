import { LucideIcon } from "lucide-react";

export type LastSession = {
  _id: string;
  eventId: {
    _id: string;
    title: string;
  };
  endReason: string;
  finalScore: number;
  correctAnswers: number;
  bestStreak: number;
};

export type User = {
  status?: boolean;
  userData: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    totalScore: number;
    gamesPlayed: number;
    highestScore: number;
    bestStreak: number;
    lastSessions: LastSession[];
  };
};

export interface UserProfileProps {
  user: User["userData"];
}

export type Stat = {
  title: string;
  label: keyof User["userData"];
  icon: LucideIcon;
};

export type ActionResponse = {
  success: boolean;
  error?: string;
  message?: string;
};

export type ShowPass = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

export type PasswordInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
