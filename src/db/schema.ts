// lib/db/schema.ts
import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  boolean, 
  integer, 
  date, 
  decimal,
  timestamp,
  primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
// Tabla Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  avatar: text('avatar'),
  token: varchar('token', { length: 255 }),
  cv: text('cv'),
  active: boolean('active').default(false),
  locationId: integer('location_id').references(() => location.id),
  direction: varchar('direction', { length: 200 }),
  salary: decimal('salary', { precision: 10, scale: 2 }).default('0'),
  code: varchar('code', { length: 10 }),
  finishedRegistration: boolean('finished_registration').default(false),
});
// Tabla Location
export const location = pgTable('location', {
  id: serial('id').primaryKey(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  code: varchar('code', { length: 10 })
});


// Tabla Languages
export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique()
});

// Tabla Student
export const student = pgTable('student', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  name: varchar('name', { length: 100 }).notNull(),
  grade: varchar('grade', { length: 20 }),
  dateFrom: date('date_from'),
  dateTo: date('date_to'),
});


// Tabla Experience
export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  dateFrom: date('date_from').notNull(),
  dateTo: date('date_to'),
  currentJob: boolean('current_job').default(false),
  area: varchar('area', { length: 100 }),
  areaJob: varchar('area_job', { length: 100 })
});

// Tabla Skills
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  userId: integer('user_id').references(() => users.id).notNull(),
});


// Tabla Category
export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique()
});

// Tabla Schedule
export const schedule = pgTable('schedule', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => category.id),
  name: varchar('name', { length: 100 }).notNull()
});

// Tabla Time_Job
export const timeJob = pgTable('time_job', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique()
});

// Tabla Type_Job
export const typeJob = pgTable('type_job', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique()
});


// Tabla Type_Plan
export const typePlan = pgTable('type_plan', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

// Tabla Enterprise
export const enterprise = pgTable('enterprise', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 150 }),
  phone: varchar('phone', { length: 20 }),
  location:varchar('location_id', { length: 100 }),
  direction: varchar('direction', { length: 200 }),
  description: text('description'),
  logo: text('logo'),
  pageWeb: varchar('page_web', { length: 255 }),
  suscribed: boolean('suscribed').default(false),
  typePlanId: integer('type_plan_id').references(() => typePlan.id),
});

// Tabla Job
export const job = pgTable('job', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  enterpriseId: integer('enterprise_id').references(() => enterprise.id, { onDelete: 'cascade' }),
  locationId: integer('location_id').references(() => location.id).notNull(),
  direction: varchar('direction', { length: 200 }),
  scheduleId: integer('schedule_id').references(() => schedule.id),
  timeJobId: integer('time_job_id').references(() => timeJob.id),
  typeJobId: integer('type_job_id').references(() => typeJob.id),
  turnJobId: integer('turn_job_id').references(() => turnJob.id),
  salaryMin: decimal('salary_min', { precision: 10, scale: 2 }),
  salaryMax: decimal('salary_max', { precision: 10, scale: 2 }),
  description: text('description'),
  noVacancies: integer('no_vacancies').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  institution : varchar('institution', { length: 100 }).notNull(),
  title : varchar('title', { length: 100 }).notNull(),
  dateFrom: date('date_from'),
  dateTo: date('date_to'),
  finished: boolean('finished').default(false),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
});


// Tabla Turn_Job
export const turnJob = pgTable('turn_job', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique()
});

// Tablas intermedias para Job (N:N)
export const jobSkills = pgTable('job_skills', {
  jobId: integer('job_id').references(() => job.id, { onDelete: 'cascade' }).notNull(),
  skillId: integer('skill_id').references(() => skills.id, { onDelete: 'cascade' }).notNull()
}, (table) => ({
  pk: primaryKey({ columns: [table.jobId, table.skillId] })
}));


export const jobLanguages = pgTable('job_languages', {
  jobId: integer('job_id').references(() => job.id, { onDelete: 'cascade' }).notNull(),
  languageId: integer('language_id').references(() => languages.id, { onDelete: 'cascade' }).notNull()
}, (table) => ({
  pk: primaryKey({ columns: [table.jobId, table.languageId] })
}));

// Tabla Interview
export const interview = pgTable('interview', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 150 }),
  phone: varchar('phone', { length: 20 }),
  enterpriseId: integer('enterprise_id').references(() => enterprise.id, { onDelete: 'cascade' }).notNull(),
});

// Tabla Follow_Up
export const followUp = pgTable('follow_up', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  jobId: integer('job_id').references(() => job.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull()
});

// ================================
// RELACIONES
// ================================

// Relaciones para Users
export const usersRelations = relations(users, ({ one, many }) => ({
  location: one(location),
  student: many(student),
  experiences: many(experience),
  languages: many(userLanguages),
  interviews: many(interview),
  followUps: many(followUp),
  skills: many(skills),
  educations: many(education),
}));


// Relaciones para Student
export const studentRelations = relations(student, ({ one }) => ({
  user: one(users, {
    fields: [student.userId],
    references: [users.id]
  })
}));

// Relaciones para Experience
export const experienceRelations = relations(experience, ({ one }) => ({
  user: one(users, {
    fields: [experience.userId],
    references: [users.id]
  })
}));


export const educationRelations = relations(education, ({ one }) => ({
  user: one(users, {
    fields: [education.userId],
    references: [users.id]
  })
}));

export const skillsUserRelations = relations(skills, ({ one }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id]
  })
}));

// Relaciones para Enterprise
export const enterpriseRelations = relations(enterprise, ({ one, many }) => ({
  jobs: many(job),
  interviews: many(interview),
  typePlan: one(typePlan),
}));

// Relaciones para Job
export const jobRelations = relations(job, ({ one, many }) => ({
  enterprise: one(enterprise, {
    fields: [job.enterpriseId],
    references: [enterprise.id]
  }),
  location: one(location, {
    fields: [job.locationId],
    references: [location.id]
  }),
  schedule: one(schedule, {
    fields: [job.scheduleId],
    references: [schedule.id]
  }),
  timeJob: one(timeJob, {
    fields: [job.timeJobId],
    references: [timeJob.id]
  }),
  typeJob: one(typeJob, {
    fields: [job.typeJobId],
    references: [typeJob.id]
  }),
  jobSkills: many(jobSkills),
  jobLanguages: many(jobLanguages),
  followUps: many(followUp),
  turnJobs: one(turnJob, {
    fields: [job.turnJobId],
    references: [turnJob.id]
  })
}));


// Tabla intermedia User_Languages (N:N)
export const userLanguages = pgTable('user_languages', {
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  languageId: integer('language_id').references(() => languages.id, { onDelete: 'cascade' }).notNull()
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.languageId] })
}));
// Relaciones para Languages
export const languagesRelations = relations(languages, ({ many }) => ({
  jobLanguages: many(jobLanguages),
  userLanguages: many(userLanguages),
}));

// Relaciones para Skills
export const skillsRelations = relations(skills, ({ many }) => ({
  jobSkills: many(jobSkills)
}));

// Relaciones para las tablas intermedias
export const userLanguagesRelations = relations(userLanguages, ({ one }) => ({
  user: one(users, {
    fields: [userLanguages.userId],
    references: [users.id]
  }),
  language: one(languages, {
    fields: [userLanguages.languageId],
    references: [languages.id]
  })
}));

export const jobSkillsRelations = relations(jobSkills, ({ one }) => ({
  job: one(job, {
    fields: [jobSkills.jobId],
    references: [job.id]
  }),
  skill: one(skills, {
    fields: [jobSkills.skillId],
    references: [skills.id]
  })
}));

export const jobLanguagesRelations = relations(jobLanguages, ({ one }) => ({
  job: one(job, {
    fields: [jobLanguages.jobId],
    references: [job.id]
  }),
  language: one(languages, {
    fields: [jobLanguages.languageId],
    references: [languages.id]
  })
}));

export const followUpRelations = relations(followUp, ({ one }) => ({
  user: one(users, {
    fields: [followUp.userId],
    references: [users.id]
  }),
  job: one(job, {
    fields: [followUp.jobId],
    references: [job.id]
  })
}));

export const locationRelations = relations(location, ({ many }) => ({
  users: many(users),
  enterprises: many(enterprise),
  jobs: many(job)
}));

export const typePlanRelations = relations(typePlan, ({ one }) => ({
  enterprise: one(enterprise),
}));

