import { getUserByToken } from "@/lib/auth";
import Profile from "@/pages/profile/Profile";
import { getProfile } from "@/src/schemas/user";
import { redirect } from "next/navigation";

export default async function page() {
  
  const data = await getUserByToken<{ id: number }>();
  const user = await getProfile(data?.id as number);

  if (!user) return redirect('/');

  return <Profile user={user} />
}
