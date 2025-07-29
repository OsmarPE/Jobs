'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const routes = [
    { name: 'Inicio', href: '/' },
    { name: 'Trabajos', href: '/jobs' },
    { name: 'Empresas', href: '/enterprises' },
]

export default function Navegation() {

    const pathname = usePathname()

    return (
        <nav className="main-nav">
            <ul className="main-nav__list">
                {routes.map(({ name, href }, index) => (
                   <li key={index} className="main-nav__item">
                    <Link className={cn("main-nav__link", { active: pathname === href })} href={href}>
                        {name}
                    </Link>
                </li>
                ))}
                
            </ul>
        </nav>
    )
}
