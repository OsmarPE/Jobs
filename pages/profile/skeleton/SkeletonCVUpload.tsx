import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCVUpload() {
  return (
      <div className="space-y-4">
      <Skeleton className=" w-full bg-white/5 p-4 h-38 flex flex-col gap-4 items-center justify-center">
            <div className="w-12 aspect-square rounded-full bg-white/10" />
            <div className="flex flex-col items-center gap-3 w-full">
                <div className="h-2 w-2/8 bg-white/10 rounded-md" />
                <div className="h-2 w-3/8 bg-white/10 rounded-md" />
            </div>
      </Skeleton>
    </div>
  )
}
