'use client';
import { useJobCurrent } from "@/hooks/use-job-current";
import LinkendIn from "@/img/linkedin.png";
import { Bookmark, Box, Building2, Calendar, CircleAlert, Clock12, CreditCard, Link, MapPin, Type, UsersRound, X } from "lucide-react";
import { motion, Variants } from "motion/react"
import { Button } from "../ui/button";
import LinkNext from "next/link";
import { useEffect } from "react";
import { formarPrice, timeAgoInWords } from "@/lib/utils";
import Circle from "../landing/Circle";

export default function JobDetailsModal() {

    const { showModal, closeModal, job } = useJobCurrent();


    const modalVariants = {
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

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('hidden-scroll');
        } else {
            document.body.classList.remove('hidden-scroll');
        }

        // Cleanup: remover la clase cuando el componente se desmonte
        return () => {
            document.body.classList.remove('hidden-scroll');
        };
    }, [showModal]);

    if (!showModal) return null;


    const { id, enterprise, title, location, schedule, timeJob, typeJob, salaryMin, salaryMax, description, noVacancies, jobSkills, jobLanguages, followUps, turnJobs, createdAt } = job || {};

    const showSalaryRange = salaryMin && salaryMax;
    const timeAgo = new Date(createdAt || '');
    const now = new Date();
    const timeAgoInHours = Math.floor((now.getTime() - timeAgo.getTime()) / (1000 * 60 * 60));
    

    return (
        <motion.div className="job__container" initial={{ opacity: 0 }} animate={{ opacity: 1, backdropFilter: 'blur(2px)' }} >
            <motion.div className="details" initial={modalVariants.hidden} animate={modalVariants.visible}>
                <Circle className="top-0 right-3/8 -translate-y-1/3" /> 
                <button onClick={closeModal} className="details__close">
                    <X />
                </button>
                <section className="details__intro">
                    <img className="details__image" src={LinkendIn.src} alt="" />
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
                            <span>{showSalaryRange ? `${formarPrice(+salaryMin)} - ${formarPrice(+salaryMax)}` : formarPrice(salaryMin ? +salaryMin : 0)}</span>
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



            </motion.div>
        </motion.div>
    )
}
