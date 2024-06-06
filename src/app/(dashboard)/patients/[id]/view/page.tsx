import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import InputView from '@/components/input-view';
import { db } from '@/lib/db';
import React from 'react';

type Params = {
    params: {
        id: string;
    };
};

const Page = async ({ params: { id } }: Params) => {
    const data = await db.patient.findFirst({
        where: {
            id,
        },
    });

    return (
        <div className="bg-white shadow p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">
                Bệnh nhân : <span>{data?.name}</span>
            </h1>
            <form className="grid grid-cols-2 gap-x-3 gap-y-3">
                <input id="patient_id" name="patient_id" defaultValue={data?.id} hidden />
                <FormControl label="Tên bệnh nhân">
                    <InputView defaultValue={data?.name} type="text" id="name" name="name" />
                </FormControl>

                <FormControl label="Ngày tháng năm sinh (tháng/ngày/năm)">
                    <InputView
                        defaultValue={data?.date_of_birth?.toISOString().substring(0, 10)}
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                    />
                </FormControl>

                <FormControl label="Số cắn cước công dân">
                    <InputView defaultValue={data?.card_id!} type="text" id="card_id" name="card_id" />
                </FormControl>

                <FormControl label="Số bảo hiểm y tế">
                    <InputView
                        defaultValue={data?.health_insurance_card!}
                        type="text"
                        id="health_insurance_card"
                        name="health_insurance_card"
                    />
                </FormControl>

                <FormControl label="Số điện thoại">
                    <InputView defaultValue={data?.phone!} type="text" id="phone" name="phone" />
                </FormControl>

                <FormControl label="Địa chỉ">
                    <InputView defaultValue={data?.address!} type="text" id="address" name="address" />
                </FormControl>

                <FormControl label="Tình trạng sức khỏe">
                    <InputView
                        defaultValue={data?.health_condition!}
                        type="text"
                        id="health_condition"
                        name="health_condition"
                    />
                </FormControl>

                <FormControl label="Bệnh">
                    <InputView defaultValue={data?.disease!} type="text" id="disease" name="disease" />
                </FormControl>
            </form>
        </div>
    );
};

export default Page;
