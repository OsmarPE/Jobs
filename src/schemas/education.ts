import { eq } from "drizzle-orm";
import { db } from "..";
import { education } from "../db/schema";

export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
export type UpdateEducation = Partial<NewEducation>;

export const getEducations = async (): Promise<Education[]> => {
    try {
      const data = await db
        .select()
        .from(education);
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching educations: ${error}`);
    }
}

export const getEducationById = async (id: Education['id']) => {
  try {
    const data = await db
      .select()
      .from(education)
      .where(eq(education.id, id));
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching education: ${error}`);
  }
}

export const getEducationsByUserId = async (userId: NonNullable<Education['userId']>) => {
  try {
    const data = await db
      .select()
      .from(education)
      .where(eq(education.userId, userId));
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching educations by user ID: ${error}`);
  }
}

export const createEducation = async (educationData: NewEducation) => {
  try {
    const data = await db
      .insert(education)
      .values(educationData);
     
    return data;
  } catch (error) {
    throw new Error(`Error creating education: ${error}`);
  }
}

export const updateEducation = async (id: Education['id'], educationData: UpdateEducation) => {
  try {
    const data = await db
      .update(education)
      .set(educationData)
      .where(eq(education.id, id));
     
    return data;
  } catch (error) {
    throw new Error(`Error updating education: ${error}`);
  }
}

export const deleteEducation = async (id: Education['id']) => {
  try {
    const data = await db
      .delete(education)
      .where(eq(education.id, id));
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting education: ${error}`);
  }
}