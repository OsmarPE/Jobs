
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem as FormItems,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>  {
  control: Control<any>
  name: string,
  label: string,
  placeholder: string,
}

export default function FormItem({ control, name, label, placeholder, type = 'text'}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}

      render={({ field }) => (
        <FormItems>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
           <FormMessage />
        </FormItems>
      )}
    />
  )
}   
