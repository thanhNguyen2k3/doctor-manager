import EditProfile from '@/app/ui/edit-profile';
import { db } from '@/lib/db';
import React from 'react';

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

    return <EditProfile data={data!} />;
};

export default Page;
