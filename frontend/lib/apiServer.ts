// lib/api-server.ts
import { cookies } from "next/headers";
import api from "./axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "get" | "post" | "patch" | "delete" | "put";

export async function apiServer<T = unknown>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config: Omit<AxiosRequestConfig, "method" | "url" | "data"> = {},
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const serverConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
  };

  switch (method) {
    case "get":
      return api.get<T>(url, serverConfig);
    case "post":
      return api.post<T>(url, data, serverConfig);
    case "patch":
      return api.patch<T>(url, data, serverConfig);
    case "put":
      return api.put<T>(url, data, serverConfig);
    case "delete":
      return api.delete<T>(url, serverConfig);
    default: {
      const _exhaustive: never = method;
      throw new Error(`Unsupported HTTP method: ${_exhaustive}`);
    }
  }
}
