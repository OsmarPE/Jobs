import Circle from '@/components/landing/Circle'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function ProfileLoading() {
    return (
        <div className="profile">
            <Circle className="circle-left-header" />
            <div className="min-h-screen bg-background-landing text-white">
                {/* Breadcrumb */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <Skeleton className="w-12 h-4 bg-white/10 rounded shimmer" />
                        <span className="text-white/10">  <ChevronRight width={14} /></span>
                        <Skeleton className="w-12 h-4 bg-white/10 rounded shimmer" />
                    </div>

                    {/* Avatar */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-start gap-6">
                            <Skeleton className="w-16 h-16 bg-white/10 rounded-full shimmer flex-shrink-0 " />

                            <div className="flex-1">
                                {/* Name */}
                                <Skeleton className="w-64 h-12 bg-white/10 rounded shimmer mb-2" />

                                {/* Title */}
                                <Skeleton className="w-80 h-6 bg-white/10 rounded shimmer" />
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Skeleton className="w-20 h-10 bg-white/10 rounded shimmer" />
                    </div>

                    {/* General Information Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Skeleton className="w-48 h-7 bg-white/10 rounded shimmer" />
                            <div className="w-6 h-6 bg-white/10 rounded shimmer"></div>
                        </div>

                        <div className="space-y-4 max-w-md">
                            {/* Name field */}
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-white/10 rounded shimmer"></div>
                                <Skeleton className="w-32 h-5 bg-white/10 rounded shimmer" />
                            </div>

                            {/* Email field */}
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-white/10 rounded shimmer"></div>
                                <Skeleton className="w-48 h-5 bg-white/10 rounded shimmer" />
                            </div>

                            {/* Phone field */}
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-white/10 rounded shimmer"></div>
                                <Skeleton className="w-28 h-5 bg-white/10 rounded shimmer" />
                            </div>
                        </div>
                    </div>

                    {/* Curriculum Section */}
                    <div className='grid gap-6'>
                        <Skeleton className="w-full h-24 bg-white/10 rounded shimmer" />
                        <Skeleton className="w-full h-24 bg-white/10 rounded shimmer" />
                    </div>
                </div>

            </div>
        </div>
    )
}