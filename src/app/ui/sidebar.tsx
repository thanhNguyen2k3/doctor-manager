import SidebarUi from '@/components/sidebar-ui';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

const SidebarDashboard = async () => {
    const session = await auth();
    const data = await db.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });

    return <SidebarUi userData={data!} />;
};

export default SidebarDashboard;
