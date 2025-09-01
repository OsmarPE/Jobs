'use client';

import { useJobCurrent } from "@/hooks/use-job-current";
import { Button } from "../ui/button";
import { JobType } from "@/types";
import { getCookie } from "@/lib/utils";
import { redirect } from "next/navigation";

type Props = {job: JobType};

export default function ButtonJob({job}: Props) {
    
    const { setJobCurrent } = useJobCurrent();

    const handleShowJobCurrent = () => {
        setJobCurrent(job);
    }

    return (
        <Button onClick={handleShowJobCurrent} className="job__btn btn btn--primary">Ver más</Button>
    )
}
