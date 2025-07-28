
import { eq } from 'drizzle-orm';
import { job } from '../db/schema';
import { db } from '..';

export type Job = typeof job.$inferSelect;
export type NewJob = typeof job.$inferInsert;
export type UpdateJob = Partial<NewJob>;

export const  getJobs = async (): Promise<Job[]> => {
    try {
      const data = await db
        .query
        .job
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching jobs: ${error}`);
    }

}

export const getJob = async (id: Job['id']) => {
  try {
    const data = await db
      .query
      .job
      .findFirst({
        where: eq(job.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching job: ${error}`);
  }
}

export const createJob = async ({ enterpriseId, locationId, scheduleId, timeJobId, typeJobId, salaryMin, salaryMax, description, noVacancies }: NewJob) => {
  try {
    const data = await db
      .insert(job)
      .values({
        enterpriseId,
        locationId,
        scheduleId,
        timeJobId,
        typeJobId,
        salaryMin,
        salaryMax,
        description,
        noVacancies
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating job: ${error}`);
  }
}

export const updateJob = async (id: Job['id'], { enterpriseId, locationId, scheduleId, timeJobId, typeJobId, salaryMin, salaryMax, description, noVacancies }: UpdateJob) => {
  try {
    const data = await db
      .update(job)
      .set({
        enterpriseId,
        locationId,
        scheduleId,
        timeJobId,
        typeJobId,
        salaryMin,
        salaryMax,
        description,
        noVacancies
      })
      .where(eq(job.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating job: ${error}`);
  }
}

export const deleteJob = async (id: Job['id']) => {
  try {
    const data = await db
      .delete(job)
      .where(eq(job.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error deleting job: ${error}`);
  }
}