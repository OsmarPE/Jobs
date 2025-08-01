"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";

interface Props {
  className?: string;
  token: string;
}

const user = z.object({
  code: z.string().min(6, { message: "Debes ingresar los 6 digitos" }),
});

export default function ConfirmAccount({ className = "", token }: Props) {
  const [accountActivate, setAccountActivate] = useState(false);

  const form = useForm({
    resolver: zodResolver(user),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (info: z.infer<typeof user>) => {
    try {
      const response = await fetch(`/api/users/confirm/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const data = await response.json();

      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setAccountActivate(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  return (
    <>
      {!accountActivate ? (
        <div className={className}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot className="size-11" index={0} />
                          <InputOTPSlot className="size-11" index={1} />
                          <InputOTPSlot className="size-11" index={2} />
                          <InputOTPSlot className="size-11" index={3} />
                          <InputOTPSlot className="size-11" index={4} />
                          <InputOTPSlot className="size-11" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-6 w-full" size={"lg"}>
                Confirmar cuenta
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className={className}>
          <p className="text-center text-sm mt-4">
            Ya tienes una cuenta activa
          </p>
        </div>
      )}
    </>
  );
}
