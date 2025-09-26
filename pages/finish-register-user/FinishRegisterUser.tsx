'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import FinishRegisterSuccess from "./FinishRegisterSuccess";
import Circle from "@/components/landing/Circle";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { jobsApi } from "@/app/services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinishRegisterUser({id}:{id:string}) {
    
    const [section, setSection] = useState('');
    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const formSchema = z.object({
        locationId: z.string().min(1, { message: 'Debes ingresar una ubicación' }),
        salary: z.string().min(1, { message: 'Debes ingresar un salario' }),
        phone: z.string().min(1, { message: 'Debes ingresar un número de teléfono' }).max(10, { message: 'Debes ingresar un número de teléfono válido' }),
        country: z.string().min(1, { message: 'Debes ingresar un país'})
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            locationId: '',
            salary: '',
            phone: '',
            country: ''
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
                finishedRegistration: true
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

    const getCityByCountry = async(country: string) => {
        try {
            const response = await jobsApi.getCityByCountry(country);
            console.log(response);
            
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities by country:", error);
        }
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await jobsApi.getAllCountries();
                console.log(response.data);
                
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <Form {...form}>
            <Circle className="circle-left-header" />
            {!success ? (<article className="step">
                <div className="step__bar">
                    <div className="step__progress" style={{ width: `${((step + 1) / sections.length) * 100}%` }}></div>
                </div>
                <h2 className="step__title">{sections?.[step]?.title}</h2>
                <p className="step__text">{sections?.[step]?.content}</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="step__form">
                    {sections?.[step]?.section === 'location' && 
                    <div className="grid grid-cols-2 gap-4 ">
                         {countries.length > 0 && <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Pais</FormLabel>
                                <Select onValueChange={(value) => {
                                    field.onChange(value)
                                    getCityByCountry(value)
                                }} defaultValue={field.value}>
                                    <FormControl >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Mexico" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                   { countries.map((country: any) => (
                                        <SelectItem key={country.id} value={country.name}>{country.name}</SelectItem>
                                   ))}
                                    </SelectContent>
                                </Select>
                                </FormItem>
                            )}
                            />}
                            {cities.length > 0 && <FormField
                                control={form.control}
                                name="locationId"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="step__label label">Ciudad</FormLabel>
                                        <FormControl className="w-full">
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Monterrey" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {cities.map((city: any) => (
                                                        <SelectItem key={city.id} value={city.id.toString()}>{city.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}
                    </div>
                    
                    }
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
                                        <Input type="tel" placeholder="Ej: 999-232-3492" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <div className="step__actions">
                        <button type="button" onClick={ () => handleNextSection(step)} className="step__submit btn btn--primary">Siguiente</button>
                        {(step > 0 && step < sections.length - 1) && <button type="button" onClick={handlePreviousSection} className="step__back btn btn--secundary w-full">Atrás</button>}
                    </div>
                </form>
            </article>
            ) : <FinishRegisterSuccess />
            }
        </Form>
    )
}
