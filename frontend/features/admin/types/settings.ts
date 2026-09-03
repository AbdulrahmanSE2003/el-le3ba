export interface GeneralSettings {
  platformName: string;
  logoUrl: string | null;
  supportEmail: string;
  description: string;
}

export interface QuizDefaultsSettings {
  defaultMaxAttempts: number;
  questionsPerSession: number;
  secondsPerQuestion: number;
  pointsPerCorrectAnswer: number;
  streakBonusEnabled: boolean;
  streakBonusPoints: number;
}

export interface SecuritySettings {
  sessionExpiryDays: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  defaultBanDurationDays: number;
  maintenanceMode: boolean;
}

export type AdminRole = "admin" | "superAdmin";
