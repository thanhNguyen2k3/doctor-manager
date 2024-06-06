import NewDoctor from '@/app/ui/new-doctor';
import { db } from '@/lib/db';

const Page = async () => {
    const departments = await db.department.findMany();

    return <NewDoctor departments={departments} />;
};

export default Page;
