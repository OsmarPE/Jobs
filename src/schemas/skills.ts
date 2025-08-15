
import { eq } from 'drizzle-orm';
import { skills, users } from '../db/schema';
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

export const createSkills = async ({ name , userId}: NewSkills) => {
  try {
    const data = await db
      .insert(skills)
      .values({
        name,
        userId
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

export const getSkillsByUserId = async (userId: number) => {
  try {
    // Opción 1: Usando query builder con relaciones (más simple)
    const userData = await db
      .query
      .users
      .findFirst({
        where: eq(users.id, userId),
        with: {
          skills: true
        }
      });
    
    return userData?.skills || [];
  } catch (error) {
    throw new Error(`Error fetching skills by user ID: ${error}`);
  }
}



// Función para agregar una skill a un usuario
export const addSkillToUser = async (userId: number, skillName: string) => {
  try {
    const data = await db
      .insert(skills)
      .values({
        userId,
        name: skillName
      })
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error adding skill to user: ${error}`);
  }
}

// Función para remover una skill de un usuario
export const removeSkillFromUser = async (userId: number, skillId: number) => {
  try {
    const data = await db
      .delete(skills)
      .where(eq(skills.id, skillId))
      .returning();
     
    return data[0];
  } catch (error) {
    throw new Error(`Error removing skill from user: ${error}`);
  }
}

