import LoginForm from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Login({originPath}:{originPath:string}) {
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

            
            <LoginForm originPath={originPath} />

            <p className='text-center text-sm mt-4'> ¿No tienes cuenta? <Link href="/auth/register" className="text-secundary-landing hover:underline">Crea una cuenta</Link></p>
        </div>
  )
}
