import React from 'react'
import Profile from "@/img/profile.jpg";
export default function Testimonials() {
  return (
     <section className="testimonials">
            <div className="container">
                <div className="testimonials__body">
                    <div className="testimonials__badge badge">
                        <div className="badge__point"></div>
                        <span className="badge__text">Testimonios</span>
                    </div>
                    <h2 className="testimonials__title subtitle">
                        Lo que dicen <span className="subtitle--italic">nuestros usuarios</span>
                    </h2>
                    <p className="testimonials__text">Lorem ipsum dolor sit amet consectetur. Id eu rhoncus rutrum enim a.
                        Ut ornare in diam euismod libero elit.</p>

                    <ul className="testimonials__grid">
                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>

                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>

                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>

                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>

                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>

                        <li className="testimonial">
                            <p className="testimonial__text">
                                Gran plataforma para poder conseguir empleo de forma inmediata. Al segundo envío de mi
                                CV me contactaron.
                            </p>
                            <div className="testimonial__author">
                                <img src={Profile.src} alt="Marco Hernandez" className="testimonial__avatar"/>
                                <div className="testimonial__info">
                                    <h3 className="testimonial__name">Marco Hernandez</h3>
                                    <span className="testimonial__role">Front End Developer</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
  )
}
