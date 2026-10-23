import { z } from "zod";

export const PortalRoleEnum = z.enum(["TEACHER", "STUDENT", "PARENT"]);
export type PortalRole = z.infer<typeof PortalRoleEnum>;

export const UserRoleEnum = z.enum([
  "SUPER_ADMIN",
  "SCHOOL_ADMIN",
  "PRINCIPAL",
  "TEACHER",
  "STUDENT",
  "PARENT",
]);
export type UserRole = z.infer<typeof UserRoleEnum>;

export const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
export type UserStatus = z.infer<typeof UserStatusEnum>;

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(3, "Username, email, or admission ID is required")
    .max(100),
  password: z.string().min(1, "Password is required"),
  portalRole: PortalRoleEnum,
  rememberMe: z.boolean().optional().default(false),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const createUserSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Valid email address is required"),
  role: UserRoleEnum,
  schoolId: z.string().default("school-springfield-01"),
  department: z.string().optional(),
  phone: z.string().optional(),
  initialPassword: z
    .string()
    .min(8, "Initial password must be at least 8 characters")
    .default("SimpleIn@2026"),
  status: UserStatusEnum.default("ACTIVE"),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: UserRoleEnum.optional(),
  status: UserStatusEnum.optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const demoEnquirySchema = z.object({
  schoolName: z.string().min(3, "School name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  studentCount: z.string().min(1, "Approximate student count is required"),
  comments: z.string().optional(),
});
export type DemoEnquiryInput = z.infer<typeof demoEnquirySchema>;
