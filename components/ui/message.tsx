import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function Message({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-neutral-400", className)}>
      <AlertCircle className="size-5" />
      <p className="">{children}</p>
    </div>
  );
}
