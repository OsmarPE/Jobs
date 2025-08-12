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
import { Form, FormField } from "@/components/ui/form";
import FormSubmit from "@/components/ui/form-submit";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const experience = z.object({
    dateFrom: z.date().or(z.string().min(1, { message: "La fecha de inicio no puede estar vacía" })),
    dateTo: z.date().or(z.string().min(1, { message: "La fecha de fin no puede estar vacía" })),
    currentJob: z.boolean(),
    area: z.string().min(1, { message: "El área no puede estar vacía" }),
    areaJob: z.string().min(1, { message: "El área de trabajo no puede estar vacía" }),
});
export default function ProfileExperienceAdd({open}: {open: boolean}) {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(experience),
        defaultValues: {
            dateFrom: '',
            dateTo: '',
            currentJob: false,
            area: '',
            areaJob: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof experience>) => {
        console.log(data);
    };
    
    const handleCancel = () => {
        router.back()
    }

    useEffect(() => {
        form.reset()
        console.log(open)
        
    }, [open])


    form.watch('currentJob')

    const currentJob = form.getValues('currentJob')

    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Añadir education</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormItem
                            control={form.control}
                            name="area"
                            label="Área"
                            placeholder="Desarrollo de software"
                        />

                        <FormItem
                            control={form.control}
                            name="areaJob"
                            label="Puesto / Área de trabajo"
                            placeholder="Frontend Developer"
                        />
                        <div className={cn("grid gap-4", {"grid-cols-2": !currentJob})}>
                            <FormDatePicker
                                control={form.control}
                                name="dateFrom"
                                label="Fecha de inicio"
                                placeholder="Fecha de inicio"
                            />
                           {!currentJob && <FormDatePicker
                                control={form.control}
                                name="dateTo"
                                label="Fecha de finalización"
                                placeholder="Fecha de finalización"
                            />}
                        </div>

                        <FormSwitch
                            control={form.control}
                            name="currentJob"
                            description="Si estás actualmente trabajando en este trabajo"
                            label="Trabajo actual"
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
