import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export function Input({ placeholder, ...props }: InputProps) {
    return (
        <input
            className='h-12 rounded-lg px-4 bg-[#fff] border-[1px] border-solid border-gray-500 mb-4 focus:border-purple-500 focus:ring-purple-hover focus:outline-none focus:border-2'
            type="text"
            placeholder={placeholder}
            {...props}
        />
    )
}