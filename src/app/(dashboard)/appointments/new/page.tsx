import NewAppointment from '@/app/ui/new-appointment';
import { db } from '@/lib/db';

const Page = async () => {
    const patients = await db.patient.findMany();
    const doctors = await db.user.findMany({
        where: {
            role: 'doctor',
        },
    });

    return <NewAppointment patients={patients} doctors={doctors} />;
};

export default Page;
