// lib/db/types.ts
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { User } from './src/schemas/user';


// User con relaciones
export type UserWithRelations = User & {
  location?: Location;
  student?: Student[];
  experiences?: Experience[];
  languages?: Languages[];
  interviews?: Interview[];
  followUps?: FollowUp[];
  skills?: SkillsUser[];
  educations?: Education[];
};

export type Languages = {
    userId: number ,
    languageId: number,
    language?: Language,
}

export type Education = {
    id: number | null,
    userId: number | null,
    institution: string | null,
    title: string | null,
    dateFrom: string | null,
    dateTo: string | null,
    finished: boolean | null,
}

// Job con relaciones
export type JobWithRelations =  {
  enterprise?: Enterprise;
  location?: Location;
  schedule?: Schedule;
  timeJob?: TimeJob;
  typeJob?: TypeJob;
  turnJobs?: TurnJob;
  jobSkills?: (JobSkill & { skill: Skill })[];
  jobLanguages?: (JobLanguage & { language: Language })[];
  followUps?: FollowUp[];
};

// Enterprise con relaciones
export type EnterpriseWithRelations = {
  jobs?: Job[];
  interviews?: Interview[];
  typePlan?: TypePlan;
};

// Student con relaciones
export type StudentWithRelations = {
  user?: User;
};

// Experience con relaciones
export type ExperienceWithRelations = {
  user?: User;
};


// Tipo para búsqueda de trabajos con filtros
export type JobSearchFilters = {
  title?: string;
  locationId?: number;
  enterpriseId?: number;
  scheduleId?: number;
  timeJobId?: number;
  typeJobId?: number;
  turnJobId?: number;
  salaryMin?: number;
  salaryMax?: number;
  skillIds?: number[];
  languageIds?: number[];
};

// Tipo para perfil completo de usuario
export type UserProfile = UserWithRelations & {
  location: Location;
  student: StudentWithRelations[];
  experiences: ExperienceWithRelations[];
  languages: (UserLanguage & { language: Language })[];
  skills: SkillsUser[];
};

export type JobType = {
    id: number;
    title: string | null;
    description: string | null;
    direction: string | null;
    salaryMin: string | null;
    salaryMax: string | null
    noVacancies: number | null;
    enterprise: Enterprise;
    location: Location;
    schedule: Schedule;
    timeJob?: TimeJob;
    typeJob?: TypeJob;
    turnJobs?: TurnJob;
    jobSkills?: JobSkill[];
    jobLanguages?: JobLanguage[];
    followUps: FollowUp[];
    createdAt: Date;
}

interface TimeJob{
    id: number;
    name: string;
}

interface TurnJob{
    id: number;
    name: string;
}

interface TypeJob{
    id: number;
    name: string;
}

interface Schedule{
    id: number;
    name: string;
}

interface Skill{
    id: number;
    name: string
}

interface JobLanguage{
    id: number;
    languageId: number;
    jobId: number;
    language?: Language;
}

interface Language{
    id: number;
    name: string;
}

interface UserLanguage{
    id: number;
    userId: number | null;
    languageId: number;
    language?: Language;
}

interface FollowUp{
    id: number;
    userId: number | null;
    jobId: number;
    status: string;
}

interface JobSkill{
    id: number;
    skillId: number;
    jobId: number;
    skill?: Skill;
}

interface Enterprise{
    name: string;
    email: string;
    phone: string;
    location: string;
    direction: string;
    description: string;
    logo: string;
    pageWeb: string;
    typePlanId: number;
}

interface Location{
    id: number;
    city: string;
    country: string;
    code: string;
}

// Formulario de registro de usuario
export type UserRegistrationForm = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  locationId: number;
  direction?: string;
};

export type Experience = {
    id: number | null,
    userId: number | null,
    dateFrom: string | null,
    dateTo: string | null,
    currentJob: boolean | null,
    area: string | null,
    areaJob: string | null,
}

// Formulario de trabajo
export type JobForm = {
  title: string;
  enterpriseId: number;
  locationId: number;
  direction?: string;
  scheduleId?: number;
  timeJobId?: number;
  typeJobId?: number;
  turnJobId?: number;
  salaryMin?: number;
  salaryMax?: number;
  description?: string;
  noVacancies?: number;
  skillIds?: number[];
  languageIds?: number[];
};

// Formulario de empresa
export type EnterpriseForm = {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  direction?: string;
  description?: string;
  logo?: string;
  pageWeb?: string;
  typePlanId?: number;
};

// ================================
// TIPOS DE RESPUESTA API
// ================================

// Respuesta estándar de API
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Respuesta paginada
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ================================
// ENUMS Y CONSTANTES
// ================================

// Status para follow-up
export enum FollowUpStatus {
  APPLIED = 'applied',
  REVIEWING = 'reviewing',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEW_COMPLETED = 'interview_completed',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  WITHDRAWN = 'withdrawn'
}

// Tipos de trabajo común
export enum CommonJobTypes {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance'
}

// Turnos de trabajo común
export enum CommonJobTurns {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night',
  ROTATING = 'rotating',
  FLEXIBLE = 'flexible'
}