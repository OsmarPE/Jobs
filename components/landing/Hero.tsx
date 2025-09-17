import React, { Suspense } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { getCountries } from '@/src/schemas/countries'
import LoadingForm from './LoadingForm'
import { HeroFormSearch } from './HeroFormSearch'

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero__container">
                <div className="hero__body">
                    <div className="hero__badge badge">
                        <div className="badge__point"></div>
                        <span className="badge__text">100+ personas ya se unieron con nosotros</span>
                    </div>

                    <h1 className="hero__title">
                        Busca, aplica y obten <span className="hero__title--italic">el trabajo de tu sueño</span>
                    </h1>
                    <p className="hero__text">Una plataforma líder de búsqueda de empleo que conecta talentos con empresas
                        líderes en segundos.</p>

                    <Suspense fallback={<LoadingForm />}>
                        <HeroForm />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}


export const HeroForm = async () => {
    const countries = await getCountries()

    return (
        <form className="hero__form">
            <HeroFormSearch />
            <Button className='h-12' size={'lg'}>Buscar</Button>
        </form>
    )

}