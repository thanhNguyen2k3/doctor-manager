import EditPatient from '@/app/ui/edit-patient';
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

    return <EditPatient data={data!} />;
};

export default Page;
