import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

const InputForm = ({ ...props }: Props) => {
    return (
        <input
            className="outline-none block w-full py-3 px-4 border border-gray-400 rounded h-[56px] text-base font-medium"
            {...props}
        />
    );
};

export default InputForm;
