import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';
import { useJobCurrent } from '@/hooks/use-job-current';
import { Check } from 'lucide-react';

export default function JobDetailsButton({ id }: { id: string }) {

    const router = useRouter();
    const { closeModal } = useJobCurrent();

    const handleClick = () => {

        const token = getCookie('token');
        if (!token) {
            closeModal();
            return router.push('?auth=true',{ scroll: false });
        }
        router.push(`/apply-job/${id}`);
    };

    const followUpCookie = getCookie('followUp');
    
    const followUp = followUpCookie ? JSON.parse(decodeURIComponent(followUpCookie)) : [];
    const isPostulated = followUp?.some((item: { jobId: number }) => item.jobId === +id);

    if (isPostulated) {
        return (
            <Button>
                <Check /> Postulado
            </Button>
        );
    }

    return (
        <Button onClick={handleClick}>
            Postularse ahora
        </Button>
    )
}
