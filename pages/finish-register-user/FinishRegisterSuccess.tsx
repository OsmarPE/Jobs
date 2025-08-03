import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function FinishRegisterSuccess() {


    return (
        <article className="step step--success">
            <div className="step__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h2 className="step__title">Hemos terminado</h2>
            <p className="step__text">Estas listo para poder encontrar un trabajo, dale a siguiente para regresar al inicio</p>
            <Button asChild size={'lg'} className='w-full'>
                <Link href="/">
                    Empezar
                </Link>
            </Button>
        </article>
    )
}
