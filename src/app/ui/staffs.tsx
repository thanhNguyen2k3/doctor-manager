'use client';

import CreateButton from '@/components/create-button';
import DataTable from '@/components/data-table';
import { formatDate } from '@/lib/format-date';
import { GridColDef } from '@mui/x-data-grid';
import { Department, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoEyeOutline, IoSearchOutline } from 'react-icons/io5';
import { LiaEditSolid, LiaTrashAlt } from 'react-icons/lia';

type ExtandDoctors = User & {
    department?: Department | null;
};

type Props = {
    staffs: ExtandDoctors[];
    dataUser?: User | null;
};

const Staffs = ({ staffs, dataUser }: Props) => {
    const columns: GridColDef<(typeof staffs)[number]>[] = [
        {
            field: 'image',
            headerName: 'Ảnh',
            width: 80,
            renderCell: ({ row }) => (
                <Image src={row.image ? `/uploads/${row.image}` : `/doctor.png`} width={80} height={40} alt="Avatar" />
            ),
        },
        {
            field: 'first_name',
            headerName: 'Họ và tên',
            sortable: true,
            width: 160,
            valueGetter: (value, row) => `${row.first_name || ''} ${row.last_name || ''}`,
        },
        {
            field: 'department_id',
            headerName: 'Chuyên khoa',
            width: 160,
            valueGetter: (value, row) => `${row?.department?.name || 'Chưa cập nhật'}`,
        },
        {
            field: 'date_of_birth',
            headerName: 'Ngày tháng năm sinh',
            width: 160,
            valueGetter: (value, row) => (!row.date_of_birth ? 'Chưa cập nhật' : formatDate(row?.date_of_birth!)),
        },
        {
            field: 'join_date',
            headerName: 'Ngày tham gia',
            width: 160,
            valueGetter: (value, row) => (!row.date_of_birth ? 'Chưa cập nhật' : formatDate(row?.join_date!)),
        },
        {
            field: 'email',
            headerName: 'Địa chỉ Email',
            width: 160,
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            width: 160,
            renderCell: ({ row }) => {
                return (
                    <div className="flex items-center h-full gap-x-1">
                        {(dataUser?.role === 'admin' || dataUser?.role === 'manager') && (
                            <Link href={`/staffs/${row.id}`}>
                                <LiaEditSolid color="#00c9cf" fontSize={26} />
                            </Link>
                        )}

                        {row.role !== 'admin' ? null : (
                            <Link href={`/staffs/${row.id}`}>
                                <LiaTrashAlt color="red" fontSize={26} />
                            </Link>
                        )}
                        <Link href={`/staffs/${row.id}/view`}>
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
                {(dataUser?.role === 'manager' || dataUser?.role === 'admin') && (
                    <CreateButton to="/patients/new">Thêm nhân viên</CreateButton>
                )}
                <h1 className="text-xl font-semibold">Nhận viên</h1>
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

            <DataTable data={staffs} columns={columns} />
        </div>
    );
};

export default Staffs;
