import React, { DetailedHTMLProps, ReactNode } from 'react';

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children: ReactNode;
    variant: 'primary' | 'secondary' | 'default' | 'pending';
};

const Button = ({ children, variant, ...props }: Props) => {
    if (variant === 'primary') {
        return (
            <button className="text-smally bg-primary py-2 px-[13.6px] rounded text-white w-full" {...props}>
                {children}
            </button>
        );
    }

    if (variant === 'pending') {
        return (
            <button className="text-smally bg-gray-200 py-2 px-[13.6px] rounded text-white w-full" {...props}>
                {children}
            </button>
        );
    }

    if (variant === 'default') {
        return (
            <button className="text-smally bg-primary-1 py-2 px-[13.6px] rounded text-white w-full" {...props}>
                {children}
            </button>
        );
    }
};

export default Button;
