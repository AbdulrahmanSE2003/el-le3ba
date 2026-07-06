import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user-store");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    if (status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
      return Promise.reject(error);
    }

    // 429 — rate limit
    if (status === 429) {
      return Promise.reject(error);
    }

    // 500+ — server error
    if (status >= 500) {
      console.error("Server error:", message);
      toast.error("حدث خطأ ما برجاء المحاولة لاحقا.");
      return Promise.reject(error);
    }

    // باقي الـ errors (400, 404, etc.) — ارجعها للـ component يتعامل معاها
    return Promise.reject(error);
  },
);

export default api;
