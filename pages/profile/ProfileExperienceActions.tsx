'use client'
import { Pencil, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileEducationAdd from './ProfileEducationAdd'
import ProfileExperienceAdd from './ProfileExperienceAdd'

export default function ProfileExperienceActions({userId}: {userId: number}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-experience'))
  
    return (
        <div className="flex gap-4 items-center">
            <button className="profile__edit" onClick={() => router.push(`/profile?add-experience=${userId}`, {
                scroll: false,
            })}>
                <Plus />
            </button>
            <button className="profile__edit">
                <Pencil />
            </button>
            <ProfileExperienceAdd open={open} userId={userId} />
        </div>
    )
}
