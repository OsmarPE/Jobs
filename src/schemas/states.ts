import { z } from "zod";
import { eq } from 'drizzle-orm';
import { states } from '../db/schema';
import { db } from '..';

// Schema para crear un estado
export const createStateSchema = z.object({
  countryId: z.number()
    .positive("El ID del país debe ser un número positivo"),
  name: z.string()
    .min(1, "El nombre del estado es requerido")
    .max(100, "El nombre del estado no puede exceder 100 caracteres"),
  code: z.string()
    .max(10, "El código del estado no puede exceder 10 caracteres")
    .optional()
});

// Schema para actualizar un estado
export const updateStateSchema = z.object({
  countryId: z.number()
    .positive("El ID del país debe ser un número positivo")
    .optional(),
  name: z.string()
    .min(1, "El nombre del estado es requerido")
    .max(100, "El nombre del estado no puede exceder 100 caracteres")
    .optional(),
  code: z.string()
    .max(10, "El código del estado no puede exceder 10 caracteres")
    .optional()
});

// Schema para validar ID de estado
export const stateIdSchema = z.object({
  id: z.coerce.number().positive("El ID del estado debe ser un número positivo")
});

// Schema para obtener estados por país
export const statesByCountrySchema = z.object({
  countryId: z.coerce.number().positive("El ID del país debe ser un número positivo")
});

// Tipos TypeScript para esquemas de validación
export type CreateStateType = z.infer<typeof createStateSchema>;
export type UpdateStateType = z.infer<typeof updateStateSchema>;
export type StateIdType = z.infer<typeof stateIdSchema>;
export type StatesByCountryType = z.infer<typeof statesByCountrySchema>;

// Tipos TypeScript para base de datos
export type State = typeof states.$inferSelect;
export type NewState = typeof states.$inferInsert;
export type UpdateState = Partial<NewState>;

// ================================
// FUNCIONES DE CONSULTA
// ================================

// Obtener todos los estados
export const getStates = async (): Promise<State[]> => {
  try {
    const data = await db
      .query
      .states
      .findMany({
        with: {
          country: true
        },
        orderBy: (states, { asc }) => [asc(states.name)]
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching states: ${error}`);
  }
};

// Obtener estado por ID
export const getStateById = async (id: State['id']): Promise<State | undefined> => {
  try {
    const data = await db
      .query
      .states
      .findFirst({
        where: eq(states.id, id),
        with: {
          country: true,
          cities: true
        }
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching state: ${error}`);
  }
};

// Obtener estados por país
export const getStatesByCountryId = async (countryId: number): Promise<State[]> => {
  try {
    const data = await db
      .query
      .states
      .findMany({
        where: eq(states.countryId, countryId),
        with: {
          country: true
        },
        orderBy: (states, { asc }) => [asc(states.name)]
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching states by country: ${error}`);
  }
};

// Crear un estado
export const createState = async ({ countryId, name, code }: NewState) => {
  try {
    const data = await db
      .insert(states)
      .values({
        countryId,
        name,
        code
      })
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error creating state: ${error}`);
  }
};

// Actualizar un estado
export const updateState = async (id: State['id'], { countryId, name, code }: UpdateState) => {
  try {
    const data = await db
      .update(states)
      .set({
        countryId,
        name,
        code
      })
      .where(eq(states.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error updating state: ${error}`);
  }
};

// Eliminar un estado
export const deleteState = async (id: State['id']) => {
  try {
    const data = await db
      .delete(states)
      .where(eq(states.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error deleting state: ${error}`);
  }
};
