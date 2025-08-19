import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonUserDetails() {
  return (
    <div className="space-y-5">
      <div className=" w-full flex items-center justify-between">
            <Skeleton className="h-2 w-1/12 bg-white/10 rounded-md" />
            <Skeleton className="h-2 w-6/12 bg-white/10 rounded-md" />
      </div>
      <div className=" w-full flex items-center justify-between">
            <Skeleton className="h-2 w-3/12 bg-white/10 rounded-md" />
            <Skeleton className="h-2 w-6/12 bg-white/10 rounded-md" />
      </div>
      <div className=" w-full flex items-center justify-between">
            <Skeleton className="h-2 w-2/12 bg-white/10 rounded-md" />
            <Skeleton className="h-2 w-6/12 bg-white/10 rounded-md" />
      </div>
    </div>
  )
}
