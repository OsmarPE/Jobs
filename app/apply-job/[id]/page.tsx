
import Circle from "@/components/landing/Circle";
import { getUserByToken } from "@/lib/auth";
import AppyJob from "@/pages/apply-job/AppyJob";
import { getJob } from "@/src/schemas/job";
import { getUserById } from "@/src/schemas/user";
import { JobType } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;
  const user = await getUserByToken<{ id: number }>();

  if (!user) return redirect('/');

  const findUser = await getUserById(user.id);

  if (!findUser) return redirect('/');

  const findFollowUp = findUser.followUps?.find(followUp => followUp.jobId === +id);

  if (findFollowUp) return redirect('/');

  const job = await getJob(+id);

  if (!job) return redirect('/');

  return <AppyJob user={findUser} jobId={id} job={job as unknown as JobType} />
}
