import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
