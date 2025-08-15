import { z } from "zod";

// Validaciones para autenticación
export const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un email válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Ingresa un email válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirma tu contraseña" }),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Ingresa un email válido" }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirma tu contraseña" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
