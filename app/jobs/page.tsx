import Jobs from "@/pages/jobs/Jobs";

export default async function page({ searchParams }: { searchParams: Promise<{ auth: string }> }) {

  const { auth } = await searchParams

  return <Jobs auth={auth} />
}
