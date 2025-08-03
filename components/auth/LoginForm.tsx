"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormItem from "./FormItem";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const user = z.object({
  email: z.string().email({ message: "Ingresa tu correo electronico" }),
  password: z.string().min(1, { message: "Ingresa tu contraseña" })
})

export default function LoginForm({originPath}:{originPath:string}) {
  const form = useForm({
    resolver: zodResolver(user),
    defaultValues: {
        email: "",
        password: ""
    },
  });
  
  
  const onSubmit = async (data: z.infer<typeof user>) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    
    
    if (response.status !== 200) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    redirect(originPath || '/');

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth__form">

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

        <Button className="h-11 mt-4">Iniciar sesión</Button>
      </form>
    </Form>
  );
}
