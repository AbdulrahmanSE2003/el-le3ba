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
    const res = await fetch(`${API_URL}/${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
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
