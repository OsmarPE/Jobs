
import Circle from "@/components/landing/Circle";
import { getUserByToken } from "@/lib/auth";
import AppyJob from "@/pages/apply-job/AppyJob";
import { getUserById } from "@/src/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;
  const user = await getUserByToken<{ id: number }>();

  if (!user) return redirect('/');

  const findUser = await getUserById(user.id);

  if (!findUser) return redirect('/');

  const { name, email, phone, cv } = findUser;
  
  return <AppyJob user={findUser} />
}
