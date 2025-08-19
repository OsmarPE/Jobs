'use client'

import { useRouter, useSearchParams } from "next/navigation"
import ProfileUserEdit from "./ProfileUserEdit"

export default function ProfileUserAction({userId}: { userId: number }) {

  const router = useRouter();
  const search = useSearchParams();
  const isEditing = search?.get("editUser") === "true";

  return (
    <>
      <button className="profile__btn btn btn--small" onClick={() => router.push(`?editUser=true`, { scroll: false })}>
           Editar
      </button>
      {isEditing && <ProfileUserEdit userId={userId} />}
    </>
  )
}
