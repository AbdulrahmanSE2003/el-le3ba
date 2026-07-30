import axios from "axios";
import { toast } from "sonner";

import {
  isAuthError,
  isForbiddenError,
  isServerError,
  extractErrorMessage,
} from "./errors";

const api = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAuthError(error)) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user-store");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    if (isForbiddenError(error)) {
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
      return Promise.reject(error);
    }

    if (isServerError(error)) {
      console.error("Server error:", extractErrorMessage(error));
      toast.error("حدث خطأ ما برجاء المحاولة لاحقا.");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ?? error.message ?? "Something went wrong."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export default api;
