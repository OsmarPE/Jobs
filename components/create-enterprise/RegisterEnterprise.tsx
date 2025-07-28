import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import BreadcrumbLinks from '../layout/BreadcrumbLinks'


export default function RegisterEnterprise() {
  
  
  
    return (
    <div className='body-jobs'>
        <div className="container">
            <div className="enterprise">
                <BreadcrumbLinks className='mb-6' links={[{ label: 'Inicio', href: '/' }, { label: 'Crear Empresa', href: '/create-enterprise' }]} />
                <div className="enterprise__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-building2-icon lucide-building-2">
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                        <path d="M10 6h4" />
                        <path d="M10 10h4" />
                        <path d="M10 14h4" />
                        <path d="M10 18h4" />
                    </svg>
                </div>
                <h1 className="enterprise__title">Crear <span>Empresa</span> </h1>
                <p className="enterprise__text">Llena todos los campos para poder añadir un nuevo trabajo</p>

                <form className="enterprise__form">
                    <div className="enterprise__form-item">
                        <Label htmlFor="name" className="enterprise__label label">Nombre de la empresa</Label>
                        <Input className="enterprise__input input" type="text" id="name" placeholder="Front End Developer"/>
                    </div>
                    <div className="enterprise__form-row">
                        <div className="enterprise__form-item">
                            <Label htmlFor="email" className="enterprise__label label">Email</Label>
                            <Input className="enterprise__input input" type="text" id="email" placeholder="support@propease.com"/>
                        </div>
                        <div className="enterprise__form-item">
                            <Label htmlFor="phone" className="enterprise__label label">Teléfono</Label>
                            <Input className="enterprise__input input" type="text" id="phone" placeholder="+1 (123) 456-7890"/>
                        </div>
                    </div>
                    <div className="enterprise__form-item">
                        <Label htmlFor="website" className="enterprise__label label">Pagina web</Label>
                        <Input className="enterprise__input input" type="text" id="website" placeholder="https://www.propease.com"/>
                    </div>
                    <div className="enterprise__form-item">
                        <Label htmlFor="logo" className="enterprise__label label">Logo</Label>
                        <div className="upload">
                            <div className="upload__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cloud-upload-icon lucide-cloud-upload"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>
                            </div>
                            <div className="upload__information">
                                <div className="upload__title"> 
                                    <span>Arrastras y soltar tu imagen o </span>
                                    <button>subir imagen</button>
                                </div>
                                <p className="upload__text">Soporta: PNG, JPG, Wepb.</p>
                            </div>
                        </div>
                    </div>
                    <div className="enterprise__form-item">
                        <Label htmlFor="plan" className="enterprise__label label">Plan</Label>
                        <div className="enterprise__plans">
                            <div className="plan">
                                <span className="plan__type">Free</span>
                                <p className="plan__price">$0 /mes</p>
                                <p className="plan__text">Plan perfecto para las empresas chicas</p>
                                <ul className="plan__list">
                                    <li className="plan__item">5-10 publicaciones por mes</li>
                                    <li className="plan__item">Acceso a la API</li>
                                    <li className="plan__item">Acceso a las redes sociales</li>
                                    <li className="plan__item">Acceso a los correos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="enterprise__action">
                        <button className="enterprise__action-btn btn btn--secundary">Cancelar</button>
                        <button className="enterprise__action-btn btn btn--primary">Crear empresa</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
