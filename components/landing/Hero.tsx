import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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

                    <form className="hero__form">
                        <div className="bg-input/30 flex items-center gap-2">
                            <Input style={{background:'transparent'}} placeholder="Buscar trabajo" id='name' name='name' className='border-none h-12 bg-transparent' />
                            <div className="hero__separator"></div>
                            <Select>
                                <SelectTrigger className="h-12 w-[180px] border-none" style={{background:'transparent'}}>
                                    <SelectValue placeholder="Ubicación" />
                                </SelectTrigger>
                                <SelectContent className=''>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* <input className="hero__search" type="text" placeholder="Buscar trabajo"/> */}
                        </div>
                        <Button className='h-12' size={'lg'}>Buscar</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
