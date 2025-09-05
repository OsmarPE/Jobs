'use client'
import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import Link from "next/link"

export const HeroFormSearchInput = () => {

    const time = useRef<NodeJS.Timeout | null>(null)
    const [data, setData] = useState<any[]>([])

    const getData = async (search: string) => {
        const res = await fetch(`/api/cities?search=${search}`)
        const data = await res.json()
        console.log(data.data)
        setData(data.data)
    }


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (time.current) {
            clearTimeout(time.current)
        }
        if (value.length === 0) {
            setData([])
            return
        }
        time.current = setTimeout(() => {
            getData(value)
        }, 500)
    }

    
    return (
        <div className='relative w-full'>
            
            <Input onChange={handleSearch} style={{ background: 'transparent' }} placeholder="Buscar trabajo" id='name' name='name' className='border-none h-12 bg-transparent w-full' />
            {data.length > 0 && (
                <ul className="absolute list-none top-full left-0 w-full bg-background-landing backdrop-blur-md translate-y-3 rounded max-h-60 overflow-y-auto z-10 text-sm">
                    {data.map(item => (
                        <li key={item.id}>
                            <Link href={`/jobs/?search=${item.id}`} className="block py-2 px-4 text-left hover:bg-secundary-landing/10">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}