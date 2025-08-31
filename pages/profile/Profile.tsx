import LinkedIn from "@/img/linkedin.png";
import { Box, GraduationCap, Languages, Mail, Paperclip, Pencil, Phone, Plus, UserRound, Zap } from "lucide-react";
import BreadcrumbLinks from "../../components/layout/BreadcrumbLinks";

import { formatPhone, getDateProfile } from "@/lib/utils";
import { UserWithRelations } from "@/types";
import ProfileExperienceActions from "./ProfileExperienceActions";
import ProfileEducationActions from "./ProfileEducationActions";
import ProfileSkillsActions from "./ProfileSkillsActions";
import ProfileLanguagesActions from "./ProfileLanguagesActions";
import ProfileUserAction from "./ProfileUserAction";
import ProfileCVAction from "./ProfileCVAction";
import ProfileEditAvatar from "./ProfileEditAvatar";
import Image from "next/image";

export default function Profile({user}: { user: UserWithRelations }) {

    const { id, name, email, phone, cv, experiences , educations, avatar} = user;


  return (
    <div className="profile">
        <div className="circle circle-left-header"></div>
         <BreadcrumbLinks className='mb-6' links={[{ label: 'Inicio', href: '/' }, { label: 'Perfil', href: '/profile' }]} />
                       
        <div className={avatar ? 'profile__icon has-avatar' : 'profile__icon'}>
            <div className="profile__icon-body">
                <UserRound />
                {avatar && <Image src={`/uploads/${avatar}`} className="rounded-full" alt={name} fill />}
               <ProfileEditAvatar userId={id} />
            </div>
        </div>

        <div className="profile__heading">
            <div>
                <h1 className="profile__name">{name}</h1>
                <p className="profile__description">Ingeniero en sistemas computacionales</p>
            </div>
            <ProfileUserAction userId={id} />
        </div>

        <div className="profile__information">
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle"> <UserRound width={14} /> Informacion General</h2>
                    <button className="profile__edit">
                        <UserRound />
                    </button>
                </div>
                <ul className="profile__list__information">
                    <li className="profile__item">
                        <UserRound />
                        <span>{name}</span>
                    </li>
                    <li className="profile__item">
                        <Mail />
                        <span>{email}</span>
                    </li>
                    <li className="profile__item">
                        <Phone />
                        <span>{formatPhone(phone?.toString() || '')}</span>
                    </li>
                </ul>
            </article>
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle"><Paperclip width={14} /> Curriculum</h2>
                    <ProfileCVAction userId={id} />
                </div>
                <p className="profile__text">{cv || 'Sin curriculum'}</p>
                
            </article>
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle"><Zap width={14} /> Experiencia</h2>
                    <ProfileExperienceActions  userId={id} />
                </div>
                <ul className="experience">
                    {experiences?.map((experience) => (
                    
                    <li className="experience__item">
                        <img className="experience__image" src={LinkedIn.src} alt=""/>
                        <div className="experience__body">
                            <h3 className="experience__title">{experience?.area}</h3>
                            <div className="experience__info">
                                <span className="experience__text">{experience?.areaJob}</span>
                                <span> • </span>
                                <span className="experience__text capitalize">{getDateProfile(experience?.dateFrom)} - {getDateProfile(experience?.dateTo)}</span>
                            </div>
                        </div>
                    </li>
                ))
                    }
                </ul>
                
            </article>
             <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle"><GraduationCap width={14} />Educacion</h2>
                    <ProfileEducationActions userId={id} />
                </div>
                   <ul className="education">
                    {
                        educations?.map((education) => (
                            <li className="education__item">
                                <img className="education__image" src={LinkedIn.src} alt=""/>
                                <div className="education__body">
                                    <h3 className="education__title">{education?.institution}</h3>
                                    <span className="education__text">{education?.title}</span>
                                    <span className="education__text">{getDateProfile(education?.dateFrom)} - {getDateProfile(education?.dateTo)}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                
            </article>
             <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle"><Box width={14} />Habilidades</h2>
                    <ProfileSkillsActions userId={id} />
                </div>
                 <ul className="skills">
                    {
                        user.skills?.map((skill) => (
                            <li className="skills__item badge">
                                {skill?.name}
                            </li>
                        ))
                    }
                 
                </ul>
            </article>
             <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">
                        <Languages width={14} />
                        Idiomas
                    </h2>
                    <ProfileLanguagesActions userId={id} />
                </div>
                 <ul className="languages">
                    {
                        user.languages?.map((language) => (
                            <li className="languages__item badge">
                                {language?.language?.name}
                            </li>
                        ))
                    }
                 
                </ul>
            </article>
        </div>

    </div>
  )
}
