import { serverFetch } from "@/shared/api/server";
import { User } from "./types";

export async function fetchUserData(): Promise<User> {
  const result = await serverFetch("users/me");

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user data");
  }

  return { userData: (result.data as { userData: unknown }).userData } as User;
}
