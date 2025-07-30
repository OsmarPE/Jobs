
import Job from "@/components/jobs/Job";

export default async function Jobs() {
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/job',{
        cache: 'no-cache',
    })
    const data = await response.json()
    const jobs = data.message

   
    return (
        <section className="jobs__results">

            {
                jobs?.map((job: any) => (
                    <Job
                        key={job.id}
                        enterprise={job.enterprise.name}
                        location={job.location.city}
                        schedule={job.schedule.name}
                        timeJob={job.timeJob.name}
                        typeJob={job.typeJob.name}
                        title={job.title}
                        salaryMin={job.salaryMin}
                        salaryMax={job.salaryMax}
                        description={job.description}
                        jobSkills={job?.jobSkills}
                        jobLanguages={job?.jobLanguages}
                        followUps={job?.followUps}
                        turnJobs={job.turnJobs}
                        noVacancies={job.noVacancies}
                    />
                )
                )
            }
          
        </section>
    )
}
