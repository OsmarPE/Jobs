
import Job from "@/components/jobs/Job";
import { JobType  } from "@/types";

export default async function Jobs() {
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/job',{
        cache: 'no-cache',
    })
    const data = await response.json()
    const jobs = data.message as JobType[]

   
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
                        id={job.id}
                        createdAt={job.createdAt}
                    />
                )
                )
            }
        </section>
    )
}
