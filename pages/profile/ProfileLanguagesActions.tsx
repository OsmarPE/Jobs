'use client'

import { Pencil } from "lucide-react"
import ProfileLanguagesEdit from "./ProfileLanguagesEdit"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProfileLanguagesActions() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-languages'))

    return (
        <>
            <button className="profile__edit" onClick={() => router.push('/profile?add-languages=true', {
                scroll: false,
            })}>
                <Pencil />
            </button>
            <ProfileLanguagesEdit open={open} />
        </>
    )
}
