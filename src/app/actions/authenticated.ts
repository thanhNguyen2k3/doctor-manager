import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const authenticatedData = async () => {
    const session = await auth();

    const data = await db.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });

    return data;
};
