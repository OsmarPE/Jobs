
import { useContext } from "react";
import { JobContext } from "@/context/JobContext";

export const useJobCurrent = () => {
    const context = useContext(JobContext);
    
    if (!context) {
        throw new Error("useJobCurrent must be used within a JobProvider");
    }

    return context;

};