'use client'
import { Briefcase, CreditCard, Map } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { useURLParams } from '@/hooks/use-params-url'

export default function AsideJob() {
    const [selectedJobType, setSelectedJobType] = useState<number | null>(null)
    const [selectedJobRange, setSelectedJobRange] = useState<string | null >(null)
    const [selectedJobLocation, setSelectedJobLocation] = useState<number | null>(null)

    const { updateParams, getParam } = useURLParams()

    const handleJobTypeChange = (value: number | null) => {
        setSelectedJobType(value)
        updateParams({ typeJob: value?.toString() ?? '' })
    }

    const handleChangeLocation = (value: number | null) => {
        setSelectedJobLocation(value)
        updateParams({ location: value?.toString() ?? '' })
    }

    useEffect(() => {
        const typeJobFromURL = getParam('typeJob')
        if (typeJobFromURL) {
            setSelectedJobType(+typeJobFromURL)
        }
    }, [])

    const countries = [
        { id:1,name: 'Mexico', code: 'MX' },
        { id:2,name: 'Ingles', code: 'EN' },
        { id:3,name: 'Frances', code: 'FR' },
        { id:4,name: 'Argentina', code: 'AR' },
    ]

    const typesJob = [
        { id: 1, name: "Presencial" },
        { id: 2, name: "En línea" },
        { id: 3, name: "Híbrido" }
    ];

    return (
        <aside className="jobs__aside">
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <Map />
                    Lenguajes
                </h2>
                <ul className="jobs__aside-list">
                    {

                        countries.map((country, index) => (
                            <li className="jobs__aside-item" key={index}>
                                <Checkbox name={country.code} id={country.code} checked={selectedJobLocation === country.id} onCheckedChange={(state) => handleChangeLocation(state ? country.id : null)} />
                                <label htmlFor={country.code}>{country.name}</label>
                            </li>
                        ))
                    }

                </ul>
            </div>
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <Briefcase />
                    Tipo de trabajo
                </h2>
                <ul className="jobs__aside-list">
                    {
                        typesJob.map((typeJob, index) => (
                            <li className="jobs__aside-item" key={index}>
                                <Checkbox name={typeJob.name} id={typeJob.name} checked={selectedJobType === typeJob.id} onCheckedChange={(state) => handleJobTypeChange( state ? typeJob.id : null)} />
                                <label htmlFor={typeJob.name}>{typeJob.name}</label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <CreditCard />
                    Rango Salarial
                </h2>
                <div className="jobs__range"></div>
                <div className="price-labels">
                    <span className="price-label" id="min-price">$1,000</span>
                    <span className="price-label" id="max-price">$20,000</span>
                </div>
            </div>

        </aside>
    )
}
