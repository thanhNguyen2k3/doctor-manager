'use client';

import Image from 'next/image';
import AvatarMui from '@mui/material/Avatar';

type Props = {
    width: number;
    height: number;
    alt: string;
    src: string;
};

const Avatar = ({ width, height, ...props }: Props) => {
    return <AvatarMui className="bg-background-page" sx={{ width: width, height: height }} {...props} />;
};

export default Avatar;
