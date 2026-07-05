import { tryCatch } from "@/components/shared/try-catch";

export async function fetchUserData() {
  const result = await tryCatch("");

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch user data");
  }

  return { data: result.data };
}
