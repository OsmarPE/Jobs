'use client';
import { createContext, useState } from "react";

export const JobContext = createContext({
    showModal: false,
    deleteJob: () => {},
    setJobCurrent: (job: any) => {},
    job: null,
});



const JobProvider = ({ children }: { children: React.ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [job, setJob] = useState(null);


    const setJobCurrent = (job: any) => {
        setJob(job);
        setShowModal(true);
    };

    const deleteJob = () => {
        setJob(null);
        setShowModal(false);
    };


    return (
        <JobContext.Provider
            value={{
                showModal,
                setJobCurrent,
                deleteJob,
                job,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export default JobProvider;
