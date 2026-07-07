"use server";

import { cookies } from "next/headers";

const API_URL = "http://127.0.0.1:5000/api/v1";

type tryCatchResponse = {
  success?: boolean;
  data?: any;
  error?: string;
  userData?: object;
  message?: string;
};

export async function tryCatch(
  url: string,
  method: string = "GET",
  body?: object,
): Promise<tryCatchResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.message || "بيانات غير صحيحة",
        userData: body,
      };
    }

    const resData = await res.json();
    return { success: true, data: resData, message: resData.message };
  } catch {
    return { success: false, error: "تعذر الاتصال بالخادم" };
  }
}