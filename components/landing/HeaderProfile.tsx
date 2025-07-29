'use client'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
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
export default function HeaderProfile() {

    const auth = true
    const router = useRouter()

    if (auth) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>OS</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                        <UserRound />
                        Mi perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bookmark />
                        Mis favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
