import { z } from "zod";
import { eq } from 'drizzle-orm';
import { countries } from '../db/schema';
import { db } from '..';

// Schema para crear un país
export const createCountrySchema = z.object({
  name: z.string()
    .min(1, "El nombre del país es requerido")
    .max(100, "El nombre del país no puede exceder 100 caracteres"),
  isoCode: z.string()
    .min(2, "El código ISO debe tener al menos 2 caracteres")
    .max(3, "El código ISO no puede exceder 3 caracteres")
    .toUpperCase()
});

// Schema para actualizar un país
export const updateCountrySchema = z.object({
  name: z.string()
    .min(1, "El nombre del país es requerido")
    .max(100, "El nombre del país no puede exceder 100 caracteres")
    .optional(),
  isoCode: z.string()
    .min(2, "El código ISO debe tener al menos 2 caracteres")
    .max(3, "El código ISO no puede exceder 3 caracteres")
    .toUpperCase()
    .optional()
});

// Schema para validar ID de país
export const countryIdSchema = z.object({
  id: z.coerce.number().positive("El ID del país debe ser un número positivo")
});

// Tipos TypeScript para esquemas de validación
export type CreateCountryType = z.infer<typeof createCountrySchema>;
export type UpdateCountryType = z.infer<typeof updateCountrySchema>;
export type CountryIdType = z.infer<typeof countryIdSchema>;

// Tipos TypeScript para base de datos
export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;
export type UpdateCountry = Partial<NewCountry>;

// ================================
// FUNCIONES DE CONSULTA
// ================================

// Obtener todos los países
export const getCountries = async (): Promise<Country[]> => {
  try {
    const data = await db
      .query
      .countries
      .findMany({
        orderBy: (countries, { asc }) => [asc(countries.name)]
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching countries: ${error}`);
  }
};

// Obtener país por ID
export const getCountryById = async (id: Country['id']): Promise<Country | undefined> => {
  try {
    const data = await db
      .query
      .countries
      .findFirst({
        where: eq(countries.id, id)
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching country: ${error}`);
  }
};

// Obtener país por código ISO
export const getCountryByIsoCode = async (isoCode: string): Promise<Country | undefined> => {
  try {
    const data = await db
      .query
      .countries
      .findFirst({
        where: eq(countries.isoCode, isoCode.toUpperCase())
      });
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching country by ISO code: ${error}`);
  }
};

// Crear un país
export const createCountry = async ({ name, isoCode }: NewCountry) => {
  try {
    const data = await db
      .insert(countries)
      .values({
        name,
        isoCode: isoCode.toUpperCase()
      })
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error creating country: ${error}`);
  }
};

// Actualizar un país
export const updateCountry = async (id: Country['id'], { name, isoCode }: UpdateCountry) => {
  try {
    const data = await db
      .update(countries)
      .set({
        name,
        isoCode: isoCode ? isoCode.toUpperCase() : undefined
      })
      .where(eq(countries.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error updating country: ${error}`);
  }
};

// Eliminar un país
export const deleteCountry = async (id: Country['id']) => {
  try {
    const data = await db
      .delete(countries)
      .where(eq(countries.id, id))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error deleting country: ${error}`);
  }
};
