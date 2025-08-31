import { createSkillbyUserAction } from "@/actions/skills";
import FormItem from "@/components/auth/FormItem";
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
import { skillSchema } from "@/lib/validations/skill";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";




export default function ProfileSkillsAdd({ open }: { open: boolean }) {

    const router = useRouter()
    const search = useSearchParams()
    const userId = search?.get('add-skills')

    const handleCancel = () => {
        router.back()
    }
  
  
    const form = useForm({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: "",
        },
    });
    

    const onSubmit = async (data: z.infer<typeof skillSchema>) => { 
        console.log("Submitting skill data:", data);
        
        const response = await createSkillbyUserAction({
            ...data,
            userId: Number(userId),
        }); 
           
        const { success, message } = response;

        if (!success) {
            toast.error(message);
            return;
        }

        toast.success(message);
        
        router.back();

        form.reset();

    }

    useEffect(() => {
        form.reset();
    }, [open]);
 
    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Habilidades</DialogTitle>
                    <DialogDescription>
                        Añade, edita o elimina tus habilidades profesionales
                    </DialogDescription>
                </DialogHeader>
    
                  <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormItem
                                control={form.control}
                                name="name"
                                label="Habilidad"
                                placeholder="Nombre de la habilidad"
                            />
                            
                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="secondaryLanding"  onClick={handleCancel}>Cancelar</Button>
                                <FormSubmit loading={form.formState.isSubmitting}>Agregar</FormSubmit>
                            </div>
                        </form>
                    </Form>
          
            </DialogContent>
        </Dialog>
    )
}
