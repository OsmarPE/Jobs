'use client'
import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { jobsApi } from "@/app/services/api"

export const HeroFormSearch = () => {

    const time = useRef<NodeJS.Timeout | null>(null)
    const [data, setData] = useState<any[]>([])
    const [countries, setCountries] = useState<{ id: number; name: string; isoCode: string }[]>([])
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null)

    const getData = async (search: string) => {
        try {
            const { data, success } = await jobsApi.getAllJobs({
                search
            })
            
            setData(data)
        } catch (error) {
            console.error("Error fetching cities:", error)
        }
    }

    useEffect(() => {
        const getCountries = async () => {
            const { data, success } = await jobsApi.getAllCountries()
            console.log(data);
            
            if (success) {
                setCountries(data)
            }
        }
        getCountries()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
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
            <div className="bg-input/30 flex items-center gap-2">
            <Input onChange={handleSearch} style={{ background: 'transparent' }} placeholder="Buscar trabajo" id='name' name='name' className='border-none h-12 bg-transparent w-full' />
                {data.length > 0 && (
                    <ul className="absolute list-none top-full left-0 w-full bg-background-landing backdrop-blur-md translate-y-3 rounded max-h-60 overflow-y-auto z-10 text-sm">
                        {data.map(item => (
                            <li key={item.id}>
                                <Link href={`/jobs/${item.id}`} className="py-2 flex items-center gap-3 px-4 text-left hover:bg-secundary-landing/10">
                                    <SearchIcon className="size-4" />
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="hero__separator"></div>
                <Select onValueChange={(value) => { setSelectedCountry(Number(value)) }} >
                    <SelectTrigger className="h-12 w-[180px] border-none" style={{ background: 'transparent' }}>
                        <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent className=''>
                        {countries.map(country => (
                            <SelectItem key={country.id} value={country.id?.toString()} >
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
        </div>
    )

}