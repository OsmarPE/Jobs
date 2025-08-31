'use client'
import { Pencil, Plus } from "lucide-react";
import ProfileSkillsEdit from "./ProfileSkillsEdit";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProfileSkillsAdd from "./ProfileSkillAdd";

export default function ProfileSkillsActions({userId}: {userId: number}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-skills'))
    const editOpen = Boolean(searchParams?.get('edit-skills'))

    return (
        <>
            <div className="flex items-center gap-4">
                <button className="profile__edit" onClick={() => router.push(`/profile?add-skills=${userId}`, {
                    scroll: false,
                })}>
                    <Plus />
                </button>
                <button className="profile__edit" onClick={() => router.push(`/profile?edit-skills=${userId}`, {
                    scroll: false,
                })}>
                    <Pencil />
                </button>
                
            </div>
            {editOpen && <ProfileSkillsEdit open={editOpen} />}
            <ProfileSkillsAdd open={open} />
        </>
    )
}
