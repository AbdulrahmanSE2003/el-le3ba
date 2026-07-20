import { serverFetch } from "@/shared/api/server";
import { User } from "../types";

interface UserResponse {
  userData: User["userData"];
}

export async function fetchUserData(): Promise<User> {
  const result = await serverFetch<UserResponse>("users/me");

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user data");
  }

  return { userData: result.data.userData };
}
