
import { eq } from 'drizzle-orm';
import { interview } from '../db/schema';
import { db } from '..';

export type Interview = typeof interview.$inferSelect;
export type NewInterview = typeof interview.$inferInsert;
export type UpdateInterview = Partial<NewInterview>;


export const  getInterviews = async (): Promise<Interview[]> => {
    try {
      const interviews = await db
        .query
        .interview
        .findMany();
      
      return interviews;
    } catch (error) {
      throw new Error(`Error fetching interviews: ${error}`);
    }

}

export const getInterview = async (id: Interview['id']) => {
  try {
    const interviewOne = await db
      .query
      .interview
      .findFirst({
        where: eq(interview.id, id)
      })
    
    return interviewOne;
  } catch (error) {
    throw new Error(`Error fetching interview: ${error}`);
  }
}

export const createInterview = async ({ name, email, phone }: NewInterview) => {
  try {
    const interviewOne = await db
      .insert(interview)
      .values({
        name,
        email,
        phone
      })
     
    return interviewOne;
  } catch (error) {
    throw new Error(`Error creating interview: ${error}`);
  }
}

export const updateInterview = async (id: Interview['id'], { name, email, phone }: UpdateInterview) => {
  try {
    const interviewOne = await db
      .update(interview)
      .set({
        name,
        email,
        phone
      })
      .where(eq(interview.id, id))
     
    return interviewOne;
  } catch (error) {
    throw new Error(`Error updating interview: ${error}`);
  }
}

export const deleteInterview = async (id: Interview['id']) => {
  try {
    const interviewOne = await db
      .delete(interview)
      .where(eq(interview.id, id))
     
    return interviewOne;
  } catch (error) {
    throw new Error(`Error deleting interview: ${error}`);
  }
}