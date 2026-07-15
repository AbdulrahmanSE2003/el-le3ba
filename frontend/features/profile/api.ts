import { tryCatch } from "@/components/shared/try-catch";
import { User } from "./types";

export async function fetchUserData(): Promise<User> {
  const result = await tryCatch("users/me");
  

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user data");
  }

  return { userData: result.data.userData };
}
