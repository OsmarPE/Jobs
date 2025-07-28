import Image from 'next/image'
import React from 'react'
import GridImage from "@/img/grid.svg";
import { AudioLines, Lock, Zap } from 'lucide-react';

export default function Services() {
  return (
     <section className="services">
            <div className="container">
                <div className="services__body">
                    <div className="services__badge badge">
                        <div className="badge__point"></div>
                        <span className="badge__text">Servicios</span>
                    </div>
                    <h2 className="services__title subtitle">
                        <span className="subtitle--italic">La única app que conecta</span> tu talento con las oportunidades
                        perfectas para ti
                    </h2>
                    <p className="services__text">Lorem ipsum dolor sit amet consectetur. Id eu rhoncus rutrum enim a. Ut
                        ornare in diam euismod libero elit.</p>
                    <ul className="services__grid">
                        <li className="service">
                            <div className="service__icon">
                                <Zap />
                            </div>
                            <h3 className="service__title">Proceso Ultra-Rápido</h3>
                            <p className="service__text">
                                Olvídate de perder tiempo revisando empleos que no encajan contigo. Nuestro algoritmo
                                inteligente te muestra únicamente las vacantes que coinciden con tu perfil, experiencia
                                y ubicación
                            </p>
                        </li>
                        <li className="service">
                            <div className="service__icon">
                                <AudioLines />
                            </div>
                            <h3 className="service__title">Proceso Ultra-Rápido</h3>
                            <p className="service__text">
                                Olvídate de perder tiempo revisando empleos que no encajan contigo. Nuestro algoritmo
                                inteligente te muestra únicamente las vacantes que coinciden con tu perfil, experiencia
                                y ubicación
                            </p>
                        </li>
                        <li className="service service--w-full"> 
                            <div className="service__icon">
                                <Lock />
                            </div>
                            <h3 className="service__title">Proceso Ultra-Rápido</h3>
                            <p className="service__text">
                                Olvídate de perder tiempo revisando empleos que no encajan contigo. Nuestro algoritmo
                                inteligente te muestra únicamente las vacantes que coinciden con tu perfil, experiencia
                                y ubicación
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <Image className="services__circles services__circles--left" src={GridImage} alt="grid"/> 
            <Image className="services__circles services__circles--right" src={GridImage} alt="grid"/> 
        </section>
  )
}
