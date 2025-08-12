import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import FormSubmit from "@/components/ui/form-submit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState } from "react";
import z from "zod";



export const education = z.object({
    institution: z.string().min(1, { message: "Ingresa tu escuela donde cursas o desarrollas tu carrera" }),
    title: z.string().min(1, { message: "Ingresa tu carrera o nivel educativo" }),
    dateFrom: z.string().min(1, { message: "La fecha de inicio no puede estar vacía" }),
    dateTo: z.string().optional(),
    finished: z.boolean(),
});

export default function ProfileLanguagesEdit({ open }: { open: boolean }) {

    const router = useRouter()
    const [status, setStatus] = useState<null | 'add' | 'edit'>(null)

    const handleCancel = () => {

        router.back()
    }

    const language = [
        { id: 1, name: 'Español' },
        { id: 2, name: 'Inglés' },
        { id: 3, name: 'Francés' },
        { id: 4, name: 'Portugués' },
        { id: 5, name: 'Italiano' },
    ]

    const handleAddSkill = () => {
        setStatus(prevStatus => prevStatus === 'add' ? null : 'add')

    }
    console.log(open);
    

    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Lenguajes</DialogTitle>
                    <DialogDescription>
                        Selecciona el idioma que dominas
                    </DialogDescription>
                </DialogHeader>
                <ul className="flex flex-wrap gap-3">
                    {
                        language?.map((language) => (
                            <li className="language__item badge">
                                {language?.name}
                            </li>
                        ))
                    }
                </ul>
                   {status === 'add' && (<form>
                    <Label className="mb-3">Añadir habilidad</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar habilidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Ingles</SelectLabel>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="portuguese">Portuguese</SelectItem>
                                <SelectItem value="italian">Italian</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormSubmit type="button" className="mt-4">Añadir</FormSubmit> 
                </form>)}
                <Button type="button" variant={'link'} size={'sm'} className="w-max ml-auto" onClick={handleAddSkill}>
                    {
                        status === 'add' ? 'Cancelar' : (
                            <>
                                <Plus />
                                Añadir lenguaje
                            </>
                        )
                    }
                </Button>

                <div className="flex justify-end gap-4 mt-4">
                    <Button type="button" variant="secondaryLanding"  onClick={handleCancel}>Cancelar</Button>
                    <FormSubmit >Editar</FormSubmit>
                </div>
            </DialogContent>
        </Dialog>
    )
}
