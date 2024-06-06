'use client';

import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';

const BackButton = () => {
    const router = useRouter();
    return (
        <button className="flex items-center gap-x-1 hover:underline text-base my-4" onClick={() => router.back()}>
            <IoMdArrowBack /> <span>Quay lại</span>
        </button>
    );
};

export default BackButton;
