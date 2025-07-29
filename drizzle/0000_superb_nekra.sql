CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "enterprise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(150),
	"phone" varchar(20),
	"location_id" varchar(100),
	"direction" varchar(200),
	"description" text,
	"logo" text,
	"page_web" varchar(255),
	"suscribed" boolean DEFAULT false,
	"type_plan_id" integer
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"date_from" date NOT NULL,
	"date_to" date,
	"current_job" boolean DEFAULT false,
	"area" varchar(100),
	"area_job" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "follow_up" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"job_id" integer,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(150),
	"phone" varchar(20),
	"enterprise_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"enterprise_id" integer,
	"location_id" integer NOT NULL,
	"direction" varchar(200),
	"schedule_id" integer,
	"time_job_id" integer,
	"type_job_id" integer,
	"turn_job_id" integer,
	"salary_min" numeric(10, 2),
	"salary_max" numeric(10, 2),
	"description" text,
	"no_vacancies" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "job_languages" (
	"job_id" integer NOT NULL,
	"language_id" integer NOT NULL,
	CONSTRAINT "job_languages_job_id_language_id_pk" PRIMARY KEY("job_id","language_id")
);
--> statement-breakpoint
CREATE TABLE "job_skills" (
	"job_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "job_skills_job_id_skill_id_pk" PRIMARY KEY("job_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "languages_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"code" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "skills_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "skills_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" varchar(100) NOT NULL,
	"grade" varchar(20),
	"date_from" date,
	"date_to" date,
	CONSTRAINT "student_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "time_job" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "time_job_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "turn_job" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "turn_job_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "type_job" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "type_job_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "type_plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "type_plan_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_languages" (
	"user_id" integer NOT NULL,
	"language_id" integer NOT NULL,
	CONSTRAINT "user_languages_user_id_language_id_pk" PRIMARY KEY("user_id","language_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(20),
	"avatar" text,
	"token" varchar(255),
	"cv" text,
	"active" boolean DEFAULT false,
	"location_id" integer NOT NULL,
	"direction" varchar(200),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "enterprise" ADD CONSTRAINT "enterprise_type_plan_id_type_plan_id_fk" FOREIGN KEY ("type_plan_id") REFERENCES "public"."type_plan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_up" ADD CONSTRAINT "follow_up_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_up" ADD CONSTRAINT "follow_up_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview" ADD CONSTRAINT "interview_enterprise_id_enterprise_id_fk" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_enterprise_id_enterprise_id_fk" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_schedule_id_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_time_job_id_time_job_id_fk" FOREIGN KEY ("time_job_id") REFERENCES "public"."time_job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_type_job_id_type_job_id_fk" FOREIGN KEY ("type_job_id") REFERENCES "public"."type_job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_turn_job_id_turn_job_id_fk" FOREIGN KEY ("turn_job_id") REFERENCES "public"."turn_job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_languages" ADD CONSTRAINT "job_languages_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_languages" ADD CONSTRAINT "job_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills_user" ADD CONSTRAINT "skills_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;