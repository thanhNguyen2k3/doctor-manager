import EditDoctor from '@/app/ui/edit-doctor';
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

    return <EditDoctor departments={departments} data={data!} />;
};

export default Page;
