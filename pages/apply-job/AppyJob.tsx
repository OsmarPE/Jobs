'use client';
import { jobsApi } from "@/app/services/api";
import ApplyJobSuccess from "@/components/apply-job/ApplyJobSuccess";
import Circle from "@/components/landing/Circle";
import FormSubmit from "@/components/ui/form-submit";
import { Job } from "@/src/schemas/job";
import { User } from "@/src/schemas/user";
import { JobType } from "@/types";
import { useState } from "react";
import { toast } from "sonner";


export default function AppyJob({ user, jobId, job }: { user: User, jobId: string, job: JobType}) {

    const [sendCV, setsendCV] = useState(false)
    const [loading, setloading] = useState(false)
    const { name, email, phone, cv } = user;

    const handleSendCV = async () => {

        try {
            setloading(true)
            const { message, success } = await jobsApi.createFollowUp({
                jobId: +jobId,
                userId: user.id,
                status: 'pending'
            })

            if (!success) {
                toast.error(message);
                return;
            }

            toast.success(message);
            setsendCV(true)
            
        } catch (error) {
            toast.error("Error al enviar la solicitud");
        } finally {
            setloading(false)
        }

    }

    if (sendCV) return <ApplyJobSuccess job={job} />;

    return (

        <article className="step">
            <div className="step__bar">
                <div className="step__progress" style={{ width: '60%' }}></div>
            </div>
            <h2 className="step__title">Solicitar empleo en {job?.title}</h2>
            <p className="step__text">El empleador también recibirá los datos de tu perfil y CV .</p>

            <h3 className="step__subtitle">Información de contacto</h3>
            <div className="step__information">
                <div className="step__information-item">
                    <span className="step__information-label">Nombre</span>
                    <p className="step__information-value">{name}</p>
                </div>
                <div className="step__information-item">
                    <span className="step__information-label">Email</span>
                    <p className="step__information-value">{email}</p>
                </div>
                <div className="step__information-item">
                    <span className="step__information-label">Teléfono</span>
                    <p className="step__information-value">{phone || 'Sin numero de teléfono'}</p>
                </div>
            </div>
            <div className="step__curriculum">
                <h3 className="step__subtitle">Curriculum</h3>
                <p className="step__curriculum-text">Asegúrate de incluir un currículum actualizado.</p>
                <div className="curriculum">
                    <div className="curriculum__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                    </div>
                    <span className="curriculum__text">{cv}</span>
                </div>
            </div>

            <FormSubmit onClick={handleSendCV} className="w-full" size={'lg'} loading={loading}>Enviar solicitud</FormSubmit>
        </article>

    )
}
