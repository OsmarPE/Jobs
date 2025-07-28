
import { eq } from 'drizzle-orm';
import { skills } from '../db/schema';
import { db } from '..';

export type Skills = typeof skills.$inferSelect;
export type NewSkills = typeof skills.$inferInsert;
export type UpdateSkills = Partial<NewSkills>;


export const  getSkills = async (): Promise<Skills[]> => {
    try {
      const data = await db
        .query
        .skills
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching skillss: ${error}`);
    }

}

export const getSkillss = async (id: Skills['id']) => {
  try {
    const data = await db
      .query
      .skills
      .findFirst({
        where: eq(skills.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching skills: ${error}`);
  }
}

export const createSkills = async ({ name }: NewSkills) => {
  try {
    const data = await db
      .insert(skills)
      .values({
        name
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating skills: ${error}`);
  }
}

export const updateSkills = async (id: Skills['id'], { name }: UpdateSkills) => {
  try {
    const data = await db
      .update(skills)
      .set({
        name
      })
      .where(eq(skills.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating skills: ${error}`);
  }
}

export const deleteSkills = async (id: Skills['id']) => {
  try {
    const data = await db
      .delete(skills)
      .where(eq(skills.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting skills: ${error}`);
  }
}