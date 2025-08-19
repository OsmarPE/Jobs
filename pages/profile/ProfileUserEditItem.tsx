import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'
import { User } from '@/src/schemas/user';
import { Pencil, X } from 'lucide-react'
import React from 'react'

type Props = { 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    input: string,
    disabled?: boolean,
}

export default function ProfileUserEditItem({ handleChange, label, input, disabled = false }: Props) {

    const [editable, setEditable] = React.useState(false);


    const handleEdit = () => {
        setEditable(!editable);
    };


    return (
        <div className="text-sm flex items-center">
            <span className="basis-44">{label}</span>
            <div className="flex-1 flex items-center justify-between gap-4">
                {!editable ? (
                    <p  className={"text-white text-base"}>{input}</p>
                ): (
                    <Input value={input} onChange={handleChange} className={"h-9"} />
                )
            }
                {!disabled && <button onClick={() => handleEdit()}>
                   {editable ? <X width={14} /> : <Pencil width={14} />}
                </button>}
            </div>
        </div>
    )
}
