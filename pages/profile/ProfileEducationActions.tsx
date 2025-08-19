'use client'
import { Pencil, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileEducationAdd from './ProfileEducationAdd'
import ProfileEducationEdit from './ProfileEducationEdit'

export default function ProfileEducationActions({userId}: {userId: number}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-education'))
    const editOpen = Boolean(searchParams?.get('edit-education'))

    return (
        <div className="flex gap-4 items-center">
            <button className="profile__edit" onClick={() => router.push(`/profile?add-education=${userId}`, {
                scroll: false,
            })}>
                <Plus />
            </button>
            <button className="profile__edit" onClick={() => router.push(`/profile?edit-education=${userId}`, {
                scroll: false,
            })}>
                <Pencil />
            </button>
            <ProfileEducationAdd open={open} userId={userId} />
            {editOpen && <ProfileEducationEdit userId={userId} />}
        </div>
    )
}
