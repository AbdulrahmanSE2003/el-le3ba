export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;

  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;

    if ("response" in err) {
      const response = err.response as Record<string, unknown> | undefined;
      const data = response?.data as Record<string, unknown> | undefined;
      if (data?.message && typeof data.message === "string") return data.message;
    }

    if (err instanceof Error) return err.message;

    if ("message" in err && typeof err.message === "string") return err.message;
  }

  return "حدث خطأ غير متوقع";
}

export function getErrorStatus(error: unknown): number | undefined {
  if (error instanceof ApiError) return error.status;

  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if ("response" in err) {
      const response = err.response as Record<string, unknown> | undefined;
      return response?.status as number | undefined;
    }
  }

  return undefined;
}

export function isAuthError(error: unknown): boolean {
  return getErrorStatus(error) === 401;
}

export function isForbiddenError(error: unknown): boolean {
  return getErrorStatus(error) === 403;
}

export function isNotFoundError(error: unknown): boolean {
  return getErrorStatus(error) === 404;
}

export function isRateLimitError(error: unknown): boolean {
  return getErrorStatus(error) === 429;
}

export function isServerError(error: unknown): boolean {
  const status = getErrorStatus(error);
  return status !== undefined && status >= 500;
}
