import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import SidebarDashboard from '../ui/sidebar';
import HeaderDashboard from '../ui/header';
import { db } from '@/lib/db';

type Props = {
    children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
    const session = await auth();
    const data = await db.user.findFirst({
        where: {
            email: session?.user?.email!,
        },
    });

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="flex dark:bg-black">
            <SidebarDashboard />
            <div className="flex-1 w-full">
                <HeaderDashboard data={data!} />
                <div className="p-3 dark:bg-black flex-1">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
