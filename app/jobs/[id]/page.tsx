import Job from "@/components/jobs/Job";

export default async function page({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    return (
        <section className="jobs__results">
            <Job />
        </section>
    )
}
