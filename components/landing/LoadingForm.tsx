import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function LoadingForm() {
  return (
    <div className='h-14 p-2 w-full  mt-8 grid grid-cols-[1fr_100px] mx-auto gap-4 rounded-xl bg-white/5 max-w-[500px]'>
        <Skeleton className='h-full rounded-xl bg-white/10' />
        <Skeleton className='h-full rounded-xl bg-white/10' />
    </div>
  )
}
