import { getCurrentUser } from "@/shared/api/helpers";
import { User } from "../types";

export async function fetchUserData(): Promise<User> {
  const result = await getCurrentUser();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user data");
  }

  return { userData: result.data.userData as User["userData"] };
}
