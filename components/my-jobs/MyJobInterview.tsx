'use client';
import { useFetch } from '@/hooks/use-fetch';
import useMyJobTab from '@/hooks/use-my-job';
import React, { useState } from 'react'
import MyJobLoading from './MyJobLoading';
import JobMessage from '../jobs/JobMessage';

export default function MyJobInterview() {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    if (loading) return <MyJobLoading className='mt-4' />;

    if (!data || data.length === 0) return <JobMessage className='mt-6' >No hay entrevistas disponibles</JobMessage>;

    return (
        <div>MyJobInterview</div>
    )
}
