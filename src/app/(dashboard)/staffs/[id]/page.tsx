import EditStaff from '@/app/ui/edit-staff';
import { db } from '@/lib/db';

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

    const departments = await db.department.findMany();

    return <EditStaff data={data!} departments={departments} />;
};

export default Page;
