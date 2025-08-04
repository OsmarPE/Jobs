'use client';
import { Bookmark, Check, Link } from 'lucide-react'
import React, { useState } from 'react'

export default function JobAction({id}: {id: number}) {

    const [pasting, setPasting] = useState(false);
    
    const handlePaste = async () => {
        setPasting(true);
        const LINK = `${process.env.NEXT_PUBLIC_BASE_URL}/detail-job/${id}`
        await navigator.clipboard.writeText(LINK);
        setTimeout(() => {
            setPasting(false);
        }, 3000);
    };

    return (
        <div className="job__actions">
            <button onClick={handlePaste} className="job__actions-btn" disabled={pasting}>
                {pasting ? <Check /> : <Link />}
            </button>
            <button className="job__actions-btn">
                <Bookmark />
            </button>
        </div>
    )
}
