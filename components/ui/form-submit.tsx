import { LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "secondaryLanding" | null | undefined
  type?: "submit" | "button" | "reset"
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
}

export default function FormSubmit({children, loading, variant = 'default', type = 'submit', className = '', size = 'default', ...props}: Props) {

    if (loading) return <Button size={size} type={type} variant={variant} className={cn("flex gap-2",className)} disabled {...props}>
        <LoaderCircle className="w-4 h-4 animate-spin " />
        Cargando...</Button>

  return (
    <Button type={type} variant={variant} className={className} size={size} {...props}>
      {children}
    </Button>
  )
}
