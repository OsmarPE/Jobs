import LinkedIn from "@/img/linkedin.png";
import { Bookmark, Building2, Mail, MapPin, Pencil, Phone, UserRound } from "lucide-react";
import BreadcrumbLinks from "../../components/layout/BreadcrumbLinks";
import { Button } from "@/components/ui/button";
import Circle from "@/components/landing/Circle";
import { getUserByToken } from "@/lib/auth";
import { getUserById } from "@/src/schemas/user";
import { JobType } from "@/types";

export default async function MyJobs() {

    const userByToken = await getUserByToken();
    const user = await getUserById(userByToken.id);

    const jobs: JobType[] = user?.bookmarks.map(bookmark => bookmark.job) as unknown as JobType[] ?? [];


  return (
    <div className="my-jobs">
        <Circle className="circle-left-header"/>
         <BreadcrumbLinks className='mb-6' links={[{ label: 'Inicio', href: '/' }, { label: 'Mis trabajos', href: '/my-jobs' }]} />
                       
        <div className="my-jobs__icon">
            <Bookmark />
        </div>

        <div className="my-jobs__heading">
            <div>
                <h1 className="my-jobs__name">Mis <span className="my-jobs__name--italic">trabajos</span></h1>
                <p className="my-jobs__description">Mira los trabajos en las que haz postulado en los ultimos dias.</p>
            </div>
        </div>
        <div className="my-jobs__tabs">
            <button className="my-jobs__tab active">
              Mis favoritos
            </button>
            <button className="my-jobs__tab">
                Postulaciones
            </button>
            <button className="my-jobs__tab">
                Entrevistas
            </button>
        </div>

        <ul className="my-jobs__list">
            {
                jobs.map(job => (
                    <li className="my-job" key={job.id}>
                        <div className="my-job__body">
                            <div className="my-job__icon">
                                <Building2 />
                            </div>
                            <div className="my-job__info">
                                <span className="my-job__enterprise">{job?.enterprise.name}</span>
                                <h3 className="my-job__title">{job?.title}</h3>
                                <span className="my-job__location">
                                    <MapPin width={14} height={14} />
                                    <span>{'Ubicación no disponible'}</span>
                                </span>
                            </div>
                        </div>
                        <Button className="my-job__button">
                            Postularme
                        </Button>
                        <button className="my-job__favorite">
                            <Bookmark />
                        </button>
                    </li>
                ))
            }
        </ul>

    </div>
  )
}
