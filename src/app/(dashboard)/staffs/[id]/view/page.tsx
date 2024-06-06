import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import InputView from '@/components/input-view';
import { db } from '@/lib/db';
import Image from 'next/image';

type Params = {
    params: {
        id: string;
    };
};

const Page = async ({ params: { id } }: Params) => {
    const data = await db.user.findFirst({
        where: {
            id,
        },
        include: {
            department: true,
        },
    });

    const departments = await db.department.findMany();

    const formatGender = (gender: string) => {
        if (gender === 'male') return 'Nam';
        if (gender === 'female') return 'Nữ';
        if (gender === 'orther') return 'Giới tính thứ 3';
    };

    const formatRole = (role: string) => {
        if (role === 'admin') return 'ADMIN';
        if (role === 'doctor') return 'Bác sĩ';
        if (role === 'staff') return 'Nhân viên';
        if (role === 'manager') return 'Quản lý';
        if (role === 'intern') return 'Thực tập sinh';
    };

    return (
        <div className="bg-white shadow shadow-primary w-[1200px] mx-auto max-w-full p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">
                Nhân viên :{' '}
                <span className="text-xl underline">
                    {data?.first_name} {data?.last_name}
                </span>
            </h1>
            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-1">
                    <Image width={200} height={260} src={`/uploads/${data?.image}` || ''} alt="Avatar" />
                </div>
                <div className="col-span-4 grid grid-cols-2 gap-3">
                    <FormControl label="Họ">
                        <InputView
                            defaultValue={data?.first_name || ''}
                            name="first_name"
                            id="first_name"
                            placeholder="Họ của bác sĩ"
                        />
                    </FormControl>
                    <FormControl label="Tên">
                        <InputView
                            defaultValue={data?.last_name || ''}
                            name="last_name"
                            id="last_name"
                            placeholder="Tên của bác sĩ"
                        />
                    </FormControl>
                    <FormControl label="Địa chỉ Email">
                        <InputView
                            defaultValue={data?.email || ''}
                            name="email"
                            id="email"
                            placeholder="Địa chỉ email của bạn"
                        />
                    </FormControl>

                    <FormControl label="Ngày tháng năm sinh (Tháng/Ngày/Năm)">
                        <InputView
                            defaultValue={data?.date_of_birth!?.toISOString().substring(0, 10)}
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                        />
                    </FormControl>
                    <FormControl label="Giới tính">
                        <InputView defaultValue={formatGender(data?.gender!)} />
                    </FormControl>
                    <FormControl label="Ngày gia nhập">
                        <InputView
                            type="date"
                            name="join_date"
                            id="join_date"
                            defaultValue={data?.join_date?.toISOString().substring(0, 10)}
                        />
                    </FormControl>
                    <FormControl label="Chức vụ">
                        <InputView defaultValue={formatRole(data?.role!)} />
                    </FormControl>
                    <FormControl label="Chuyên khoa">
                        <select
                            name="department_id"
                            id="department_id"
                            defaultValue={data?.department?.id!}
                            disabled
                            className="border border-gray-400 w-full outline-none h-[56px] py-3 px-4 rounded"
                        >
                            <option value={''}>-- Chọn khoa --</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default Page;
