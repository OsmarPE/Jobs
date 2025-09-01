
import Job from "@/components/jobs/Job";
import JobAuthWarning from "@/components/jobs/JobAuthWarning";
import { JobPagination } from "@/components/jobs/JobPagination";
import { getUserByToken } from "@/lib/auth";
import { getJobs } from "@/src/schemas/job";
import { JobType  } from "@/types";

export default async function Jobs({ auth, typeJob,location}: { auth?: string, location?: number, typeJob?: number }) {
    
    const data = await getJobs({typeJob,location})
    const jobs = data as unknown as JobType[]
    const user = await getUserByToken();

    return (
        <section className="jobs__results">

            {
                jobs?.map((job) => (
                    <Job
                        key={job.id}
                        enterprise={job.enterprise }
                        location={job?.location}
                        schedule={job?.schedule}
                        timeJob={job?.timeJob}
                        typeJob={job?.typeJob}
                        title={job.title}
                        salaryMin={job.salaryMin}
                        salaryMax={job.salaryMax}
                        description={job.description}
                        jobSkills={job?.jobSkills}
                        jobLanguages={job?.jobLanguages}
                        followUps={job?.followUps}
                        turnJobs={job.turnJobs}
                        noVacancies={job.noVacancies}
                        direction={job.direction}
                        usersBookmarks={job.usersBookmarks}
                        id={job.id}
                        createdAt={job.createdAt}
                        user={user}
                    />
                )
                )
            }
            {auth == 'true' && <JobAuthWarning />}
            <JobPagination />
        </section>
    )
}
