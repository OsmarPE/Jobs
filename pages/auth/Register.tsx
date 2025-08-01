'use client';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
export default function Register() {
    
  return (
     <div className="auth">
            <div className="auth__icon">
                <Lock />
            </div>
            <header className="auth__heading">
                <h1 className="auth__title">Crear cuenta</h1>
                <p className="auth__text">Conecta con empresas que buscan tu perfil profesional
                </p>
            </header>
            <RegisterForm />
            <p className='text-center text-sm mt-4'> ¿No tienes cuenta? <Link href="/auth/login" className="text-secundary-landing hover:underline">Inicia sesión</Link></p>
        
        </div>
  )
}
