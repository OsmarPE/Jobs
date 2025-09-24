
import Job from "@/components/jobs/Job";
import JobAuthWarning from "@/components/jobs/JobAuthWarning";
import { JobPagination } from "@/components/jobs/JobPagination";
import Message from "@/components/ui/message";
import { getUserByToken } from "@/lib/auth";
import { getJobs } from "@/src/schemas/job";
import { JobType  } from "@/types";
import { AlertCircle } from "lucide-react";

export default async function Jobs({ auth, typeJob,location, minPrice, maxPrice, page }: { auth?: string, location?: number, typeJob?: number, minPrice?: number, maxPrice?: number, page?: number }) {

    const data = await getJobs({typeJob,location,salaryMin: minPrice, salaryMax: maxPrice, limit: 10, page: page ?? 1})
    const jobs = data?.data as unknown as JobType[]
    const user = await getUserByToken();

    if (jobs?.length === 0){
        return (
            <Message>No se encontraron trabajos</Message>
        )
    }

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
            <JobPagination totalPages={data?.totalPages} pageCurrent={data?.page} />
        </section>
    )
}
