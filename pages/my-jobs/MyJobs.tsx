import LinkedIn from "@/img/linkedin.png";
import { Bookmark, Building2, Mail, MapPin, Pencil, Phone, Trash, UserRound, XIcon } from "lucide-react";
import BreadcrumbLinks from "../../components/layout/BreadcrumbLinks";
import { Button } from "@/components/ui/button";
import Circle from "@/components/landing/Circle";
import { getUserByToken } from "@/lib/auth";
import { getUserById } from "@/src/schemas/user";
import { JobType } from "@/types";
import Link from "next/link";
import MyJobsActions from "@/components/my-jobs/MyJobsActions";
import MyJobTabs from "../../components/my-jobs/MyJobTabs";
import { MyJobProvider } from "@/context/MyJobContext";
import MyJobList from "@/components/my-jobs/MyJobList";
import MyJobsFavorites from "@/components/my-jobs/MyJobsFavorites";
import MyJobApplications from "@/components/my-jobs/MyJobApplications";
import MyJobInterview from "@/components/my-jobs/MyJobInterview";

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

        
        <MyJobProvider>
            <MyJobList />
            <MyJobTabs jobs={jobs} user={user} />
        </MyJobProvider>
        

    </div>
  )
}
