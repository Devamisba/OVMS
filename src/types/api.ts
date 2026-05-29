export interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
