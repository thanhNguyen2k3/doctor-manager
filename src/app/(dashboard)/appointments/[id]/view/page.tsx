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
    const data = await db.appointment.findFirst({
        where: {
            id,
        },
        include: {
            doctor: true,
            patient: true,
        },
    });

    return (
        <div className="bg-white shadow shadow-primary mx-auto max-w-full p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">
                Mã cuộc hẹn : <span className="underline">{data?.appointment_number}</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormControl label="Bác sĩ">
                    <InputView
                        defaultValue={`${data?.doctor?.first_name} ${data?.doctor?.last_name}`}
                        name="doctor_id"
                        id="doctor_id"
                    />
                </FormControl>

                <FormControl label="Bệnh nhân">
                    <InputView
                        defaultValue={data?.patient?.name}
                        name="patient_id"
                        id="patient_id"
                        placeholder="Chọn bệnh nhân"
                    />
                </FormControl>

                <FormControl label="Thời gian">
                    <InputView
                        defaultValue={data?.appointment_time!}
                        type="time"
                        id="appointment_time"
                        name="appointment_time"
                    />
                </FormControl>

                <FormControl label="Ngày tháng">
                    <InputView
                        defaultValue={data?.appointment_date!?.toISOString().substring(0, 10)}
                        type="date"
                        id="appointment_date"
                        name="appointment_date"
                    />
                </FormControl>

                <FormControl label="Khoa">
                    <InputView
                        defaultValue={data?.appointment_department!}
                        type="text"
                        id="appointment_department"
                        name="appointment_department"
                    />
                </FormControl>

                <FormControl label="Phòng">
                    <InputView
                        defaultValue={data?.appointment_room!}
                        type="text"
                        id="appointment_room"
                        name="appointment_room"
                    />
                </FormControl>

                <div className="col-span-1 md:grid-cols-2">
                    <FormControl label="Ghi chú">
                        <textarea
                            disabled
                            defaultValue={data?.note!}
                            id="note"
                            name="note"
                            rows={10}
                            className="w-full px-4 py-2 outline-none border border-gray-500"
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default Page;
