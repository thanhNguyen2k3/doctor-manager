'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    to: string;
};

const CreateButton = ({ children, to }: Props) => {
    return (
        <Link className="right-8 border border-gray-500 px-4 py-2 rounded-sm hover:bg-hover-primary absolute" href={to}>
            {children}
        </Link>
    );
};

export default CreateButton;
