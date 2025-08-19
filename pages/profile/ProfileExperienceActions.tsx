'use client'
import { Pencil, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileExperienceAdd from './ProfileExperienceAdd'
import ProfileExperienceEdit from './ProfileExperienceEdit'

export default function ProfileExperienceActions({userId}: {userId: number}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-experience'))
    const showEdit = Boolean(searchParams?.get('edit-experience'))

    return (
        <div className="flex gap-4 items-center">
            <button className="profile__edit" onClick={() => router.push(`/profile?add-experience=${userId}`, {
                scroll: false,
            })}>
                <Plus />
            </button>
            <button className="profile__edit" onClick={() => router.push(`/profile?edit-experience=${userId}`, {
                scroll: false,
            })}>
                <Pencil />
            </button>
            <ProfileExperienceAdd open={open} userId={userId} />
            {showEdit &&<ProfileExperienceEdit userId={userId} />}
        </div>
    )
}
