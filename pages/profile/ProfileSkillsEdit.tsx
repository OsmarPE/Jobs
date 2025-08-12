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

export default function ProfileSkillsEdit({ open }: { open: boolean }) {

    const router = useRouter()
    const [status, setStatus] = useState<null | 'add' | 'edit'>(null)

    const handleCancel = () => {

        router.back()
    }

    const skills = [
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'React' },
        { id: 3, name: 'Node.js' },
        { id: 4, name: 'TypeScript' },
        { id: 5, name: 'Next.js' },
        { id: 6, name: 'Tailwind CSS' },
    ]

    const handleAddSkill = () => {
        setStatus(prevStatus => prevStatus === 'add' ? null : 'add')

    }

    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Habilidades</DialogTitle>
                    <DialogDescription>
                        Añade, edita o elimina tus habilidades profesionales
                    </DialogDescription>
                </DialogHeader>
                <ul className="flex flex-wrap gap-3">
                    {
                        skills?.map((skill) => (
                            <li className="skills__item badge">
                                {skill?.name}
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
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                Añadir habilidad
                            </>
                        )
                    }
                </Button>

                <div className="flex justify-end gap-4 mt-4">
                    <Button type="button" variant="secondaryLanding"  onClick={handleCancel}>Cancelar</Button>
                    <FormSubmit className="">Editar</FormSubmit>
                </div>
            </DialogContent>
        </Dialog>
    )
}
