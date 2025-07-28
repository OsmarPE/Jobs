
import Job from "@/components/jobs/Job";
import JobDetailsModal from "@/components/jobs/JobDetailsModal";
import JobProvider from "@/context/JobContext";
import LinkedIn from "@/img/linkedin.png";


export default async function page() {

    return (
        <section className="jobs__results">
            <Job />
            <Job />
            <Job />
            <Job />
        </section>
    )
}
