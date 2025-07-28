import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function page() {
  return (
    <div className="body-jobs">
      <div className="container container--steps">
        <article className="step">
              <div className="step__bar">
                  <div className="step__progress"></div>
              </div>
              <h2 className="step__title">Hay que asegurarnos de que tus preferencias estén actualizadas. ¿En dónde te encuentras?</h2>
              <p className="step__text">Lorem ipsum dolor sit amet consectetur. Eget elit tellus mauris tellus duis eget accumsan interdum sagittis.</p>
              <form className="step__form">
                  <div className="step__item">
                      <Label htmlFor="location" className="step__label la3
                      bel">Ubicación</Label>
                      <Input className="step__input input" type="text" id="location" placeholder="Mexico"/>
                  </div>
                  <Input type="submit"  value="Siguiente" className="step__submit btn btn--primary"/>
              </form>
          </article>
      </div>
    </div>
  )
}
