'use client'
import { Pencil } from "lucide-react";
import ProfileSkillsEdit from "./ProfileSkillsEdit";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfileSkillsActions() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const open = Boolean(searchParams?.get('add-skills'))

    return (
        <>
            <button className="profile__edit" onClick={() => router.push('/profile?add-skills=true', {
                scroll: false,
            })}>
                <Pencil />
            </button>
            
            <ProfileSkillsEdit open={open} />
        </>
    )
}
