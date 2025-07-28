'use client';
import { Bookmark, Check, Link } from 'lucide-react'
import React, { useState } from 'react'

export default function JobAction() {

    const [pasting, setPasting] = useState(false);
    
    const handlePaste = async () => {
        setPasting(true);
        await navigator.clipboard.writeText('test')
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
