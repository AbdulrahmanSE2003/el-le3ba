export type ApiSuccess<T> = { success: true; data: T; message?: string };

export type ApiFailure = {
  success: false;
  error?: string;
  status?: number;
  userData?: object;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
