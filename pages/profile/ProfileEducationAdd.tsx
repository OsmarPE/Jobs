import FormDatePicker from "@/components/auth/FormDatePicker";
import FormItem from "@/components/auth/FormItem";
import FormSwitch from "@/components/auth/FormSwitch";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import FormSubmit from "@/components/ui/form-submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import z from "zod";
import { educationSchema } from "@/lib/validations/profile";
import { createEducationAction } from "@/actions/education";
import { toast } from "sonner";

export default function ProfileEducationAdd({open, userId}: {open: boolean, userId: number}) {


    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            dateFrom: '',
            dateTo: '',
            finished: false,
            institution: '',
            title: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof educationSchema>) => {
        const response = await createEducationAction({
            ...data,
            userId
        });

        const { success, message } = response;

        if (!success) {
            toast.error(message);
            return;
        }

        toast.success(message);

        router.back();
        form.reset();

    };
    
    const handleCancel = () => {
        form.reset()
        router.back()
    }

    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Añadir Formación Académica</DialogTitle>
                    <DialogDescription>
                        Registra tu historial académico incluyendo títulos, certificaciones y estudios realizados.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormItem
                            control={form.control}
                            name="title"
                            label="Titulo"
                            placeholder="Ej: Ingeniería en Sistemas"
                        />

                        <FormItem
                            control={form.control}
                            name="institution"
                            label="Institución o escuela"
                            placeholder="Ej: Universidad Nacional"
                        />
                        <div className="grid gap-4 grid-cols-2">
                            <FormDatePicker
                                control={form.control}
                                name="dateFrom"
                                label="Fecha de inicio"
                                placeholder="Selecciona cuando iniciaste"
                            />
                            <FormDatePicker
                                control={form.control}
                                name="dateTo"
                                label="Fecha de finalización"
                                placeholder="Selecciona cuando terminaste"
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
