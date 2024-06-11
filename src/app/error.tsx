'use client';

import Image from 'next/image';

const error = ({ reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="relative h-screen w-screen flex  justify-center items-center">
            <div className="relative z-10 w-[800px] grid grid-cols-3 mx-auto max-w-full">
                <div className="col-span-1">
                    <Image src="/404.webp" className="w-full" alt="" width={400} height={400} />
                </div>
                <div className="bg-gray-50 shadow shadow-gray-300 my-auto text-center p-4 col-span-2 border-t-4 border-gray-500 rounded">
                    <div className="space-y-1">
                        <h1 className="text-6xl font-semibold">404</h1>
                        <h3 className="text-2xl font-semibold">Page not found</h3>
                    </div>
                    <div className="mt-6 space-x-1">
                        <button
                            className="border mr-2 border-gray-500 rounded px-4 py-2 bg-black text-white"
                            onClick={reset}
                        >
                            Thử lại
                        </button>
                        <a href={'/'}>Quay về trang chủ</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default error;
