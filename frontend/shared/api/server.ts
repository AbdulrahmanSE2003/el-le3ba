import { cookies } from "next/headers";
import { extractErrorMessage } from "./errors";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export interface ServerFetchOptions {
  url: string;
  method?: string;
  body?: object;
  cache?: RequestCache;
  revalidate?: number;
}

function resolveUrl(path: string): string {
  const base = API_URL.replace(/\/+$/, "");
  const cleaned = path.replace(/^\/+/, "");
  return `${base}/${cleaned}`;
}

function normalizeArgs(
  urlOrOptions: string | ServerFetchOptions,
  method?: string,
  body?: object,
): {
  url: string;
  method: string;
  body: object | undefined;
  cache: RequestCache | undefined;
  revalidate: number | undefined;
} {
  if (typeof urlOrOptions === "string") {
    return {
      url: urlOrOptions,
      method: method ?? "GET",
      body,
      cache: undefined,
      revalidate: undefined,
    };
  }
  return {
    url: urlOrOptions.url,
    method: urlOrOptions.method ?? "GET",
    body: urlOrOptions.body,
    cache: urlOrOptions.cache,
    revalidate: urlOrOptions.revalidate,
  };
}

export type ServerActionResponse<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error?: string; status?: number; userData?: object };

export async function serverFetch<T = unknown>(
  urlOrOptions: string | ServerFetchOptions,
  method?: string,
  body?: object,
): Promise<ServerActionResponse<T>> {
  try {
    const {
      url,
      method: resolvedMethod,
      body: resolvedBody,
      cache,
      revalidate,
    } = normalizeArgs(urlOrOptions, method, body);

    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const resolvedUrl = resolveUrl(url);

    const fetchInit: RequestInit & { next?: { revalidate?: number } } = {
      method: resolvedMethod,
      headers,
      body: resolvedBody ? JSON.stringify(resolvedBody) : undefined,
    };

    if (cache) {
      fetchInit.cache = cache;
    }

    if (revalidate !== undefined) {
      fetchInit.next = { revalidate };
    }

    const res = await fetch(resolvedUrl, fetchInit);

    const contentType = res.headers.get("content-type") || "";

    // --- Failure path: HTTP status itself indicates an error ---
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
          userData: resolvedBody,
        };
      }

      const data = await res.json();
      return {
        success: false,
        error: data.message || "بيانات غير صحيحة",
        status: res.status,
        userData: resolvedBody,
      };
    }

    // --- Success path: res.ok is true from here on ---
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      if (text.trim().length > 0) {
        console.error(
          `[serverFetch] Unexpected non-JSON success response from ${resolvedUrl}:`,
          text.substring(0, 500),
        );
      }
      // e.g. 204 No Content or an empty body on a 200 — still a success
      return { success: true, data: undefined as T };
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
