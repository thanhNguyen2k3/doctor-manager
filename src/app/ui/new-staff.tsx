'use client';

import FormControl from '@/components/form-control';
import InputForm from '@/components/input-form';
import { useActionState, useState } from 'react';
import { uploadFile } from '../actions/uploads';
import Image from 'next/image';
import Button from '@/components/button';
import Snackbar from '@mui/material/Snackbar';
import { Department } from '@prisma/client';
import { createStaff } from '../actions/mutations';
import BackButton from '@/components/back-button';

type Props = {
    departments: Department[];
};

const NewStaff = ({ departments }: Props) => {
    const [state, action, pending] = useActionState(uploadFile, undefined);
    const [formState, formAction, formPending] = useActionState(createStaff, undefined);

    const [open, setOpen] = useState(false);

    const message = state?.message;
    const url = state?.url;

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <div className="bg-white p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">Thêm nhân viên</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-y-1">
                <div className="border border-dashed border-gray-400 w-[200px] h-auto p-4">
                    <Image
                        src={!url ? '/doctor.png' : `/uploads/${url}`}
                        width={300}
                        className="object-cover mb-4"
                        height={400}
                        alt="Image"
                    />
                </div>

                <form action={action} className="flex mb-4 border-gray-400 max-w-full">
                    <FormControl label="Ảnh đại diện">
                        <div className="flex flex-col gap-y-3">
                            <InputForm type="file" name="image" id="image" />
                            <Button variant={pending ? 'pending' : 'default'} type="submit" onClick={handleClick}>
                                submit
                            </Button>
                        </div>
                    </FormControl>

                    <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} message={message} />
                </form>
            </div>
            <form action={formAction}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <input name="image" id="image" hidden value={url} defaultValue={''} />
                    <FormControl errorField={formState?.errors?.first_name!} label="Họ của bạn">
                        <InputForm name="first_name" id="first_name" placeholder="Họ của bác sĩ" />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.last_name} label="Tên của bạn">
                        <InputForm name="last_name" id="last_name" placeholder="Tên của bác sĩ" />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.email} label="Địa chỉ Email">
                        <InputForm name="email" id="email" placeholder="Địa chỉ email của bạn" />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.password} label="Mật khẩu">
                        <InputForm name="password" id="password" type="text" placeholder="Mật khẩu" />
                    </FormControl>
                    <FormControl
                        errorField={formState?.errors?.date_of_birth}
                        label="Ngày tháng năm sinh (Tháng/Ngày/Năm)"
                    >
                        <InputForm type="date" name="date_of_birth" id="date_of_birth" />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.gender} label="Giới tính">
                        <select
                            name="gender"
                            id="gender"
                            className="border border-gray-400 w-full outline-none h-[56px] py-3 px-4 rounded"
                        >
                            <option value={'male'}>Nam</option>
                            <option value={'female'}>Nữ</option>
                            <option value={'orther'}>Giới tính thứ 3</option>
                        </select>
                    </FormControl>
                    <FormControl errorField={formState?.errors?.join_date} label="Ngày gia nhập">
                        <InputForm type="date" name="join_date" id="join_date" />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.role} label="Chức vụ">
                        <select
                            name="role"
                            id="role"
                            className="border border-gray-400 w-full outline-none h-[56px] py-3 px-4 rounded"
                        >
                            <option value={'staff'}>Nhân viên</option>
                            <option value={'doctor'}>Bác sĩ</option>
                            <option value={'intern'}>Bác sĩ thực tập</option>
                        </select>
                    </FormControl>
                    <FormControl errorField={formState?.errors?.department_id} label="Chuyên khoa">
                        <select
                            name="department_id"
                            id="department_id"
                            defaultValue={''}
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

                    <div className="col-span-1 md:col-span-2">
                        <Button aria-disabled={formPending} variant={formPending ? 'pending' : 'default'} type="submit">
                            {formPending ? 'Đang gửi...' : 'Tạo mới'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewStaff;
