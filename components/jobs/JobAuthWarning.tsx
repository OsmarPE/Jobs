'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useURLParams } from "@/hooks/use-params-url";
export default function JobAuthWarning() {
    
    const params = useURLParams()

    return (
        <Dialog open onOpenChange={() => params.updateParams({ auth: '' })}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="size-4"/>
                        Aun no has iniciado sesión</DialogTitle>
                    <DialogDescription>
                        Por favor, inicia sesión para poder postularte en algun trabajo,
                        conocer tus oportunidades, guardar tus preferencias y más.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-full mt-4" asChild>
                        <Link href="/auth/login">
                            Iniciar sesión
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
