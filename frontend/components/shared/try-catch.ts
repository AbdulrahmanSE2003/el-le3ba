"use server";

import { cookies } from "next/headers";

const API_URL = "http://127.0.0.1:5000/api/v1";

type TryCatchResponse = {
  success?: boolean;
  data?: any;
  error?: string;
  userData?: object;
  message?: string;
};

type TryCatchRequest = {
  url: string;
  method?: string;
  body?: object;
  cache?: RequestCache;
  revalidate?: number;
};

export async function tryCatch({
  url,
  method = "GET",
  body,
  cache = "default",
  revalidate,
}: TryCatchRequest): Promise<TryCatchResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    };

    if (cache !== "no-store" && revalidate !== undefined) {
      fetchOptions.next = { revalidate };
    }

    const res = await fetch(`${API_URL}/${url}`, fetchOptions);

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.message || "Invalid data, please try again later",
        userData: body,
      };
    }

    const resData = await res.json();
    return { success: true, data: resData, message: resData.message };
  } catch {
    return {
      success: false,
      error: "Unable to reach the server, please try again later",
    };
  }
}
