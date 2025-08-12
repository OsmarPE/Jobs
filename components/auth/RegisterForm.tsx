"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormItem from "./FormItem";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import Link from "next/link";
import FormSubmit from "../ui/form-submit";

const user = z.object({
  name: z.string().min(1, { message: "Debes ingresar un nombre" }),
  email: z.string().email({ message: "Debes ingresar un email válido" }),
  password: z
    .string()
    .min(8, {
      message: "Debes ingresar una contraseña de al menos 8 caracteres",
    }),
  passwordRepeat: z
    .string()
    .min(8, {
      message: "Debes ingresar una contraseña de al menos 8 caracteres",
    }),
}).refine((data) => data.password === data.passwordRepeat, {
  message: "Las contraseñas no coinciden",
  path: ["passwordRepeat"],
});

export default function RegisterForm({setSendedEmailConfirm}:{setSendedEmailConfirm:React.Dispatch<React.SetStateAction<boolean>>}) {
  const form = useForm({
    resolver: zodResolver(user),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof user>) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log(response);
    
    
    if (response.status !== 200) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    
    setSendedEmailConfirm(true);

  };

  return (
     <div className="auth">
            <div className="auth__icon">
                <Lock />
            </div>
            <header className="auth__heading">
                <h1 className="auth__title">Crear cuenta</h1>
                <p className="auth__text">Conecta con empresas que buscan tu perfil profesional
                </p>
            </header>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="auth__form">
              <FormItem
                  control={form.control}
                  name="name"
                  label="Nombre"
                  placeholder="lina romero"
                />
                <FormItem
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="exemple@gmail.com"
                />
                <FormItem
                  control={form.control}
                  name="password"
                  label="Contraseña"
                  placeholder="••••••••••••••"
                  type="password"
                />
                <FormItem
                  control={form.control}
                  name="passwordRepeat"
                  label="Repetir Contraseña"
                  placeholder="••••••••••••••"
                  type="password"
                />

                 <FormSubmit loading={form.formState.isSubmitting} className="h-11 mt-4">Crear cuenta</FormSubmit>
              </form>
            </Form>
            <p className='text-center text-sm mt-4'> ¿No tienes cuenta? <Link href="/auth/login" className="text-secundary-landing hover:underline">Inicia sesión</Link></p>
        
        </div>
  );
}
