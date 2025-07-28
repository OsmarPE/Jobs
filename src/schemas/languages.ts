
import { eq } from 'drizzle-orm';
import { languages } from '../db/schema';
import { db } from '..';

export type Languages = typeof languages.$inferSelect;
export type NewLanguages = typeof languages.$inferInsert;
export type UpdateLanguages = Partial<NewLanguages>;


export const  getLanguages = async (): Promise<Languages[]> => {
    try {
      const data = await db
        .query
        .languages
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching languagess: ${error}`);
    }

}

export const getLanguagess = async (id: Languages['id']) => {
  try {
    const data = await db
      .query
      .languages
      .findFirst({
        where: eq(languages.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching languages: ${error}`);
  }
}

export const createLanguages = async ({ name }: NewLanguages) => {
  try {
    const data = await db
      .insert(languages)
      .values({
        name
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating languages: ${error}`);
  }
}

export const updateLanguages = async (id: Languages['id'], { name }: UpdateLanguages) => {
  try {
    const data = await db
      .update(languages)
      .set({
        name
      })
      .where(eq(languages.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating languages: ${error}`);
  }
}

export const deleteLanguages = async (id: Languages['id']) => {
  try {
    const data = await db
      .delete(languages)
      .where(eq(languages.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting languages: ${error}`);
  }
}