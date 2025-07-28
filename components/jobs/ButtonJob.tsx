'use client';

import { useJobCurrent } from "@/hooks/use-job-current";
import { Button } from "../ui/button";

export default function ButtonJob() {
    
    const { setJobCurrent } = useJobCurrent();

    const handleShowJobCurrent = () => {
        setJobCurrent({});
    }

    return (
        <Button onClick={handleShowJobCurrent} className="job__btn btn btn--primary">Ver más</Button>
    )
}
