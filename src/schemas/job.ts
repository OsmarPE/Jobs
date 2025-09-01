
import { and, eq } from 'drizzle-orm';
import { job } from '../db/schema';
import { db } from '..';

export type Job = typeof job.$inferSelect;
export type NewJob = typeof job.$inferInsert;
export type UpdateJob = Partial<NewJob>;

interface JobFilters {
  location?: number;
  enterprise?: number;
  schedule?: number;
  timeJob?: number;
  typeJob?: number;
  skillNames?: string[];
  languageNames?: string[];
  isActive?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  limit?: number;
  offset?: number;
  page?: number;
}


export const  getJobs = async ( filters: JobFilters = { limit: 10 , page: 1} ): Promise<Job[]> => {

  const { typeJob, location, limit, page } = filters  
  const offset = (limit && page) ? limit * (page - 1) : 0;

    let where: any[] = []
    
    if (where){
      if(typeJob) where.push(eq(job.timeJobId, typeJob))
      if (location) where.push(eq(job.locationId, location))
    }
    
    try {
      const data = await db
        .query
        .job
        .findMany({
          where: (where.length > 0) ? and(...where) : undefined,
          with: {
            location: true,
            enterprise: true,
            schedule: true,
            timeJob: true,
            typeJob: true,
            usersBookmarks:true,
            jobSkills: {
              with:{
                skill: {
                  columns:{
                    name: true
                  }
                }
              }
            },
            turnJobs: true,
            jobLanguages: {
              with:{
                language: {
                  columns:{
                    name: true
                  }
                }
              }
            },
            
          },
          limit: filters.limit,
          offset: filters.offset
        });
      
        
        
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
        where: eq(job.id, id),
        with: {
          location: true,
          enterprise: true,
          schedule: true,
          timeJob: true,
          typeJob: true,
          jobSkills: {
            with: {
              skill: {
                columns: {
                  name: true
                }
              }
            }
          },
          turnJobs: true,
          jobLanguages: {
            with: {
              language: {
                columns: {
                  name: true
                }
              }
            }
          },
        }
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching job: ${error}`);
  }
}

export const createJob = async ({ enterpriseId, locationId, scheduleId, timeJobId, typeJobId, salaryMin, salaryMax, description, noVacancies,title }: NewJob) => {
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
        noVacancies,
        title
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
