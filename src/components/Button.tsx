import { clsx } from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

export function Button({ className, ...rest }: ButtonProps) {

    return (
        <button
            className={clsx(
                // Definições padrões
                'rounded-lg font-medium bg-purple-500 px-8 flex justify-center items-center cursor-pointer border-0 text-[#fff] enabled:hover:brightness-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed', className
            )}
            {...rest}>

        </button>
    )
}

