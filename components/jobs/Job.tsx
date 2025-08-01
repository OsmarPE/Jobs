import LinkedIn from "@/img/linkedin.png";
import { Bookmark, Building2, Calendar, Clock12, CreditCard, Link, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import ButtonJob from "./ButtonJob";
import JobAction from "./JobAction";
import { type JobType } from "@/types";
import { timeAgoInWords } from "@/lib/utils";


type Props = JobType


export default function Job(props: Props) {
  
    const { enterprise, title, location, schedule, timeJob, typeJob, salaryMin, createdAt } = props;
  
    const timeAgo = new Date(createdAt) 
    const now = new Date();
    const timeDifference = now.getTime() - timeAgo.getTime();
    const timeAgoInHours = Math.floor((now.getTime() - timeAgo.getTime()) / (1000 * 60 * 60));


    
  return (
     <article className="job">
                <div className="job__top">
                    <img src={LinkedIn.src} alt="" className="job__image" />
                    <div className="job__body">
                        <div className="job__information">
                            <span className="job__enterprise">{enterprise.name}</span>
                            <h3 className="job__title">{title}</h3>
                            <div className="job__requirements">
                                <div className="job__requirement">
                                    <MapPin />
                                    <span>{location?.city}, {location?.country}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Clock12 />
                                    <span>{timeJob?.name}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <CreditCard />
                                    <span>${salaryMin}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Calendar />
                                    <span>{schedule?.name}</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Building2 />
                                    <span>{typeJob?.name}</span>
                                </div>
                            </div>
                        </div>
                        <JobAction />
                    </div>
                </div>
                <div className="job__bottom">
                    <span className="job__time">Hace {timeAgoInWords(timeAgoInHours)}</span>
                    <ButtonJob job={props} />
                </div>
            </article>
  )
}
