import LinkedIn from "@/img/linkedin.png";
import { Bookmark, Building2, Calendar, Clock12, CreditCard, Link, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import ButtonJob from "./ButtonJob";
import JobAction from "./JobAction";

export default function Job() {
  return (
     <article className="job">
                <div className="job__top">
                    <img src={LinkedIn.src} alt="" className="job__image" />
                    <div className="job__body">
                        <div className="job__information">
                            <span className="job__enterprise">AXEN Technology</span>
                            <h3 className="job__title">Desarrollador Web</h3>
                            <div className="job__requirements">
                                <div className="job__requirement">
                                    <MapPin />
                                    <span>Merida, Yucatán</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Clock12 />
                                    <span>Tiempo Completo</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <CreditCard />
                                    <span>$10,000</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Calendar />
                                    <span>Lunes a viernes</span>
                                </div>
                                <span>•</span>
                                <div className="job__requirement">
                                    <Building2 />
                                    <span>Remoto</span>
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
