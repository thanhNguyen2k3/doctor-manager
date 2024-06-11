'use client';

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

const InputView = (props: Props) => {
    return (
        <input
            disabled
            className="outline-none block w-full py-3 px-4 border border-gray-200 rounded h-[56px] text-base font-medium"
            {...props}
        />
    );
};

export default InputView;
