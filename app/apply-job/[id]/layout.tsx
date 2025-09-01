import Circle from '@/components/landing/Circle'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='body-jobs'>
      <Circle className="circle-left-header" />
       <div className="container container--steps ">
          {children}
       </div>
    </div>
  )
}
