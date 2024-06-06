import Patients from '@/app/ui/patients';
import { db } from '@/lib/db';

type SearchParamProps = {
    searchParams: {
        q: string | string[] | undefined;
    };
};

const Page = async ({ searchParams: { q } }: SearchParamProps) => {
    const data = await db.patient.findMany({
        where: {
            OR: q
                ? [
                      {
                          name: {
                              contains: q.toString(),
                              mode: 'insensitive',
                          },
                      },
                      {
                          address: {
                              mode: 'insensitive',
                              contains: q.toString(),
                          },
                      },
                  ]
                : undefined,
        },
    });

    return <Patients data={data} />;
};

export default Page;
