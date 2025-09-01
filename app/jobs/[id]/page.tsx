import Job from "@/components/jobs/Job";
import { Button } from "@/components/ui/button";
import { getJob } from "@/src/schemas/job";
import { Bookmark, Box, Calendar, Circle, CircleAlert, Clock12, CreditCard, Link, MapPin, Type, UsersRound, X } from "lucide-react";
import LinkNext from "next/link";
import LinkedIn from "@/img/linkedin.png";
import { formarPrice, timeAgoInWords } from "@/lib/utils";
export default async function page({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    const data = await getJob(+id);

    if (!data) return <div>No job found</div>;

    const { title, description, location, schedule, timeJob, typeJob, enterprise, jobSkills, jobLanguages, noVacancies, salaryMin, salaryMax, createdAt } = data;

    const timeAgo = new Date(createdAt as Date) 
    const now = new Date();
    const timeAgoInHours = Math.floor((now.getTime() - timeAgo.getTime()) / (1000 * 60 * 60));

    
    let salary = ''
    if (salaryMin && salaryMax){
        salary = `${formarPrice(+salaryMin)} - ${formarPrice(+salaryMax)}`
    } else if (salaryMin) {
        salary = formarPrice(+salaryMin)
    }

    return (
        <div className="details__job">
                           <section className="details__intro">
                               <img className="details__image" src={LinkedIn.src} alt="" />
                               <div className="badge">
                                   <div className="badge__point"></div>
                                   <span className="badge__text">{typeJob?.name}</span>
                               </div>
                               <div className="details__heading">
                                   <div>
                                       <h3 className="details__title">{title}</h3>
                                       <a href="/" className="details__enterprise">{enterprise?.name}</a>
                                   </div>
                                   <span className="details__time">Hace {timeAgoInWords(timeAgoInHours)}</span>
                               </div>
           
                               <ul className="details__list">
                                   <li className="details__item">
                                       <MapPin />
                                       <span>{location?.city}</span>
                                   </li>
                                   <span> • </span>
                                   <li className="details__item">
                                       <Clock12 />
                                       <span>{timeJob?.name}</span>
                                   </li>
                                   <span> • </span>
                                   <li className="details__item">
                                       <CreditCard />
                                       <span>{salary}</span>
                                   </li>
                                   <span> • </span>
                                   <li className="details__item">
                                       <Calendar />
                                       <span>{schedule?.name}</span>
                                   </li>
                                   <span> • </span>
                                   <li className="details__item">
                                       <UsersRound />
                                       <span>{noVacancies} {noVacancies && noVacancies > 1 ? 'vacantes' : 'vacante'}</span>
                                   </li>
           
                               </ul>
           
                               <div className="details__actions">
                                   <Button asChild>
                                       <LinkNext href={`/apply-job/${id}`}>
                                           Postularse ahora
                                       </LinkNext>
                                   </Button>
                                   <div className="details__line"></div>
                                   <div className="details__socials">
                                       <button className="details__socials-btn">
                                           <Bookmark />
                                       </button>
                                       <button className="details__socials-btn">
                                           <Link />
                                       </button>
                                   </div>
                               </div>
                           </section>
                           <section className="details__information">
                               <div className="details__information-item">
                                   <h4 className="details__subtitle">
                                       <Box />
                                       Habilidades
                                   </h4>
                                   <ul className="details__badges">
                                       {
                                           jobSkills?.map((skill, index) => (
                                               <li key={index} className="details__badge badge">
                                                   {skill.skill?.name}
                                               </li>
                                           ))
                                       }
           
                                   </ul>
                               </div>
                               <div className="details__information-item">
                                   <h4 className="details__subtitle">
                                       <Type />
                                       Idiomas
                                   </h4>
                                   <ul className="details__badges">
                                       {
                                           jobLanguages?.map((language, index) => (
                                               <li key={index} className="details__badge badge">
                                                   {language.language?.name}
                                               </li>
                                           ))
                                       }
                                   </ul>
                               </div>
                               <div className="details__information-item">
                                   <h4 className="details__subtitle">
                                       <CircleAlert />
                                       Informatión
                                   </h4>
                                   <p className="details__text">
                                       {description}
                                       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, cupiditate architecto dolorum velit numquam repellendus similique nam molestias placeat. Dolore quaerat numquam voluptas, atque consequatur temporibus illum doloremque totam. Perspiciatis!
                                   </p>
                               </div>
                           </section>
           
           
           
                       </div>
    )
}
