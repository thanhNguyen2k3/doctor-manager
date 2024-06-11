'use client';

import BackButton from '@/components/back-button';
import Button from '@/components/button';
import FormControl from '@/components/form-control';
import { Patient, User } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useCallback } from 'react';
import Select from 'react-select';
import { createAppointment } from '../actions/mutations';
import InputForm from '@/components/input-form';

type Props = {
    patients: Patient[];
    doctors: User[];
};

const NewAppointment = ({ patients, doctors }: Props) => {
    const [state, action, pending] = useActionState(createAppointment, undefined);

    const options = doctors.map((doctor) => {
        return {
            label: `${doctor.first_name} ${doctor.last_name}`,
            value: doctor.id,
        };
    });

    const patientOptions = patients.map((patient) => {
        return {
            label: patient.name,
            value: patient.id,
        };
    });

    return (
        <div className="bg-white shadow shadow-primary mx-auto max-w-full p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">Thêm cuộc hẹn</h1>
            <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                <FormControl errorField={state?.errors?.doctor_id} label="Bác sĩ">
                    <Select name="doctor_id" id="doctor_id" options={options} placeholder="Chọn bác sĩ" />
                </FormControl>

                <FormControl errorField={state?.errors?.patient_id} label="Bệnh nhân">
                    <Select name="patient_id" id="patient_id" options={patientOptions} placeholder="Chọn bệnh nhân" />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_time} label="Thời gian">
                    <InputForm type="time" id="appointment_time" name="appointment_time" />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_date} label="Ngày tháng">
                    <InputForm type="date" id="appointment_date" name="appointment_date" />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_department} label="Khoa">
                    <InputForm type="text" id="appointment_department" name="appointment_department" />
                </FormControl>

                <FormControl label="Phòng">
                    <InputForm type="text" id="appointment_room" name="appointment_room" />
                </FormControl>

                <div className="col-span-2">
                    <FormControl errorField={state?.errors?.note} label="Ghi chú">
                        <textarea
                            id="note"
                            name="note"
                            rows={10}
                            className="w-full px-4 py-2 outline-none border border-gray-500"
                        />
                    </FormControl>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <Button type="submit" aria-disabled={pending} variant={pending ? 'pending' : 'default'}>
                        {pending ? 'Đang gửi...' : 'Tạo mới'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewAppointment;
