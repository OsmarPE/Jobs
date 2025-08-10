'use client'
import { Button } from '@/components/ui/button'
import { useURLParams } from '@/hooks/use-params-url'
import React, { useRef } from 'react'

export default function SearchJob() {

    const time = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { updateParams, getParam } = useURLParams()

    const handleSearch = (value: string) => {
        if (time.current) {
            clearTimeout(time.current)
        }
        time.current = setTimeout(() => {
            updateParams({ search: value })
        }, 500)
    }

    const search = getParam('search') ?? ''
    
    return (
        <form className="hero__form jobs__form">
            <div className="hero__input">
                <input className="hero__search" defaultValue={search} type="text" placeholder="Buscar trabajo" onChange={(e) => handleSearch(e.target.value)} />
                <div className="hero__separator"></div>
                <input className="hero__location" type="text" placeholder="Ubicación" />
            </div>
            <Button className='h-11'>Buscar</Button>
        </form>
    )
}
