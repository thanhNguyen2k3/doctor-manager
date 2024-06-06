'use client';

import CreateButton from '@/components/create-button';
import DataTable from '@/components/data-table';
import { formatDate } from '@/lib/format-date';
import { GridColDef } from '@mui/x-data-grid';
import { Appointment, Patient, User } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoEyeOutline, IoSearchOutline } from 'react-icons/io5';
import { LiaEditSolid, LiaTrashAlt } from 'react-icons/lia';

type ExtandAppointment = Appointment & {
    doctor?: User | null;
    patient?: Patient | null;
};

type Props = {
    data: ExtandAppointment[];
};

const Appointments = ({ data }: Props) => {
    const columns: GridColDef<(typeof data)[number]>[] = [
        {
            field: 'appointment_id',
            headerName: 'Mã đơn cuộc hẹn',
            sortable: true,
            width: 160,
            valueGetter: (value, row) => `${row.appointment_number || 'Chưa cập nhật'}`,
        },
        {
            field: 'patient',
            headerName: 'Tên bệnh nhân',
            width: 160,
            valueGetter: (value, row) => `${row?.patient?.name || 'Chưa cập nhật'}`,
        },
        {
            field: 'doctor',
            headerName: 'Bác sĩ',
            width: 160,
            valueGetter: (value, row) => `${row.doctor?.first_name} ${row.doctor?.last_name}` || 'Chưa cập nhật',
        },
        {
            field: 'appointment_time',
            headerName: 'Giờ hẹn',
            width: 160,
            valueGetter: (value, row) => row.appointment_time?.toString() || 'Chưa cập nhật',
        },
        {
            field: 'appointment_date',
            headerName: 'Ngày hẹn',
            width: 160,
            valueGetter: (value, row) => formatDate(row.appointment_date!) || 'Chưa cập nhật',
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            width: 160,
            renderCell: ({ row }) => {
                return (
                    <div className="flex items-center h-full gap-x-1">
                        <Link href={`/appointments/${row.id}`}>
                            <LiaEditSolid color="#00c9cf" fontSize={26} />
                        </Link>
                        {row.doctor?.role !== 'admin' ? null : (
                            <Link href={`/appointments/${row.id}`}>
                                <LiaTrashAlt color="red" fontSize={26} />
                            </Link>
                        )}
                        <Link href={`/appointments/${row.id}/view`}>
                            <IoEyeOutline className="text-secondary" fontSize={26} />
                        </Link>
                    </div>
                );
            },
        },
    ];

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    return (
        <div className="bg-white p-4">
            <div>
                <CreateButton to="/appointments/new">Thêm cuộc hẹn</CreateButton>
                <h1 className="text-xl font-semibold">Cuộc hẹn</h1>
                <div className="w-1/2 my-4 border border-gray-400 rounded-sm flex items-center max-w-full px-2">
                    <button>
                        <IoSearchOutline fontSize={20} />
                    </button>
                    <input
                        onChange={(e) => {
                            const value = e.target.value;

                            setTimeout(() => {
                                router.push(pathname + '?' + createQueryString('q', value));
                            }, 500);
                        }}
                        type="text"
                        className="outline-none px-4 py-2"
                        placeholder="Tìm kiếm..."
                    />
                </div>
            </div>

            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default Appointments;
