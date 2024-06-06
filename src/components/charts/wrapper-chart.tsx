import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const WrapperChart = ({ children }: Props) => {
    return <div>{children}</div>;
};

export default WrapperChart;
