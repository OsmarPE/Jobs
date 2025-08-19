import { z } from "zod";

// Validaciones para el perfil del usuario
export const educationSchema = z.object({
  institution: z.string().min(1, { message: "Ingresa tu escuela donde cursas o desarrollas tu carrera" }),
  title: z.string().min(1, { message: "Ingresa tu carrera o nivel educativo" }),
  dateFrom: z.date().or(z.string().min(1, { message: "La fecha de inicio no puede estar vacía" })),
  dateTo: z.date().or(z.string().optional()),
  finished: z.boolean(),
});

export const experienceSchema = z.object({
    dateFrom: z.date().or(z.string().min(1, { message: "La fecha de inicio no puede estar vacía" })),
    dateTo: z.date().or(z.string().min(1, { message: "La fecha de fin no puede estar vacía" })),
    currentJob: z.boolean(),
    area: z.string().min(1, { message: "El área no puede estar vacía" }),
    areaJob: z.string().min(1, { message: "El área de trabajo no puede estar vacía" }),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  phone: z.string().min(8, { message: "Ingresa un número de teléfono válido" }),
  bio: z.string().max(500, { message: "La biografía no puede exceder 500 caracteres" }).optional(),
  location: z.string().min(1, { message: "Selecciona tu ubicación" }),
});

export const skillsSchema = z.object({
  skills: z.array(z.string()).min(1, { message: "Selecciona al menos una habilidad" }),
});

export const languagesSchema = z.object({
  languages: z.array(z.object({
    language: z.string().min(1, { message: "Selecciona un idioma" }),
    level: z.enum(["Básico", "Intermedio", "Avanzado", "Nativo"], {
      message: "Selecciona un nivel válido"
    }),
  })).min(1, { message: "Agrega al menos un idioma" }),
});
