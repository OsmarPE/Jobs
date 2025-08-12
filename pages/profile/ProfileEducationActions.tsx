'use client'
import { Pencil, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileEducationAdd from './ProfileEducationAdd'

export default function ProfileEducationActions() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-education'))
  
    return (
        <div className="flex gap-4 items-center">
            <button className="profile__edit" onClick={() => router.push('/profile?add-education=true', {
                scroll: false,
            })}>
                <Plus />
            </button>
            <button className="profile__edit">
                <Pencil />
            </button>
            <ProfileEducationAdd open={open} />
        </div>
    )
}
