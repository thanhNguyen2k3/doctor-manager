import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

const InputField = ({ ...props }: Props) => {
    return (
        <input
            className="outline-none block w-full py-3 px-[6px] border border-form-solid rounded h-[36px] text-[.875rem] font-medium"
            {...props}
        />
    );
};

export default InputField;
