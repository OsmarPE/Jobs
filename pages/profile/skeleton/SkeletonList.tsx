import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonExperiences() {
  return (
    <div className="space-y-4">
      <Skeleton className=" w-full bg-white/5 p-4 space-y-2">
            <div className="h-2 w-2/4 bg-white/10 rounded-md" />
            <div className="h-2 w-1/4 bg-white/10 rounded-md" />
            <div className="h-2 w-3/4 bg-white/10 rounded-md" />
      </Skeleton>
      <Skeleton className=" w-full bg-white/5 p-4 space-y-2">
            <div className="h-2 w-2/4 bg-white/10 rounded-md" />
            <div className="h-2 w-1/4 bg-white/10 rounded-md" />
            <div className="h-2 w-3/4 bg-white/10 rounded-md" />
      </Skeleton>
      <Skeleton className=" w-full bg-white/5 p-4 space-y-2">
            <div className="h-2 w-2/4 bg-white/10 rounded-md" />
            <div className="h-2 w-1/4 bg-white/10 rounded-md" />
            <div className="h-2 w-3/4 bg-white/10 rounded-md" />
      </Skeleton>
    </div>
  )
}
