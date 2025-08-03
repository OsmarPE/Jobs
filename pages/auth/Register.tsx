'use client';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, MailPlus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
export default function Register() {

    const [sendedEmailConfirm, setSendedEmailConfirm] = useState(false)

    if (sendedEmailConfirm) return (
        <div className='w-full bg-primary/5  max-w-md text-primary p-6 rounded-md border border-primary/10'>
            <div className='flex items-center justify-center  text-primary size-14 rounded-full bg-primary/15 '>
                <MailPlus className='size-6 ' />
        
            </div>
            <h2 className=' text-lg font-medium mt-4'>Verifica tu correo electrónico</h2>
            <p className='text-sm mt-1  '>
                Te has registrado correctamente. Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.
            </p>
            <Button className='w-full mt-8' asChild>
                <Link href="/auth/login">
                    Iniciar sesión
                </Link>
            </Button>
            
        </div>
    )
    
  return (
        <RegisterForm setSendedEmailConfirm={setSendedEmailConfirm} />
  )
}
