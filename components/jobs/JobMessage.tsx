import { cn } from "@/lib/utils";
import { AlertCircle, LucideIcon } from "lucide-react";

interface Props{
    className?: string
    children: React.ReactNode
    icon?:LucideIcon,
}

export default function JobMessage({ className = '', children, icon:Icon = AlertCircle }: Props) {
  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
        {Icon && <Icon className="size-4" />}
        <span className="text-sm ">{children}</span>
    </div>
  )
}
