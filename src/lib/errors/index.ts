export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "ROLE_MISMATCH"
  | "ADMIN_LIMIT_EXCEEDED"
  | "LAST_ADMIN_PROTECTED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    options?: { statusCode?: number; details?: unknown }
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = options?.statusCode ?? AppError.getDefaultStatusCode(code);
    this.details = options?.details;
  }

  private static getDefaultStatusCode(code: ErrorCode): number {
    switch (code) {
      case "VALIDATION_ERROR":
        return 400;
      case "UNAUTHORIZED":
        return 401;
      case "FORBIDDEN":
      case "ROLE_MISMATCH":
        return 403;
      case "NOT_FOUND":
        return 404;
      case "CONFLICT":
      case "ADMIN_LIMIT_EXCEEDED":
      case "LAST_ADMIN_PROTECTED":
        return 409;
      case "INTERNAL_ERROR":
      default:
        return 500;
    }
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError("INTERNAL_ERROR", error.message);
  }

  return new AppError("INTERNAL_ERROR", "An unexpected error occurred");
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}

export function apiSuccess<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function apiError(error: AppError): ApiResponse<never> {
  return {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  };
}
