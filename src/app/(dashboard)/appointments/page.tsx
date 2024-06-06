import Appointments from '@/app/ui/appointments';
import { db } from '@/lib/db';

type SearchParamProps = {
    searchParams: {
        q: string | string[] | undefined;
    };
};

const Page = async ({ searchParams: { q } }: SearchParamProps) => {
    const appointments = await db.appointment.findMany({
        where: {
            // OR: q
            //     ? [
            //           {
            //               doctor: {
            //                   first_name: {
            //                       contains: q.toString(),
            //                       mode: 'insensitive',
            //                   },
            //                   last_name: {
            //                       contains: q.toString(),
            //                       mode: 'insensitive',
            //                   },
            //               },
            //               patient: {
            //                   name: {
            //                       contains: q.toString(),
            //                   },
            //               },
            //           },
            //       ]
            //     : undefined,
        },
        include: {
            doctor: true,
            patient: true,
        },
    });

    return <Appointments data={appointments} />;
};

export default Page;
