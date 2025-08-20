'use client'

import { Pencil } from "lucide-react"
import ProfileCVEdit from "./ProfileCVEdit"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProfileCVAction({userId}:{userId:number}) {

  const router = useRouter()
  const search = useSearchParams()
  const open = search?.get('edit-cv') == 'true'

  return (
    <>
        <button className="profile__edit" onClick={() => router.push('?edit-cv=true', { scroll: false })}>
            <Pencil />
        </button>
       {open && <ProfileCVEdit userId={userId} />}
    </>
  )
}
