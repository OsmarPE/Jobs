
import { eq, and } from 'drizzle-orm';
import { languages, userLanguages, users } from '../db/schema';
import { db } from '..';

export type Languages = typeof languages.$inferSelect;
export type NewLanguages = typeof languages.$inferInsert;
export type UpdateLanguages = Partial<NewLanguages>;

export type UserLanguages = typeof userLanguages.$inferSelect;
export type NewUserLanguages = typeof userLanguages.$inferInsert;


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

// Funciones para manejar user_languages
export const getUserLanguages = async (userId: number) => {
  try {
    const data = await db
      .query
      .users
      .findFirst({
        where: eq(users.id, userId),
        with: {
          languages: {
            with: {
              language: true
            }
          }
        }
      });
    
    return data?.languages || [];
  } catch (error) {
    throw new Error(`Error fetching user languages: ${error}`);
  }
}

export const addLanguageToUser = async (userId: number, languageId: number) => {
  try {
    const data = await db
      .insert(userLanguages)
      .values({
        userId,
        languageId
      })
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error adding language to user: ${error}`);
  }
}

export const removeLanguageFromUser = async (userId: number, languageId: number) => {
  try {
    const data = await db
      .delete(userLanguages)
      .where(
        and(
          eq(userLanguages.userId, userId),
          eq(userLanguages.languageId, languageId)
        )
      )
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error removing language from user: ${error}`);
  }
}