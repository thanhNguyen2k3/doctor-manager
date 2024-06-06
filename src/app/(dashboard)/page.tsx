'use client';

import { logout } from '@/app/actions/auth';
import ChartUser from '@/components/charts/chart-user';
import React, { useActionState } from 'react';

type Props = {};

const Page = (props: Props) => {
    const [state, action] = useActionState(logout, undefined);

    return <div>{/* <ChartUser /> */}</div>;
};

export default Page;
