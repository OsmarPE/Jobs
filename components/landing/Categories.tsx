import { Building2, ChartPie, Code, Globe, SquareDashedTopSolid } from 'lucide-react'
import React from 'react'

export default function Categories() {
  return (
    <section className="categories">
            <div className="container">
                <div className="categories__body">
                    <div className="categories__badge badge">
                        <div className="badge__point"></div>
                        <span className="badge__text">Categorias</span>
                    </div>
                    <h2 className="categories__title subtitle">
                        <span className="subtitle--italic">Explora Oportunidades</span> en Todas las Áreas
                    </h2>
                    <p className="categories__text">Lorem ipsum dolor sit amet consectetur. Id eu rhoncus rutrum enim a. Ut
                        ornare in diam euismod libero elit.</p>

                    <ul className="categories__list">
                        <li className="category">
                            <div className="category__icon">
                                <Code />
                            </div>
                            <p className="category__text">Desarrollo Web</p>
                        </li>
                        <li className="category">
                            <div className="category__icon">
                                <ChartPie />
                            </div>
                            <p className="category__text">Marketing Digital</p>
                        </li>
                        <li className="category">
                            <div className="category__icon">
                                <SquareDashedTopSolid />
                            </div>
                            <p className="category__text">Diseño Gráfico y UX/UI</p>
                        </li>
                        <li className="category">
                            <div className="category__icon">
                                <Building2 />
                            </div>
                            <p className="category__text">Consultoria Empresarial</p>
                        </li>
                        <li className="category">
                            <div className="category__icon">
                                <Globe />
                            </div>
                            <p className="category__text">Traducción e Idiomas</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="circle circle-left-category"></div>
            <div className="circle circle-right-category"></div>
        </section>
)
}
