'use client';

import BackButton from '@/components/back-button';
import { Department, User } from '@prisma/client';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { uploadFile } from '../actions/uploads';
import { editProfile } from '../actions/mutations';
import FormControl from '@/components/form-control';
import InputForm from '@/components/input-form';
import Button from '@/components/button';
import Snackbar from '@mui/material/Snackbar';

type ExtandUser = User & {
    department?: Department | null;
};

type Props = {
    data: ExtandUser | null;
};

const EditProfile = ({ data }: Props) => {
    const [state, action, pending] = useActionState(uploadFile, undefined);
    const [formState, formAction, formPending] = useActionState(editProfile, undefined);

    const [open, setOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const message = state?.message;
    const url = state?.url;
    const success_message = formState?.message;

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenStatus(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleShowStatus = () => {
        setOpenStatus(true);
    };

    return (
        <div className="bg-white p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">Trang cá nhân</h1>
            <div className="grid grid-cols-2 mb-4">
                <div className="border border-dashed border-gray-400 w-[200px] h-auto p-4">
                    <Image
                        src={url ? `/uploads/${url!}` : `/uploads/${data?.image}`}
                        width={300}
                        className="object-cover mb-4"
                        height={400}
                        alt="Image"
                    />
                </div>

                <form action={action} className="flex mb-4 border-gray-400 p-4 max-w-full">
                    <FormControl label="Ảnh đại diện">
                        <div className="flex flex-col gap-y-3">
                            <InputForm type="file" name="image" id="image" />
                            <Button variant={pending ? 'pending' : 'default'} type="submit" onClick={handleClick}>
                                Thay đổi
                            </Button>
                        </div>
                    </FormControl>

                    {message && (
                        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} message={message} />
                    )}
                </form>
            </div>
            <form action={formAction}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <input
                        name="image"
                        id="image"
                        hidden
                        value={url ? url : data?.image!}
                        defaultValue={data?.image ? `${data?.image}` : ''}
                    />
                    <input type="text" value={data?.id!} id="profile_id" name="profile_id" hidden />
                    <FormControl errorField={formState?.errors?.first_name!} label="Họ của bạn">
                        <InputForm
                            defaultValue={data?.first_name || ''}
                            name="first_name"
                            id="first_name"
                            placeholder="Họ của bác sĩ"
                        />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.last_name} label="Tên của bạn">
                        <InputForm
                            defaultValue={data?.last_name || ''}
                            name="last_name"
                            id="last_name"
                            placeholder="Tên của bác sĩ"
                        />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.email} label="Địa chỉ Email">
                        <InputForm
                            defaultValue={data?.email || ''}
                            name="email"
                            id="email"
                            placeholder="Địa chỉ email của bạn"
                        />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.new_password} label="Mật khẩu">
                        <InputForm
                            defaultValue={''}
                            name="new_password"
                            id="new_password"
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </FormControl>
                    <FormControl
                        errorField={formState?.errors?.date_of_birth}
                        label="Ngày tháng năm sinh (Tháng/Ngày/Năm)"
                    >
                        <InputForm
                            defaultValue={data?.date_of_birth!?.toISOString().substring(0, 10)}
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                        />
                    </FormControl>
                    <FormControl errorField={formState?.errors?.gender} label="Giới tính">
                        <select
                            defaultValue={data?.gender!}
                            name="gender"
                            id="gender"
                            className="border border-gray-400 w-full outline-none h-[56px] py-3 px-4 rounded"
                        >
                            <option value={'male'}>Nam</option>
                            <option value={'female'}>Nữ</option>
                            <option value={'orther'}>Giới tính thứ 3</option>
                        </select>
                    </FormControl>

                    <FormControl errorField={formState?.errors?.phone} label="Số điện thoại">
                        <InputForm defaultValue={data?.phone!} type="text" name="phone" id="phone" />
                    </FormControl>

                    <FormControl errorField={formState?.errors?.address} label="Địa chỉ">
                        <InputForm defaultValue={data?.address!} type="text" name="address" id="address" />
                    </FormControl>

                    {success_message && (
                        <Snackbar
                            open={openStatus}
                            onClose={handleClose}
                            autoHideDuration={6000}
                            message={success_message}
                        />
                    )}

                    <div className="col-span-2">
                        <Button
                            onClick={handleShowStatus}
                            aria-disabled={formPending}
                            variant={formPending ? 'pending' : 'default'}
                            type="submit"
                        >
                            {formPending ? 'Đang gửi...' : 'Cập nhật'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
