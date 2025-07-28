
import { eq } from 'drizzle-orm';
import { location } from '../db/schema';
import { db } from '..';

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;
export type UpdateLocation = Partial<NewLocation>;

export const  getLocations = async (): Promise<Location[]> => {
    try {
      const data = await db
        .query
        .location
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching locations: ${error}`);
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