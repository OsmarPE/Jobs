import LinkedIn from "@/img/linkedin.png";
import { Bookmark, Building2, Calendar, Clock12, CreditCard, Link, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import ButtonJob from "./ButtonJob";
import JobAction from "./JobAction";

interface Props{
    enterprise: string;
    location: string;
    schedule: string;
    timeJob: string;
    typeJob: string;
    salaryMin: number;
    salaryMax: number;
    description: string;
    jobSkills: string[];
    jobLanguages: string[];
    followUps: string[];
    turnJobs: string[];
    title: string;
    noVacancies: number;
}

export default function Job({enterprise, title,location, schedule, timeJob, typeJob, salaryMin, salaryMax, description, noVacancies, jobSkills, jobLanguages, followUps, turnJobs}: Props) {
  return (
     <article className="job">
                <div className="job__top">
                    <img src={LinkedIn.src} alt="" className="job__image" />
                    <div className="job__body">
                        <div className="job__information">
                            <span className="job__enterprise">{enterprise}</span>
                            <h3 className="job__title">{title}</h3>
                            <div className="job__requirements">
                                <div className="job__requirement">
                                    <MapPin />
                                    <span>{location}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Clock12 />
                                    <span>{timeJob}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <CreditCard />
                                    <span>${salaryMin}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Calendar />
                                    <span>{schedule}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Building2 />
                                    <span>{typeJob}</span>
                                </div>
                            </div>
                        </div>
                        <JobAction />
                    </div>
                </div>
                <div className="job__bottom">
                    <span className="job__time">Hace 3 horas</span>
                    <ButtonJob />
                </div>
            </article>
  )
}
