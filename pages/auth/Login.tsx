import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
     <div className="auth">
            <div className="auth__icon">
                <Lock />
            </div>
            <header className="auth__heading">
                <h1 className="auth__title">Iniciar sesión</h1>
                <p className="auth__text">Bienvenido de regreso, estas a unos pasos de encontrar tus sueños con un solo clic.
                </p>
            </header>

            <form className="auth__form">
                <div className="auth__item">
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input type="email" id="email" placeholder="exemple@gmail.com"/>
                </div>
                <div className="auth__item">
                    <Label htmlFor="password" className="mb-2">Contraseña</Label>
                    <Input type="password" id="password" placeholder="••••••••••••••"/>
                </div>

                <Button className="h-11 mt-4">Iniciar Sesión</Button>
            </form>
            <p className='text-center text-sm mt-4'> ¿No tienes cuenta? <Link href="/auth/register" className="text-secundary-landing hover:underline">Crea una cuenta</Link></p>
        </div>
  )
}
