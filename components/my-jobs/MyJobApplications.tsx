'use client';
import { jobsApi } from '@/app/services/api';
import useMyJobTab from '@/hooks/use-my-job';
import { Building2, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge';
import { statusInterview } from '@/lib/consts';
import MyJobLoading from './MyJobLoading';
import JobMessage from '../jobs/JobMessage';

export default function MyJobApplications({ userId }: { userId: number }) {

    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = React.useState<any[]>([]);
    
        const fetchData = async (id: number) => {
            try {
                const data = await jobsApi.getFollowUpsByUserId(id.toString());
                console.log(data.data);
                setJobs(data.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
            if (userId) {
                fetchData(userId);
            }
    
        }, [])

    if (loading) return <MyJobLoading className='mt-4' />;

    if (jobs.length === 0) return <JobMessage className='mt-6' >No hay postulaciones añadidas</JobMessage>;

    return (
        <ul className='py-8 grid gap-4'>
            {jobs.map((job) => (
          
                 <li className="my-job" key={job.id}>
                        <div className="my-job__top">
                            <div className="my-job__icon">
                                <Send />
                            </div>
                        <div className="my-job__body">
                            <div className="my-job__info">
                                <span className="my-job__enterprise">{job?.job.enterprise.name}</span>
                                <h3 className="my-job__title">{job?.job.title}</h3>
                                <span className="my-job__description">
                                    {job.job.description}
                                </span>
                            </div>
                        </div>
                        </div>
                        <Badge className='ml-auto text-white' >
                            {statusInterview[job.status as keyof typeof statusInterview]}
                        </Badge>
                        
                    </li>
                
            ))}
        </ul>
    )
}
