'use client';

import CreateButton from '@/components/create-button';
import DataTable from '@/components/data-table';
import { formatDate } from '@/lib/format-date';
import { GridColDef } from '@mui/x-data-grid';
import { Patient } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoEyeOutline, IoSearchOutline } from 'react-icons/io5';
import { LiaEditSolid, LiaTrashAlt } from 'react-icons/lia';

type Props = {
    data: Patient[];
};

const Patients = ({ data }: Props) => {
    const columns: GridColDef<(typeof data)[number]>[] = [
        {
            field: 'name',
            headerName: 'Tên bệnh nhân',
            sortable: true,
            width: 300,
        },
        {
            field: 'doctor',
            headerName: 'Ngày tháng năm sinh',
            width: 300,
            valueGetter: (value, row) => formatDate(row.date_of_birth!) || 'Chưa cập nhật',
        },
        {
            field: 'phone',
            headerName: 'Ngày tham gia',
            width: 300,
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <div className="flex items-center h-full gap-x-1">
                        <Link href={`/patients/${row.id}`}>
                            <LiaEditSolid color="#00c9cf" fontSize={26} />
                        </Link>
                        <Link href={`/patients/${row.id}/view`}>
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
                <CreateButton to="/patients/new">Thêm bệnh nhân</CreateButton>
                <h1 className="text-xl font-semibold">Bệnh nhân</h1>
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

export default Patients;
