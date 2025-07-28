import React from 'react'

export default function About() {
  return (
      <section className="about">
            <div className="container">
                <div className="about__body">
                    <div className="about__left">
                        <div className="about__badge badge">
                            <div className="badge__point"></div>
                            <span className="badge__text">Sobre nosotros</span>
                        </div>
                        <h2 className="about__title subtitle">
                            <span className="subtitle--italic">Las cosas que te importan del trabajo</span> son lo más
                            importante para nosotros
                        </h2>
                        <p className="about__text">Libere su verdadero portencial y desccubra un mundo de oportunidades que
                            se alinean con sus habilidades, intereses, y aspiraciones</p>
                    </div>
                    <div className="about__right">
                        <div className="stats">
                            <div className="stats__card">
                                <span className="stats__number">100+</span>
                                <span className="stats__label">Empresas están disponibles</span>
                            </div>
                            <div className="stats__card">
                                <span className="stats__number">240+</span>
                                <span className="stats__label">Usuarios activos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
