'use client'
import useMyJobTab from "@/hooks/use-my-job";
import { useState } from "react"


const tabs = [
    'Mis favoritos',
    'Postulaciones',
    'Entrevistas'
];

export default function MyJobList() {


    const { index, setIndex }  = useMyJobTab()

    return (
        <div className="my-jobs__tabs">
            {tabs.map((tab, tabIndex) => (
                <button 
                    key={tabIndex}
                    className={`my-jobs__tab ${tabIndex === index ? 'active' : ''}`}
                    onClick={() => setIndex(tabIndex)}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}
