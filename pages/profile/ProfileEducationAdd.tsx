import FormDatePicker from "@/components/auth/FormDatePicker";
import FormItem from "@/components/auth/FormItem";
import FormSwitch from "@/components/auth/FormSwitch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import FormSubmit from "@/components/ui/form-submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import z from "zod";



export const education = z.object({
  institution: z.string().min(1, { message: "Ingresa tu escuela donde cursas o desarrollas tu carrera" }),
  title: z.string().min(1, { message: "Ingresa tu carrera o nivel educativo" }),
  dateFrom: z.string().min(1, { message: "La fecha de inicio no puede estar vacía" }),
  dateTo: z.string().optional(),
  finished: z.boolean(),
});

export default function ProfileEducationAdd({open}: {open: boolean}) {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(education),
        defaultValues: {
            dateFrom: '',
            dateTo: '',
            finished: false,
            institution: '',
            title: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof education>) => {
        console.log(data);
    };
    
    const handleCancel = () => {
        form.reset()
        router.back()
    }

    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Añadir experiencia</DialogTitle>
                    <DialogDescription>
                        Ingresa tu experiencia profesional que has desarrollado durante los ultimos años. Cuenta tu experiencia en el trabajo, eventos, logros, etc.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormItem
                            control={form.control}
                            name="title"
                            label="Titulo"
                            placeholder="Desarrollo de software"
                        />

                        <FormItem
                            control={form.control}
                            name="institution"
                            label="Institución o escuela"
                            placeholder="Instituto Tecnológico de Buenos Aires"
                        />
                        <div className="grid gap-4 grid-cols-2">
                            <FormDatePicker
                                control={form.control}
                                name="dateFrom"
                                label="Fecha de inicio"
                                placeholder="Fecha de inicio"
                            />
                            <FormDatePicker
                                control={form.control}
                                name="dateTo"
                                label="Fecha de finalización"
                                placeholder="Fecha de finalización"
                            />
                        </div>

                        <FormSwitch
                            control={form.control}
                            name="finished"
                            description="Marca la casilla si has completado tus estudios de esta institución"
                            label="Terminado"
                        />
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="secondaryLanding"  onClick={handleCancel}>Cancelar</Button>
                            <FormSubmit loading={form.formState.isSubmitting} className="">Añadir</FormSubmit>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
