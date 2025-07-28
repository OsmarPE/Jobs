import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { category, experience, skills, turnJob, typeJob, typePlan, users, enterprise, location, job, interview, followUp, languages } from './db/schema';

export const db = drizzle(process.env.DATABASE_URL!,{
    schema: {
        users,
        category,
        enterprise,
        location,
        job,
        skills,
        turnJob,
        typeJob,
        typePlan,
        experience,
        interview,
        followUp,
        languages,
    },
});
