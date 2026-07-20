"use server";

import { cookies } from "next/headers";
import { extractErrorMessage } from "./errors";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

function resolveUrl(path: string): string {
  const base = API_URL.replace(/\/+$/, "");
  const cleaned = path.replace(/^\/+/, "");
  return `${base}/${cleaned}`;
}

export type ServerActionResponse<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error?: string; status?: number; userData?: object };

export async function serverFetch<T = unknown>(
  url: string,
  method: string = "GET",
  body?: object,
): Promise<ServerActionResponse<T>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const resolvedUrl = resolveUrl(url);

    const res = await fetch(resolvedUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error(
          `[serverFetch] Non-JSON error response from ${resolvedUrl}:`,
          text.substring(0, 500),
        );
        return {
          success: false,
          error: `الخادم أعاد استجابة غير متوقعة (${res.status})`,
          status: res.status,
          userData: body,
        };
      }

      const data = await res.json();
      return {
        success: false,
        error: data.message || "بيانات غير صحيحة",
        status: res.status,
        userData: body,
      };
    }

    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(
        `[serverFetch] Unexpected non-JSON response from ${resolvedUrl}:`,
        text.substring(0, 500),
      );
      return {
        success: false,
        error: "الخادم أعاد استجابة غير متوقعة",
        status: res.status,
      };
    }

    const resData = await res.json();
    return { success: true, data: resData as T, message: resData.message };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
