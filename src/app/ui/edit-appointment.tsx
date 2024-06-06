'use client';

import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Appointment, Patient, User } from '@prisma/client';
import { useActionState } from 'react';
import Select from 'react-select';
import { editAppointment } from '../actions/mutations';
import InputForm from '@/components/input-form';
import Button from '@/components/button';

type ExtandAppointment = Appointment & {
    doctor?: User | null;
    patient?: Patient | null;
};

type Props = {
    data?: ExtandAppointment;
    doctors: User[];
    patients: Patient[];
};

const EditAppointment = ({ doctors, patients, data }: Props) => {
    const [state, action, pending] = useActionState(editAppointment, undefined);

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
        <div className="bg-white shadow shadow-primary w-[1200px] mx-auto max-w-full p-6">
            <BackButton />
            <h1 className="text-[17px] font-semibold mb-5">Sửa cuộc hẹn</h1>
            <form action={action} className="grid grid-cols-2 gap-x-3 gap-y-3">
                <input hidden name="appointment_id" id="appointment_id" defaultValue={data?.id} />
                <FormControl errorField={state?.errors?.doctor_id} label="Bác sĩ">
                    <Select
                        name="doctor_id"
                        id="doctor_id"
                        options={options}
                        defaultValue={{
                            value: data?.doctor_id,
                            label: `${data?.doctor?.first_name} ${data?.doctor?.last_name}`,
                        }}
                        placeholder="Chọn bác sĩ"
                    />
                </FormControl>

                <FormControl errorField={state?.errors?.patient_id} label="Bệnh nhân">
                    <Select
                        name="patient_id"
                        id="patient_id"
                        options={patientOptions}
                        placeholder="Chọn bệnh nhân"
                        defaultValue={{
                            value: data?.patient_id,
                            label: `${data?.patient?.name}`,
                        }}
                    />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_time} label="Thời gian">
                    <InputForm
                        defaultValue={data?.appointment_time!}
                        type="time"
                        id="appointment_time"
                        name="appointment_time"
                    />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_date} label="Ngày tháng">
                    <InputForm
                        defaultValue={data?.appointment_date!?.toISOString().substring(0, 10)}
                        type="date"
                        id="appointment_date"
                        name="appointment_date"
                    />
                </FormControl>

                <FormControl errorField={state?.errors?.appointment_department} label="Khoa">
                    <InputForm
                        defaultValue={data?.appointment_department!}
                        type="text"
                        id="appointment_department"
                        name="appointment_department"
                    />
                </FormControl>

                <FormControl label="Phòng">
                    <InputForm
                        defaultValue={data?.appointment_room!}
                        type="text"
                        id="appointment_room"
                        name="appointment_room"
                    />
                </FormControl>

                <div className="col-span-2">
                    <FormControl errorField={state?.errors?.note} label="Ghi chú">
                        <textarea
                            defaultValue={data?.note!}
                            id="note"
                            name="note"
                            rows={10}
                            className="w-full px-4 py-2 outline-none border border-gray-500"
                        />
                    </FormControl>
                </div>
                <div className="col-span-2">
                    <Button type="submit" aria-disabled={pending} variant={pending ? 'pending' : 'default'}>
                        {pending ? 'Đang gửi...' : 'Sửa'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditAppointment;
