'use client'
import useMyJobTab from "@/hooks/use-my-job"
import { useState } from "react"
import MyJobsFavorites from "./MyJobsFavorites"
import MyJobApplications from "./MyJobApplications"
import MyJobInterview from "./MyJobInterview"



export default function MyJobTabs({jobs, user}: { jobs: any[], user: any }) {

    const { index }  = useMyJobTab()

    return (
        <>
           {index === 0 && <MyJobsFavorites jobs={jobs} />}
            {index === 1 && <MyJobApplications userId={user?.id ?? 0} />}
            {index === 2 && <MyJobInterview  />}
        </>
    )
}
