import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Switch } from '../ui/switch'
import { Control } from 'react-hook-form';

interface Props {
    name: string;
    description?: string;
    label: string;
    control: Control<any>;
}

export default function FormSwitch({name, description, label, control}: Props) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>{label}</FormLabel>
                        {
                            description && <FormDescription>{description}</FormDescription>
                        }
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
