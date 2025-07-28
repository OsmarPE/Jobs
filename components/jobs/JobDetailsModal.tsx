'use client';
import { useJobCurrent } from "@/hooks/use-job-current";
import LinkendIn from "@/img/linkedin.png";
import { Bookmark, Box, Building2, Calendar, CircleAlert, Clock12, CreditCard, Link, MapPin, Type, UsersRound, X } from "lucide-react";
import { motion, Variants } from "motion/react"
import { Button } from "../ui/button";

export default function JobDetailsModal() {

  const { showModal,deleteJob } = useJobCurrent();

  
  const modalVariants  = {
    hidden: {
      opacity: 0,
      x: 40,
      
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  if (!showModal) return null;

  return (
    <motion.div className="job__container" initial={{ opacity: 0 }} animate={{ opacity: 1, backdropFilter: 'blur(2px)' }} >
        <motion.div className="details" initial={modalVariants.hidden} animate={modalVariants.visible}>
            <button onClick={deleteJob} className="details__close">
                <X />
            </button>
            <section className="details__intro">
                <img className="details__image" src={LinkendIn.src} alt=""/>
                <div className="badge">
                    <div className="badge__point"></div>
                    <span className="badge__text">Remoto</span>
                </div>
                <div className="details__heading">
                    <div>
                        <h3 className="details__title">Analista de Soporte TI</h3>
                        <a href="/" className="details__enterprise">Banorte Santander</a>
                    </div>
                    <span className="details__time">Hace 2 dias</span>
                </div>
    
                <ul className="details__list">
                    <li className="details__item">
                        <MapPin  />
                        <span>Merida, Yucatán,</span>
                    </li>
                    <span> • </span>
                    <li className="details__item">
                        <Clock12  />
                        <span>Tiempo Completo</span>
                    </li>
                    <span> • </span>
                    <li className="details__item">
                        <CreditCard />
                        <span>$10,000</span>
                    </li>
                    <span> • </span>
                    <li className="details__item">
                        <Calendar  />
                        <span>Lunes a viernes</span>
                    </li>
                    <span> • </span>
                    <li className="details__item">
                        <UsersRound  />
                        <span>2 vacantes</span>
                    </li>
                    <span> • </span>
                    <li className="details__item">
                        <Building2 />
                        <span>Presencial</span>
                    </li>
                </ul>
    
                <div className="details__actions">
                    <Button >
                        Postularse ahora
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
                        <li className="details__badge badge">
                            HTML
                        </li>
                        <li className="details__badge badge">
                            CSS
                        </li>
                        <li className="details__badge badge">
                            JS
                        </li>
                        <li className="details__badge badge">
                            TypeScript
                        </li>
                        <li className="details__badge badge">
                            React
                        </li>
                        <li className="details__badge badge">
                            Node
                        </li>
                    </ul>
                </div>
                <div className="details__information-item">
                    <h4 className="details__subtitle">
                        <Type />
                        Idiomas
                    </h4>  
                    <ul className="details__badges">
                        <li className="details__badge badge">
                            Español
                        </li>
                        <li className="details__badge badge">
                            Ingles
                        </li>
                    </ul>
                </div>
                <div className="details__information-item">
                    <h4 className="details__subtitle">
                        <CircleAlert />
                        Informatión
                    </h4>  
                    <p className="details__text">
                        Lorem ipsum dolor sit amet consectetur. Id eu rhoncus rutrum enim a. Ut ornare in diam euismod libero elit.
                    </p>
                </div>
            </section>

            

        </motion.div>
    </motion.div>
  )
}
