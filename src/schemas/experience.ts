import { eq } from 'drizzle-orm';
import { experience, users } from '../db/schema';
import { db } from '..';

export type Experience = typeof experience.$inferSelect;
export type NewExperience = typeof experience.$inferInsert;
export type UpdateExperience = Partial<NewExperience>;

export const getExperiences = async (): Promise<Experience[]> => {
    try {
      const data = await db
        .select()
        .from(experience);
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching experiences: ${error}`);
    }
}

// Obtener experiencias con información del usuario relacionado
export const getExperiencesWithUser = async () => {
    try {
        const data = await db
            .select({
                id: experience.id,
                userId: experience.userId,
                dateFrom: experience.dateFrom,
                dateTo: experience.dateTo,
                currentJob: experience.currentJob,
                area: experience.area,
                areaJob: experience.areaJob,
                user: {
                    id: users.id,
                    name: users.name,
                    email: users.email
                }
            })
            .from(experience)
            .leftJoin(users, eq(experience.userId, users.id));

        return data;
    } catch (error) {
        throw new Error(`Error fetching experiences with user: ${error}`);
    }
}

export const getExperienceById = async (id: Experience['id']) => {
  try {
    const data = await db
      .select()
      .from(experience)
      .where(eq(experience.id, id));
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching experience: ${error}`);
  }
}

export const getExperiencesByUserId = async (userId: NonNullable<Experience['userId']>) => {
  try {
    const data = await db
      .select()
      .from(experience)
      .where(eq(experience.userId, userId));
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching experiences by user ID: ${error}`);
  }
}

export const createExperience = async (experienceData: NewExperience) => {
  try {
    const data = await db
      .insert(experience)
      .values(experienceData);
     
    return data;
  } catch (error) {
    throw new Error(`Error creating experience: ${error}`);
  }
}

export const updateExperience = async (id: Experience['id'], experienceData: UpdateExperience) => {
  try {
    const data = await db
      .update(experience)
      .set(experienceData)
      .where(eq(experience.id, id));
     
    return data;
  } catch (error) {
    throw new Error(`Error updating experience: ${error}`);
  }
}

export const deleteExperience = async (id: Experience['id']) => {
  try {
    const data = await db
      .delete(experience)
      .where(eq(experience.id, id));
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting experience: ${error}`);
  }
}
