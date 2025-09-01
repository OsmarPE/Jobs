import Link from "next/link";
import { Button } from "../ui/button";
import { JobType } from "@/types";

interface Props {
  job: JobType
}  

export default function ApplyJobSuccess({ job }: Props) {
  return (
    <article className="step">
      <div className="step__bar">
        <div className="step__progress" style={{ width: '100%' }}></div>
      </div>
      <h2 className="step__title">Curriculum enviado correctamente</h2>
      <p className="step__text step__text--message">
        Gracias por postularte a la vacante <span className="font-semibold">{job?.title}</span> en <span className="font-semibold">{job?.enterprise.name}</span>.
      </p>
      <p className="step__text step__text--message">
          Hemos recibido tu CV correctamente y nuestro equipo de Recursos Humanos lo revisará.
        En caso de que tu perfil avance al siguiente proceso, nos pondremos en contacto contigo.
      </p>
      <Button className="w-full mt-4" size={'lg'} asChild>
         <Link href="/jobs" replace>
          Volver a la página de inicio
        </Link>
      </Button>

    </article>
  )
}
