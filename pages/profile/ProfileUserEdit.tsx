import { jobsApi } from "@/app/services/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { User } from "@/src/schemas/user";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileUserEditItem from "./ProfileUserEditItem";
import SkeletonUserDetails from "./skeleton/SkeletonUserDetails";

export default function ProfileUserEdit({ userId }: { userId: number }) {
    
    const router = useRouter();
    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (userId) {
            jobsApi.getUserById(userId.toString())
            .then((response) => {
                console.log(response.data);
                setUser(response.data);

            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [userId]);   

    const handleSubmit = async () => {
        if (user) {
            const { success, message }  = await jobsApi.updateUser(userId.toString(), user);
            
            if (!success) {
                toast.error(message)
                return
            }
            toast.success(message)
            router.refresh();
            router.back();
        }
    };

    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>, name: keyof User) => {
        if (!user) return;
        const a:any = {...user}
        a[name] = e.target.value
        setUser(a)
        
    }

    

    return (
         <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Informacion detallada del usuario</DialogTitle>
                </DialogHeader>
                {loading ? <SkeletonUserDetails /> : (
                    <>
                        <div className="space-y-3 mt-4">
                            <ProfileUserEditItem handleChange={(e) => handleChangeUser(e, 'name')} label="Nombre" input={user?.name ?? ''} />
                            <ProfileUserEditItem handleChange={(e) => handleChangeUser(e, 'email')} label="Email" input={user?.email ?? ''} disabled/>
                            <ProfileUserEditItem handleChange={(e) => handleChangeUser(e, 'phone')} label="Telefono" input={user?.phone ?? ''} />
                        </div>
                        <DialogFooter className="gap-4">
                            <Button  onClick={handleSubmit}>Guardar</Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
