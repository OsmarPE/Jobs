'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, LogOut, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/lib/utils'
import logoutAction from '@/actions/logout'
export default function HeaderProfile({ user }: { user: { id: string, name: string, avatar: string } | null }) {


    const [auth, setAuth] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            setAuth(true)
        }
    }, [])


   
    const logout = async () => {
        await fetch(`/api/users/logout`);
        router.refresh();
        setAuth(false)
    }

    if (auth) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>OS</AvatarFallback>
                        {user?.avatar && <AvatarImage src={`/uploads/${user.avatar}`} alt={user.name} />}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                        <UserRound />
                        Mi perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/my-jobs')}>
                        <Bookmark />
                        Mis trabajos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                        <LogOut />
                        Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        )
    }

    return (
        <div className="header__action">
            <Button variant={'secondaryLanding'} asChild>
                <Link href="/auth/register">
                    Registrarse
                </Link>
            </Button>
            <Button asChild>
                <Link href="/auth/login">
                    Iniciar Sesión
                </Link>
            </Button>
        </div>
    )
}

