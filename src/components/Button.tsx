import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({...rest}: ButtonProps) {

    return (
        <button 
        className="h-12 rounded-lg font-medium bg-purple-500 px-8 flex justify-center items-center cursor-pointer border-0 text-[#fff] enabled:hover:brightness-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
        {...rest}>
            
        </button>
    )
}