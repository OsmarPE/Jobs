'use client';
import { JobType } from "@/types";
import { createContext, useState } from "react";

interface JobContextType {
    showModal: boolean;
    setJobCurrent: (job: JobType | null) => void;
    closeModal: () => void;
    job: JobType | null;
}

export const JobContext = createContext<JobContextType>({
    showModal: false,
    closeModal: () => {},
    setJobCurrent: (job: JobType | null) => {},
    job: null,
});


const JobProvider = ({ children }: { children: React.ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [job, setJob] = useState<JobType | null>(null);


    const setJobCurrent = (job: JobType | null) => {
        setJob(job);
        setShowModal(true);
    };

    const deleteJob = () => {
        setJob(null);
        setShowModal(false);
    };

    const closeModal = () => {
        setJob(null);
        setShowModal(false);
    };


    return (
        <JobContext.Provider
            value={{
                showModal,
                setJobCurrent,
                closeModal,
                job,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export default JobProvider;
