import { cn } from '@/lib/utils'
import React from 'react'

export default function HeaderLine({className = ''}:{className?:string}) {
  return (
     <div className={cn("header-line", className)}></div>
  )
}
