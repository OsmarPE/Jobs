import LinkedIn from "@/img/linkedin.png";
import { Mail, Pencil, Phone, UserRound } from "lucide-react";
import BreadcrumbLinks from "../../components/layout/BreadcrumbLinks";

export default function Profile() {
  return (
    <div className="profile">
        <div className="circle circle-left-header"></div>
         <BreadcrumbLinks className='mb-6' links={[{ label: 'Inicio', href: '/' }, { label: 'Perfil', href: '/profile' }]} />
                       
        <div className="profile__icon">
            <UserRound />
        </div>

        <div className="profile__heading">
            <div>
                <h1 className="profile__name">Osmar Sanchez</h1>
                <p className="profile__description">Ingeniero en sistemas computacionales</p>
            </div>
            <button className="profile__btn btn btn--small">
                Editar
            </button>
        </div>

        <div className="profile__information">
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">Informacion General</h2>
                    <button className="profile__edit">
                        <UserRound />
                    </button>
                </div>
                <ul className="profile__list__information">
                    <li className="profile__item">
                        <UserRound />
                        <span>Osmar Uriel Perera Balam</span>
                    </li>
                    <li className="profile__item">
                        <Mail />
                        <span>osmarperera10@gmail.com</span>
                    </li>
                    <li className="profile__item">
                        <Phone />
                        <span>999-483-4392</span>
                    </li>
                </ul>
            </article>
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">Curriculum</h2>
                    <button className="profile__edit">
                        <Pencil />
                    </button>
                </div>
                <p className="profile__text">Curriculum.pdf</p>
                
            </article>
            <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">Experiencia</h2>
                    <button className="profile__edit">
                        <Pencil />
                    </button>
                </div>
                <ul className="experience">
                    <li className="experience__item">
                        <img className="experience__image" src={LinkedIn.src} alt=""/>
                        <div className="experience__body">
                            <h3 className="experience__title">Ingeniero de Sistemas Computacionales</h3>
                            <div className="experience__info">
                                <span className="experience__text">Ingeniero de Sistemas Computacionales</span>
                                <span> • </span>
                                <span className="experience__text">2021 - Actual</span>
                                
                            </div>
                        </div>
                    </li>
                </ul>
                
            </article>
             <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">Educacion</h2>
                    <button className="profile__edit">
                        <Pencil />
                    </button>
                </div>
                   <ul className="education">
                    <li className="education__item">
                        <img className="education__image" src={LinkedIn.src} alt=""/>
                        <div className="education__body">
                            <h3 className="education__title">Instituto Tecnologico de Merida</h3>
                            <span className="education__text">Ingeniero de Sistemas Computacionales</span>
                            <span className="education__text">Febrero 2019 - marzo 2026</span>
                        </div>
                    </li>
                </ul>
                
            </article>
             <article className="profile__card">
                <div className="profile__row">
                    <h2 className="profile__subtitle">Habilidades</h2>
                    <button className="profile__edit">
                        <Pencil />
                    </button>
                </div>
                 <ul className="skills">
                    <li className="skills__item badge">
                        HTML
                    </li>
                    <li className="skills__item badge">
                        CSS
                    </li>
                    <li className="skills__item badge">
                        JS
                    </li>
                    <li className="skills__item badge">
                        TypeScript
                    </li>
                    <li className="skills__item badge">
                        React
                    </li>
                    <li className="skills__item badge">
                        Node
                    </li>
                </ul>
            </article>
        </div>

    </div>
  )
}
