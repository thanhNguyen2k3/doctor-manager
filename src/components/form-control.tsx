import { ReactNode } from 'react';

type Props = {
    label: string;
    children: ReactNode;
    errorField?: string | string[];
};

const FormControl = ({ label, children, errorField }: Props) => {
    return (
        <div>
            <label className="block mb-2 text-sm" htmlFor={label}>
                {label}
            </label>
            {children}

            {errorField && <p className="text-sm mt-2 text-red-500">{errorField}</p>}
        </div>
    );
};

export default FormControl;
