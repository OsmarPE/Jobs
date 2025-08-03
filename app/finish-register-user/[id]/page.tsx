import FinishRegisterUser from '@/pages/finish-register-user/FinishRegisterUser'
import { getUserById } from '@/src/schemas/user'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) { 

  const { id } = await params

  const user = await getUserById(+id)

  if (!user || !user?.active || user?.finishedRegistration) {
      redirect('/')
  }

  return (
    <div className="body-jobs">
      <div className="container container--steps">
        <FinishRegisterUser id={id} />
      </div>
    </div>
  )
}
