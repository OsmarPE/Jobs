
import { desc, eq } from 'drizzle-orm';
import { location } from '../db/schema';
import { db } from '..';

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;
export type UpdateLocation = Partial<NewLocation>;

type locationFilters = {
  country?: string;
  city?: string;
  code?: string;
}

export const  getLocations = async ( filter?: locationFilters): Promise<Location[]> => {

  const { city, country, code } = filter || {};

    try {
      const data = await db
        .query
        .location
        .findMany({
       
        });

      return data;
    } catch (error) {
      throw new Error(`Error fetching locations: ${error}`);
    }

}

export const getCountries = async () => {
  try {
    const data = await db.select({ name: location.country }).from(location).groupBy(location.country);
    return data;
  } catch (error) {
    throw new Error(`Error fetching countries: ${error}`);
  }
}

export const getCitiesByCountry = async (country: string) => {
  try {
    const data = await db.select({ id: location.id, name: location.city }).from(location).where(eq(location.country, country)).orderBy(desc(location.city));
    return data;
  } catch (error) {
    throw new Error(`Error fetching cities by country: ${error}`);
  }
}

export const getLocation = async (id: Location['id']) => {
  try {
    const data = await db
      .query
      .location
      .findFirst({
        where: eq(location.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching location: ${error}`);
  }
}

export const createLocation = async ({ city, country, code }: NewLocation) => {
  try {
    const data = await db
      .insert(location)
      .values({
        city,
        country,
        code
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating location: ${error}`);
  }
}

export const updateLocation = async (id: Location['id'], { city, country, code }: UpdateLocation) => {
  try {
    const data = await db
      .update(location)
      .set({
        city,
        country,
        code
      })
      .where(eq(location.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating location: ${error}`);
  }
}

export const deleteLocation = async (id: Location['id']) => {
  try {
    const data = await db
      .delete(location)
      .where(eq(location.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting location: ${error}`);
  }
}