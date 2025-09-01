'use client';
import api, { jobsApi } from '@/app/services/api';
import { cn } from '@/lib/utils';
import { Bookmark } from '@/types';
import { BookmarkIcon, Check, Link } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

type Props = {
    id: number;
    user: {
        id: number;
        name: string;
    } | null;
    usersBookmarks: Bookmark[]
};

export default function JobAction({ id, user, usersBookmarks }: Props) {

    const [pasting, setPasting] = useState(false);
    const [marked, setMarked] = useState(() => usersBookmarks?.some(bookmark => bookmark.userId === user?.id));
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handlePaste = async () => {
        setPasting(true);
        const LINK = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`
        await navigator.clipboard.writeText(LINK);
        setTimeout(() => {
            setPasting(false);
        }, 3000);
    };

    const handleMark = async () => {
        if (!user) {
            router.push('?auth=true');
            return;
        }
        setMarked(!marked);
        setLoading(true);
        try {
            if (marked) {
                const { message, success } = await jobsApi.deleteBookmark(id.toString());
                if (!success) {
                    toast.error(message);
                    return;
                }
                router.refresh();
                return;
            }
            const { message, success } = await jobsApi.createBookmark({ jobId: id, userId: user.id });
            if (!success) {
                toast.error(message);
                return;
            }
            router.refresh();
        } catch (error) {
            setMarked(prevState => !prevState);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job__actions">
            <button onClick={handlePaste} className="job__actions-btn" disabled={pasting}>
                {pasting ? <Check /> : <Link />}
            </button>
            <button onClick={handleMark} className={cn("job__actions-btn", { 'active': marked })} disabled={loading}>
                <BookmarkIcon />
            </button>
        </div>
    )
}
