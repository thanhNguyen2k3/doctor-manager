import NewStaff from '@/app/ui/new-staff';
import { db } from '@/lib/db';

const Page = async () => {
    const departments = await db.department.findMany();

    return <NewStaff departments={departments} />;
};

export default Page;
