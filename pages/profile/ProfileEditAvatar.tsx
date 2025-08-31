'use client'
import { Pencil, UserRound } from "lucide-react";
import { useState } from "react";
import ProfileUploadAvatar from "./ProfileUploadAvatar";
import Image from "next/image";

export default function ProfileEditAvatar({ userId }: { userId: number }) {

    const [uploadPhoto, setUploadPhoto] = useState(false);

    const close = () => setUploadPhoto(false);

    return (
        <>
            <button className="profile__icon-edit" onClick={() => setUploadPhoto(true)}>
                <Pencil width={10} height={10} className="text-secundary" />
            </button>
            {uploadPhoto && <ProfileUploadAvatar userId={userId} close={close} />}
        </>
    )
}
