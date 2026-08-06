import { ActionConfig, ACTIONS } from "@/features/admin/utils/constants";
import { clsx, type ClassValue } from "clsx";
import { HelpCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AVATARS = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
  "avatar8.png",
  "avatar9.png",
  "avatar10.png",
  "avatar11.png",
  "avatar12.png",
  "avatar13.png",
  "avatar14.png",
  "avatar15.png",
] as const;

export const getRemainingDays = (endTimeStr: string): number => {
  const diffTime = new Date(endTimeStr).getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const getInitials = (name: string) => {
  if (!name) return "";
  const cleanName = name.trim();
  if (cleanName.includes(" ")) {
    const parts = cleanName.split(/\s+/);
    return `${parts[0][0] || ""}${parts[1] ? parts[1][0] : ""}`;
  }
  return cleanName.slice(0, 2);
};

export const formatPoints = (
  points: number | string,
  locale: "en-US" | "ar-EG" | "ar-SA" = "en-US",
): string => {
  const numericValue = typeof points === "string" ? parseFloat(points) : points;

  if (isNaN(numericValue)) return "0";

  return new Intl.NumberFormat(locale).format(numericValue);
};

/**
 * Formats a timestamp (Date string, object, or number) into a friendly localized Arabic format.
 * Returns relative time (e.g., "منذ دقيقتين") for recent dates,
 * or absolute dates (e.g., "٢٨ أكتوبر ٢٠٢٦") for older instances.
 */
export const formatCreatedAt = (
  dateInput: string | Date | number,
  locale: "ar-EG" | "en-US" = "ar-EG",
  useLatinNumbers: boolean = true,
): string => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const activeLocale =
    locale === "ar-EG" && useLatinNumbers ? "ar-EG-u-nu-latn" : locale;

  if (diffInSeconds < 5) {
    return locale.startsWith("ar") ? "الآن" : "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    const rtf = new Intl.RelativeTimeFormat(activeLocale, { numeric: "auto" });

    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minute");
    }
    if (diffInHours < 24) {
      return rtf.format(-diffInHours, "hour");
    }
    return rtf.format(-diffInDays, "day");
  }

  return new Intl.DateTimeFormat(activeLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const getLogActionDetails = (action: string): ActionConfig => {
  return (
    ACTIONS[action] || {
      icon: HelpCircle,
      title: action,
      color: "text-muted-foreground bg-muted",
    }
  );
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ??
  "http://localhost:5000";

export function getAvatarUrl(avatar?: string | null) {
  if (!avatar) return "/images/default-avatar.png";

  if (avatar.startsWith("http")) return avatar;

  return `${BACKEND_URL}/avatars/${avatar}`;
}
