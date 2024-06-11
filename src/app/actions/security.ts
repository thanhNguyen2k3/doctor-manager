import { notFound, redirect } from 'next/navigation';

export const security = (role: string, pathname: string, params: string | string[]) => {
    if (typeof role != 'string') {
        throw new Error('Đã xảy ra lỗi');
    } else {
        if (role === 'admin') {
            const routes = [
                '/dashboard',
                '/',
                '/appointments',
                '/appointments/new',
                `/appointments/${params}/view`,
                `/appointments/${params}`,
                '/doctors',
                '/doctors/new',
                `/doctors/${params}/view`,
                `/doctors/${params}`,
                '/staffs',
                '/staffs/new',
                `/staffs/${params}/view`,
                `/staffs/${params}`,
                '/patients',
                '/patients/new',
                `/patients/${params}/view`,
                `/patients/${params}`,
                `/profile/${params}`,
            ];

            if (!routes.includes(pathname)) {
                return notFound();
            }
        }

        if (role === 'manager') {
            const routes = [
                '/dashboard',
                '/',
                '/appointments',
                '/appointments/new',
                `/appointments/${params}/view`,
                `/appointments/${params}`,
                '/doctors',
                '/doctors/new',
                `/doctors/${params}/view`,
                `/doctors/${params}`,
                '/staffs',
                '/staffs/new',
                `/staffs/${params}/view`,
                `/staffs/${params}`,
                '/patients',
                '/patients/new',
                `/patients/${params}/view`,
                `/patients/${params}`,
                `/profile/${params}`,
            ];

            if (!routes.includes(pathname)) {
                return notFound();
            }
        }

        if (role === 'doctor') {
            const routes = [
                '/',
                '/staffs',
                `/staffs/${params}/view`,
                '/patients',
                '/patients/new',
                `/patients/${params}/view`,
                `/patients/${params}`,
                `/profile/${params}`,
            ];
            if (!routes.includes(pathname)) {
                return notFound();
            }
        }

        if (role === 'staff') {
            const routes = ['/', '/patients', `/patients/${params}/view`, `/profile/${params}`];

            if (!routes.includes(pathname)) {
                return notFound();
            }
        }
    }
};
