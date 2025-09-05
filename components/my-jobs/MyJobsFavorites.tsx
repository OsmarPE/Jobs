'use client'
import MyJobsActions from '@/components/my-jobs/MyJobsActions'
import { Button } from '@/components/ui/button'
import useMyJobTab from '@/hooks/use-my-job'
import { JobType } from '@/types'
import { Building2, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function MyJobsFavorites({ jobs }: { jobs: JobType[] }) {


  return (
    <ul className="my-jobs__list">
            {
                jobs.map(job => (
                    <li className="my-job" key={job.id}>
                        <div className="my-job__top">

                            <div className="my-job__icon">
                                <Building2 />
                            </div>
                        <div className="my-job__body">
                            <div className="my-job__info">
                                <span className="my-job__enterprise">{job?.enterprise.name}</span>
                                <h3 className="my-job__title">{job?.title}</h3>
                                <span className="my-job__location">
                                    <MapPin width={14} height={14} />
                                    <span>{'Ubicación no disponible'}</span>
                                </span>
                            </div>
                            <MyJobsActions id={job.id} />
                        </div>
                        </div>
                        <Button className="my-job__button" asChild>
                            <Link href={`/apply-job/${job.id}`}>
                                Postularme
                            </Link>
                        </Button>
                        
                    </li>
                ))
            }
        </ul>
  )
}
