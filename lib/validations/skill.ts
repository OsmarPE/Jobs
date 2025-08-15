import { z } from "zod";

// Validaciones para habilidades
export const skillSchema = z.object({
  name: z.string().min(1, { message: "El nombre de la habilidad no puede estar vacío" }),
});