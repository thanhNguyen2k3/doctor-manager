import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function NotFound() {
    const authenticated = await auth();
    const data = await db.user.findUnique({ where: { email: authenticated?.user?.email! } });

    if (authenticated && (data?.role === 'doctor' || data?.role === 'staff')) {
        return redirect(`/profile/${data.id}`);
    }

    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href={`/profile`}>Return Home</Link>
        </div>
    );
}
