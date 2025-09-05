import { z } from "zod";
import { eq, like, and, ilike } from 'drizzle-orm';
import { cities } from '../db/schema';
import { db } from '..';

// Schema para crear una ciudad
export const createCitySchema = z.object({
  stateId: z.number()
    .positive("El ID del estado debe ser un número positivo"),
  name: z.string()
    .min(1, "El nombre de la ciudad es requerido")
    .max(100, "El nombre de la ciudad no puede exceder 100 caracteres"),
  latitude: z.string()
    .regex(/^-?([0-8]?[0-9](\.\d+)?|90(\.0+)?)$/, "La latitud debe ser un número válido entre -90 y 90")
    .optional(),
  longitude: z.string()
    .regex(/^-?((1[0-7][0-9])|([0-9]?[0-9]))(\.\d+)?$|^-?180(\.0+)?$/, "La longitud debe ser un número válido entre -180 y 180")
    .optional()
});

// Schema para actualizar una ciudad
export const updateCitySchema = z.object({
  stateId: z.number()
    .positive("El ID del estado debe ser un número positivo")
    .optional(),
  name: z.string()
    .min(1, "El nombre de la ciudad es requerido")
    .max(100, "El nombre de la ciudad no puede exceder 100 caracteres")
    .optional(),
  latitude: z.string()
    .regex(/^-?([0-8]?[0-9](\.\d+)?|90(\.0+)?)$/, "La latitud debe ser un número válido entre -90 y 90")
    .optional(),
  longitude: z.string()
    .regex(/^-?((1[0-7][0-9])|([0-9]?[0-9]))(\.\d+)?$|^-?180(\.0+)?$/, "La longitud debe ser un número válido entre -180 y 180")
    .optional()
});

// Schema para validar ID de ciudad
export const cityIdSchema = z.object({
  id: z.coerce.number().positive("El ID de la ciudad debe ser un número positivo")
});

// Schema para obtener ciudades por estado
export const citiesByStateSchema = z.object({
  stateId: z.coerce.number().positive("El ID del estado debe ser un número positivo")
});

// Schema para buscar ciudades por nombre
export const searchCitiesSchema = z.object({
  name: z.string()
    .min(1, "El término de búsqueda es requerido")
    .max(100, "El término de búsqueda no puede exceder 100 caracteres"),
  stateId: z.coerce.number()
    .positive("El ID del estado debe ser un número positivo")
    .optional()
});

// Tipos TypeScript para esquemas de validación
export type CreateCityType = z.infer<typeof createCitySchema>;
export type UpdateCityType = z.infer<typeof updateCitySchema>;
export type CityIdType = z.infer<typeof cityIdSchema>;
export type CitiesByStateType = z.infer<typeof citiesByStateSchema>;
export type SearchCitiesType = z.infer<typeof searchCitiesSchema>;

// Tipos TypeScript para base de datos
export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;
export type UpdateCity = Partial<NewCity>;

// ================================
// FUNCIONES DE CONSULTA
// ================================

// Obtener todas las ciudades
export const getCities = async (): Promise<City[]> => {
  try {
    const data = await db
      .query
      .cities
      .findMany({
        with: {
          state: {
            with: {
              country: true
            }
          }
        },
        orderBy: (cities, { asc }) => [asc(cities.name)]
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching cities: ${error}`);
  }
};

// Obtener ciudad por ID
export const getCityById = async (id: City['id']): Promise<City | undefined> => {
  try {
    const data = await db
      .query
      .cities
      .findFirst({
        where: eq(cities.id, id),
        with: {
          state: {
            with: {
              country: true
            }
          },
          locations: true
        }
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching city: ${error}`);
  }
};

// Obtener ciudades por estado
export const getCitiesByStateId = async (stateId: number): Promise<City[]> => {
  try {
    const data = await db
      .query
      .cities
      .findMany({
        where: eq(cities.stateId, stateId),
        with: {
          state: {
            with: {
              country: true
            }
          }
        },
        orderBy: (cities, { asc }) => [asc(cities.name)]
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching cities by state: ${error}`);
  }
};

// Buscar ciudades por nombre
export const searchCities = async (searchTerm: string, stateId?: number): Promise<City[]> => {
  try {
    const whereConditions = [ilike(cities.name, `${searchTerm}%`)];
    
    if (stateId) {
      whereConditions.push(eq(cities.stateId, stateId));
    }

    const data = await db
      .query
      .cities
      .findMany({
        where: whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0],
        with: {
          state: {
            with: {
              country: true
            }
          }
        },
        orderBy: (cities, { asc }) => [asc(cities.name)],
        limit: 10 // Limitar resultados de búsqueda
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error searching cities: ${error}`);
  }
};

// Crear una ciudad
export const createCity = async ({ stateId, name, latitude, longitude }: NewCity) => {
  try {
    const data = await db
      .insert(cities)
      .values({
        stateId,
        name,
        latitude,
        longitude
      })
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error creating city: ${error}`);
  }
};

// Actualizar una ciudad
export const updateCity = async (id: City['id'], { stateId, name, latitude, longitude }: UpdateCity) => {
  try {
    const data = await db
      .update(cities)
      .set({
        stateId,
        name,
        latitude,
        longitude
      })
      .where(eq(cities.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error updating city: ${error}`);
  }
};

// Eliminar una ciudad
export const deleteCity = async (id: City['id']) => {
  try {
    const data = await db
      .delete(cities)
      .where(eq(cities.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error deleting city: ${error}`);
  }
};
