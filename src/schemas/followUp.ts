
import { eq } from 'drizzle-orm';
import { followUp } from '../db/schema';
import { db } from '..';

export type FollowUp = typeof followUp.$inferSelect;
export type NewFollowUp = typeof followUp.$inferInsert;
export type UpdateFollowUp = Partial<NewFollowUp>;


export const  getFollowUps = async (): Promise<FollowUp[]> => {
    try {
      const data = await db
        .query
        .followUp
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching followUps: ${error}`);
    }

}

export const getFollowUp = async (id: FollowUp['id']) => {
  try {
    const data = await db
      .query
      .followUp
      .findFirst({
        where: eq(followUp.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching followUp: ${error}`);
  }
}

export const createFollowUp = async ({ userId, jobId, status }: NewFollowUp) => {
  try {
    const data = await db
      .insert(followUp)
      .values({
        userId,
        jobId,
        status
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating followUp: ${error}`);
  }
}

export const updateFollowUp = async (id: FollowUp['id'], { userId, jobId, status }: UpdateFollowUp) => {
  try {
    const data = await db
      .update(followUp)
      .set({
        userId,
        jobId,
        status
      })
      .where(eq(followUp.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating followUp: ${error}`);
  }
}

export const deleteFollowUp = async (id: FollowUp['id']) => {
  try {
    const data = await db
      .delete(followUp)
      .where(eq(followUp.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting followUp: ${error}`);
  }
}