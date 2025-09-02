import { useClipboard } from '@/hooks/use-clipboard';
import { getLinkDetailsJob } from '@/lib/utils';
import { Bookmark, Check, LinkIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function JobDetailsSocials({ id }: { id: string }) {

    const { coping, copyToClipboard } = useClipboard({ time: 5000 });

    const handleCopyLink = () => {
        const link = getLinkDetailsJob(id);
        copyToClipboard(link);
    };

    return (
        <div className="details__socials">
            <button className="details__socials-btn">
                <Bookmark />
            </button>
            <button className="details__socials-btn" onClick={handleCopyLink}>
                {coping ? <Check /> : <LinkIcon />}
            </button>
        </div>
    )
}
