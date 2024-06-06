import Chart, { Props } from 'react-apexcharts';

var randomizeArray = function (arg: any) {
    var array = arg.slice();
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const ChartUser = () => {
    const sparklineData = [
        47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46,
    ];

    const chartUser: Props = {
        options: {
            chart: {
                id: 'sparkline1',
                group: 'sparklines',
                type: 'area',
                height: 70,
                width: '100%',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'straight',
            },
            fill: {
                opacity: 1,
            },

            labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
            yaxis: {
                min: 0,
            },
            xaxis: {
                type: 'datetime',
            },
            colors: ['#00C9CF'],
            title: {
                text: 'Cuộc hẹn',
                align: 'right',
                style: {
                    fontSize: '20px',
                    fontFamily: 'Roboto',
                },
            },
            subtitle: {
                text: '120',
                align: 'right',
                style: {
                    fontSize: '14px',
                },
            },
        },
        series: [
            {
                name: 'Sales',
                data: randomizeArray(sparklineData),
            },
        ],
    };

    return (
        <div className="w-[282px] border bg-white border-solid border-[#f2f4f9] shadow-[0_0_10px] shadow-[#b7c0ce33]">
            <Chart {...chartUser} />
        </div>
    );
};

export default ChartUser;
