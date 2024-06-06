import EditAppointment from '@/app/ui/edit-appointment';
import { db } from '@/lib/db';
import { Appointment } from '@prisma/client';
import React from 'react';

type Params = {
    params: {
        id: string;
    };
};

const Page = async ({ params: { id } }: Params) => {
    const doctors = await db.user.findMany({
        where: {
            role: 'doctor',
        },
    });

    const patients = await db.patient.findMany();

    const data = await db.appointment.findFirst({
        where: {
            id,
        },
        include: {
            doctor: true,
            patient: true,
        },
    });

    return <EditAppointment data={data as any} doctors={doctors} patients={patients} />;
};

export default Page;
