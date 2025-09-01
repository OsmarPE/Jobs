
import { eq } from 'drizzle-orm';
import { enterprise } from '../db/schema';
import { db } from '..';

export type Enterprise = typeof enterprise.$inferSelect;
export type NewEnterprise = typeof enterprise.$inferInsert;
export type UpdateEnterprise = Partial<NewEnterprise>;

export const  getEnterprises = async (): Promise<Enterprise[]> => {
    try {
      const data = await db
        .query
        .enterprise
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching enterprises: ${error}`);
    }

}

export const getEnterprise = async (id: Enterprise['id']) => {
  try {
    const data = await db
      .query
      .enterprise
      .findFirst({
        where: eq(enterprise.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching enterprise: ${error}`);
  }
}

export const createEnterprise = async ({ name, email, phone, location, description, logo, pageWeb }: NewEnterprise) => {
  try {
    const data = await db
      .insert(enterprise)
      .values({
        name,
        email,
        phone,
        location,
        description,
        logo,
        pageWeb,
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating enterprise: ${error}`);
  }
}

export const updateEnterprise = async (id: number, { name, email, phone, location, description, logo, pageWeb }: UpdateEnterprise) => {
  try {
    const data = await db
      .update(enterprise)
      .set({
        name,
        email,
        phone,
        location,
        description,
        logo,
        pageWeb
      })
      .where(eq(enterprise.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating enterprise: ${error}`);
  }
}

export const deleteEnterprise = async (id: Enterprise['id']) => {
  try {
    const data = await db
      .delete(enterprise)
      .where(eq(enterprise.id, id))
    
    return data;
  } catch (error) {
    throw new Error(`Error deleting enterprise: ${error}`);
  }
}