import { cn } from '@/lib/utils'
import React from 'react'

export default function Circle({className = ''}:{className?:string}) {
  return (
       <div className={cn("circle", className)}></div>
  )
}
