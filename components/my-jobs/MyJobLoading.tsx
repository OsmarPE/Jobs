import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Props{
    className?: string;
}

export default function MyJobLoading({ className = '' }: Props) {
  return (
    <div className={cn("grid gap-4", className)}>
        <div className="w-full bg-white/5 rounded-lg p-6 ">
      {/* Icon skeleton */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-14 h-14 rounded-lg bg-white/10" />
        
        <div className="flex-1">
          {/* Company name skeleton */}
          <Skeleton className="h-4 w-24 mb-2 bg-white/10" />
          
          {/* Job title skeleton */}
          <Skeleton className="h-6 w-48 mb-3 bg-white/10" />
          
          {/* Description skeleton */}
          <Skeleton className="h-4 w-full mb-2 bg-white/10" />
          <Skeleton className="h-4 w-3/4 bg-white/10" />
        </div>
        
        {/* Status badge skeleton */}
      </div>
        <Skeleton className="h-6 ml-auto w-20 rounded-full bg-white/10" />
    </div>
    <div className="w-full bg-white/5 rounded-lg p-6 ">
      {/* Icon skeleton */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-14 h-14 rounded-lg bg-white/10" />
        
        <div className="flex-1">
          {/* Company name skeleton */}
          <Skeleton className="h-4 w-24 mb-2 bg-white/10" />
          
          {/* Job title skeleton */}
          <Skeleton className="h-6 w-48 mb-3 bg-white/10" />
          
          {/* Description skeleton */}
          <Skeleton className="h-4 w-full mb-2 bg-white/10" />
          <Skeleton className="h-4 w-3/4 bg-white/10" />
        </div>
        
        {/* Status badge skeleton */}
      </div>
        <Skeleton className="h-6 ml-auto w-20 rounded-full bg-white/10" />
    </div>
    </div>
  )
}
