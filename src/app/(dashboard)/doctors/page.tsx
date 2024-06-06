import Doctors from '@/app/ui/doctors';
import { db } from '@/lib/db';

type SearchParamProps = {
    searchParams: {
        q: string | string[] | undefined;
    };
};

const Page = async ({ searchParams: { q } }: SearchParamProps) => {
    const doctors = await db.user.findMany({
        where: {
            role: 'doctor',
            OR: q
                ? [
                      {
                          first_name: {
                              mode: 'insensitive',
                              contains: q?.toString() || undefined,
                          },
                      },
                      {
                          last_name: {
                              mode: 'insensitive',
                              contains: q?.toString() || undefined,
                          },
                      },
                      {
                          email: {
                              mode: 'insensitive',
                              contains: q?.toString().trim() || undefined,
                          },
                      },
                  ]
                : undefined,
        },
        include: {
            department: true,
        },
    });

    return <Doctors doctors={doctors} />;
};

export default Page;
