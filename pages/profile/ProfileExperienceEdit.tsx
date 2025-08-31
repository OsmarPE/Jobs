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
import { Pencil, Trash2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { experienceSchema } from "@/lib/validations";
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

export default function ProfileExperienceEdit({ userId }: { userId: number }) {

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [experienceToEdit, setExperienceToEdit] = useState<Experience | null>(null);
    const [currentJob, setCurrentJob] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter()
    useEffect(() => {
        if (!experienceToEdit){
            
            jobsApi.getExperienceByUserId(userId.toString())
                .then(data => {
                    console.log('Experiences fetched:', data);
                    setExperiences(data.data);
                })
                .catch(error => {
                    console.error('Error fetching experiences:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId,experienceToEdit])


    const form = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            dateFrom: '',
            dateTo: '',
            area: '',
            areaJob: '',
            currentJob: false,
        },
    });

    const handleCancel = () => {
        setExperienceToEdit(null);
    }

    const handleSelectExperienceForEdit = (experience: Experience) => {
        setExperienceToEdit(experience);
        form.reset({
            area: experience?.area ?? '',
            areaJob: experience?.areaJob ?? '',
            currentJob: experience?.currentJob ?? false,
            dateFrom: experience?.dateFrom ?? '',
            dateTo: experience?.dateTo ?? '',
        });
    }

    const onSubmit = async (data: z.infer<typeof experienceSchema>) => {
        if (!experienceToEdit) return
        const { success, message } = await jobsApi.updateExperience(experienceToEdit?.id?.toString() ?? '', data)
        
        if (!success){
            toast.error(message)
            return
        }
        setExperienceToEdit(null);
        toast.success(message)
        router.refresh()
        
    }

    const handleDeleteUser = async (id: string) => {
        const { success, message } = await jobsApi.deleteExperience(id)
        console.log(message);
        
        if (!success) {
            toast.error(message)
            return
        }
        
        toast.success(message)
        router.refresh()

        const newExperiences = experiences.filter((exp) => exp.id !== +id);
        setExperiences(newExperiences);
    }

    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Editar educación</DialogTitle>
                </DialogHeader>
                {!experienceToEdit ? <ul className="experience">
                    {experiences.map((experience) => (
                        <li className="experience__item" key={experience.id}>
                            <div className="experience__body">
                                <div className="experience__heading">
                                    <h3 className="experience__title">{experience?.area} </h3>
                                    <div className="flex items-center gap-4">
                                        <button className="cursor-pointer hover:text-white" onClick={() => handleSelectExperienceForEdit(experience)}>
                                            <Pencil width={14} className="transition" />
                                        </button>
                                        <button className="cursor-pointer hover:text-white" onClick={() => handleDeleteUser(experience.id?.toString() ?? '')}>
                                            <Trash2 width={14} className="transition" />
                                        </button>
                                    </div>
                                </div>
                                <div className="experience__info">
                                    <span className="experience__text">{experience?.areaJob}</span>
                                    <span> • </span>
                                    <span className="experience__text capitalize">{getDateProfile(experience?.dateFrom)} - {getDateProfile(experience?.dateTo)}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                name="currentJob"
                                description="Si estás actualmente trabajando en este trabajo"
                                label="Trabajo actual"
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
