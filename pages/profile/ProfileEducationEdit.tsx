import LinkedIn from "@/img/linkedin.png";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn, getDateProfile } from "@/lib/utils";
import { Experience } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jobsApi } from "@/app/services/api";
import { EditIcon, Pencil } from "lucide-react";
import { Form } from "@/components/ui/form";
import { educationSchema, experienceSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormItem from "@/components/auth/FormItem";
import FormDatePicker from "@/components/auth/FormDatePicker";
import FormSwitch from "@/components/auth/FormSwitch";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/ui/form-submit";
import z from "zod";
import { toast } from "sonner";
import SkeletonExperiences from "./skeleton/SkeletonList";
import { Education } from "@/src/schemas/education";

export default function ProfileEducationEdit({ userId }: { userId: number }) {

    const [educations, setEducations] = useState<Education[]>([]);
    const [educationToEdit, setEducationToEdit] = useState<Education | null>(null);
    const [currentJob, setCurrentJob] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter()
    useEffect(() => {
        if (!educationToEdit) {
            jobsApi.getEducationByUserId(userId.toString())
                .then(data => {
                    console.log('Educations fetched:', data);
                    setEducations(data.data);
                })
                .catch(error => {
                    console.error('Error fetching educations:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId, educationToEdit])


    const form = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            title: '',
            institution: '',
            dateFrom: '',
            dateTo: '',
            finished: false,
        },
    });

    const handleCancel = () => {
        setEducationToEdit(null);
    }

    const handleSelectEducationForEdit = (education: Education) => {
        setEducationToEdit(education);
        form.reset({
            title: education?.title ?? '',
            institution: education?.institution ?? '',
            dateFrom: education?.dateFrom ?? '',
            dateTo: education?.dateTo ?? '',
            finished: education?.finished ?? false,
        });
    }

    const onSubmit = async (data: z.infer<typeof educationSchema>) => {
        if (!educationToEdit) return
        const { success, message } = await jobsApi.updateEducation(educationToEdit?.id?.toString() ?? '', data)

        if (!success) {
            toast.error(message)
            return
        }
        console.log('Educación actualizada:', data);
        setEducationToEdit(null);
        toast.success(message)
        router.refresh()

    }

    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Editar educación</DialogTitle>
                </DialogHeader>
                {!educationToEdit ? <ul className="education">
                    {educations.map((education) => (
                        <li className="education__item">
                            <div className="education__body">
                                <h3 className="education__title">{education?.institution}</h3>
                                <span className="education__text">{education?.title}</span>
                                <span className="education__text">{getDateProfile(education?.dateFrom)} - {getDateProfile(education?.dateTo)}</span>
                            </div>
                            <div className="education__actions">
                                <button className="cursor-pointer hover:text-white" onClick={() => handleSelectEducationForEdit(education)}>
                                    <Pencil width={14} className="transition" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul> : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormItem
                                control={form.control}
                                name="title"
                                label="Título"
                                placeholder="Ingeniería de software"
                            />

                            <FormItem
                                control={form.control}
                                name="institution"
                                label="Institución"
                                placeholder="Universidad de Sevilla"
                            />
                            <div className={cn("grid gap-4", { "grid-cols-2": !currentJob })}>
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
                                name="finished"
                                description="Aún estas estudiando esta institución?"
                                label="Cursando ahora"
                            />
                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="secondaryLanding" onClick={handleCancel}>Cancelar</Button>
                                <FormSubmit loading={form.formState.isSubmitting} className="">Editar</FormSubmit>
                            </div>
                        </form>
                    </Form>
                )}
                {loading && <SkeletonExperiences />}
            </DialogContent>
        </Dialog>
    )
}
