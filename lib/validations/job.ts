import { z } from "zod";

// Validaciones para trabajos/empleos
export const jobCreateSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }),
  description: z.string().min(50, { message: "La descripción debe tener al menos 50 caracteres" }),
  requirements: z.string().min(20, { message: "Los requisitos deben tener al menos 20 caracteres" }),
  salary: z.number().min(0, { message: "El salario debe ser mayor a 0" }).optional(),
  location: z.string().min(1, { message: "Selecciona la ubicación del trabajo" }),
  category: z.string().min(1, { message: "Selecciona una categoría" }),
  workType: z.enum(["Presencial", "Remoto", "Híbrido"], {
    message: "Selecciona un tipo de trabajo válido"
  }),
  contractType: z.enum(["Tiempo completo", "Medio tiempo", "Por contrato", "Freelance"], {
    message: "Selecciona un tipo de contrato válido"
  }),
  experienceLevel: z.enum(["Sin experiencia", "Junior", "Semi-senior", "Senior"], {
    message: "Selecciona un nivel de experiencia válido"
  }),
});

export const jobApplicationSchema = z.object({
  coverLetter: z.string().min(100, { message: "La carta de presentación debe tener al menos 100 caracteres" }),
  resume: z.instanceof(File, { message: "Sube tu CV en formato PDF o DOC" }).optional(),
});

export const jobSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  workType: z.string().optional(),
  contractType: z.string().optional(),
  experienceLevel: z.string().optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
}).refine((data) => {
  if (data.salaryMin && data.salaryMax) {
    return data.salaryMin <= data.salaryMax;
  }
  return true;
}, {
  message: "El salario mínimo no puede ser mayor al máximo",
  path: ["salaryMax"],
});
