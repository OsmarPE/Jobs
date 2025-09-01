import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div className="min-h-screen bg-background-landing flex items-center justify-center p-4">
      <div className="w-[90%] max-w-xl bg-white/5  border border-white/10 p-6">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-2 w-16 bg-white/10 rounded mb-4" />
          <Skeleton className="h-8 w-3/4 mb-3 bg-white/10" />
          <Skeleton className="h-4 w-full mb-1 bg-white/10" />
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <Skeleton className="h-5 w-48 mb-6 bg-white/10" />
          
          {/* Name Field */}
          <div className="mb-4">
            <Skeleton className="h-4 w-16 mb-2 bg-white/10" />
            <Skeleton className="h-6 w-32 bg-white/10" />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <Skeleton className="h-4 w-12 mb-2 bg-white/10" />
            <Skeleton className="h-6 w-48 bg-white/10" />
          </div>

    
        </div>

        {/* CV Section */}
        <div className="mb-8">
          <Skeleton className="h-5 w-24 mb-4 bg-white/10" />
          <Skeleton className="h-4 w-full mb-4 bg-white/10" />
          
          {/* CV File */}
          <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg mb-6">
            <div className="w-8 h-8 bg-white/10 rounded flex-shrink-0 flex items-center justify-center">
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-40 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-12 bg-white/10 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}
