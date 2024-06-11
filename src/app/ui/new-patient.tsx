'use client';

import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import InputForm from '@/components/input-form';
import { useActionState } from 'react';
import { createPatient } from '../actions/mutations';
import Button from '@/components/button';

const NewPatient = () => {
    const [state, action, pending] = useActionState(createPatient, undefined);

    return (
        <div className="bg-white shadow  p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">Thêm bệnh nhân</h1>
            <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <FormControl errorField={state?.errors?.name} label="Tên bệnh nhân">
                    <InputForm type="text" id="name" name="name" />
                </FormControl>

                <FormControl errorField={state?.errors?.date_of_birth} label="Ngày tháng năm sinh (tháng/ngày/năm)">
                    <InputForm type="date" id="date_of_birth" name="date_of_birth" />
                </FormControl>

                <FormControl errorField={state?.errors?.card_id} label="Số cắn cước công dân">
                    <InputForm type="text" id="card_id" name="card_id" />
                </FormControl>

                <FormControl label="Số bảo hiểm y tế" errorField={state?.errors?.health_insurance_card}>
                    <InputForm type="text" id="health_insurance_card" name="health_insurance_card" />
                </FormControl>

                <FormControl label="Số điện thoại" errorField={state?.errors?.phone}>
                    <InputForm type="text" id="phone" name="phone" />
                </FormControl>

                <FormControl label="Địa chỉ" errorField={state?.errors?.address}>
                    <InputForm type="text" id="address" name="address" />
                </FormControl>

                <FormControl label="Tình trạng sức khỏe" errorField={state?.errors?.health_condition}>
                    <InputForm type="text" id="health_condition" name="health_condition" />
                </FormControl>

                <FormControl label="Bệnh" errorField={state?.errors?.disease}>
                    <InputForm type="text" id="disease" name="disease" />
                </FormControl>

                <div className="col-span-1 md:col-span-2">
                    <Button type="submit" aria-disabled={pending} variant={pending ? 'pending' : 'default'}>
                        {pending ? 'Đang gửi...' : 'Tạo mới'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewPatient;
