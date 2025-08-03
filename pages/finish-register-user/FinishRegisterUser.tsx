'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import FinishRegisterSuccess from "./FinishRegisterSuccess";
import Circle from "@/components/landing/Circle";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function FinishRegisterUser({id}:{id:string}) {
    
    const [section, setSection] = useState('');
    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState(false);



    const formSchema = z.object({
        locationId: z.string().min(1, { message: 'Debes ingresar una ubicación' }),
        salary: z.string().min(1, { message: 'Debes ingresar un salario' }),
        phone: z.string().min(1, { message: 'Debes ingresar un número de teléfono' }).max(10, { message: 'Debes ingresar un número de teléfono válido' })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            locationId: '',
            salary: '',
            phone: ''
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                finishedRegistration: true,
                locationId: 1
            })
        });

        const datas = await response.json();
        console.log(datas);
    }

    const sections = [
        {
            section: 'phone',
            title: '¿Cuál es el número de teléfono de tu empresa?',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatibus!'
        }
        ,{
            section: 'location',
            title: 'Hay que asegurarnos de que tus preferencias estén actualizadas. ¿En dónde te encuentras?',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatibus!'
        },
        {
            section: 'salary',
            title: '¿Cuál es el salario mínimo que buscas?',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatibus!'
        },
    ]

    const handleNextSection = async(step: number) => {
        
        const nextStep = step + 1;
        
        if (nextStep === sections.length) {

            await form.handleSubmit(onSubmit)()
            setSuccess(true);
            return
        }

        const isValidField = await form.trigger(sections[step].section as any);
    

        if (!isValidField) {
            form.handleSubmit(onSubmit)()
            return
        }

        form.clearErrors()

     
        setStep(nextStep);
    }

    const handlePreviousSection = () => {
        setStep(step - 1);
    }

    return (
        <Form {...form}>
            <Circle className="circle-left-header" />
            {!success ? (<article className="step">
                <div className="step__bar">
                    <div className="step__progress"></div>
                </div>
                <h2 className="step__title">{sections?.[step]?.title}</h2>
                <p className="step__text">{sections?.[step]?.content}</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="step__form">
                    {sections?.[step]?.section === 'location' && <FormField
                        control={form.control}
                        name="locationId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="step__label label">Ubicación</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mexico" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    {
                        sections?.[step]?.section === 'salary' && <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="step__label label">Salario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="$8,000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    {
                        sections?.[step]?.section === 'phone' && <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="step__label label">Número de teléfono</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="+56 999999999" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }

                    <button type="button" onClick={ () => handleNextSection(step)} className="step__submit btn btn--primary">Siguiente</button>

                </form>
            </article>
            ) : <FinishRegisterSuccess />
            }
        </Form>
    )
}
