import { auth } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const FormLayout = async ({ children }: Props) => {
    const session = await auth();

    if (session) redirect('/');

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex w-layout-form shadow shadow-primary relative h-auto">
                <div className="w-1/2 relative">
                    <div className="bg-background-page relative w-full h-full z-10 text-white p-12 space-y-4">
                        <Image src={'/logo.png'} width={119} height={40} alt="Logo" />

                        <h1 className="font-medium text-base">Mẫu quản trị và bảng điều khiển hiện đại đáp ứng</h1>
                        <p>
                            Một trang web quản trị bác sĩ là một nền tảng trực tuyến được thiết kế để hỗ trợ các bác sĩ
                            và các chuyên gia y tế trong việc quản lý các hoạt động hàng ngày của phòng khám hoặc bệnh
                            viện. Dưới đây là mô tả chi tiết về các tính năng và lợi ích của một trang web quản trị bác
                            sĩ
                        </p>

                        <button className="bg-hot px-3 py-3 rounded">Tìm hiểu thêm</button>
                    </div>
                    <div
                        style={{
                            background: 'url(/hospital.jpg)',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="absolute z-0 left-0 right-0 bottom-0 top-0"
                    ></div>
                </div>
                <div className="p-12 flex-1">{children}</div>
            </div>
        </div>
    );
};

export default FormLayout;
