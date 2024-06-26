import { authenticatedData } from '@/app/actions/authenticated';
import Staffs from '@/app/ui/staffs';
import { db } from '@/lib/db';

type SearchParamProps = {
    searchParams: {
        q: string | string[] | undefined;
    };
};

const Page = async ({ searchParams: { q } }: SearchParamProps) => {
    const staffs = await db.user.findMany({
        where: {
            role: 'staff',

            OR: q
                ? [
                      {
                          first_name: {
                              mode: 'insensitive',
                              contains: q?.toString().trim() || undefined,
                          },
                      },
                      {
                          last_name: {
                              mode: 'insensitive',
                              contains: q?.toString().trim() || undefined,
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

    const data = await authenticatedData();

    return <Staffs dataUser={data} staffs={staffs} />;
};

export default Page;
