'use client'
import { removeBookmarkAction } from "@/actions/booksmark";
import { Bookmark, Trash, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MyJobsActions({ id }:{ id: number }) {

    const router = useRouter();

    const handleRemoveJob = async() => {

       const response = await removeBookmarkAction({ id });

       if (!response.success) {
           toast.error(response.message);
           return;
       }
       
       router.refresh();
    }

    return (
        <div className="my-job__actions">
            <button className="my-job__favorite" onClick={handleRemoveJob}>
                <Trash width={16} height={16} />
            </button>
        </div>
    )
}
