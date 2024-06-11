import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/context/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'background-page': 'linear-gradient(135deg, rgba(0, 201, 207, .9) 0, rgba(128, 57, 202, .9) 100%)',
                'background-menu': 'linear-gradient(to bottom, #fd7e14 0%, #764ba2 100%)',
            },
            backgroundColor: {
                primary: '#00c9cf',
                'primary-1': '#292929',
                'primary-2': '#f0da69',
                'primary-3': '#e7c2d4',
                'primary-4': '#ce93fa',
                secondary: '#08c18d',
                'hover-primary': '#f3f6f8',
                'sidebar-active': '#f0f3fb',
                hot: '#ff5959',
                'primary-001': '#5965f90d',
            },
            textColor: {
                primary: '#292929',
                secondary: '#08c18d',
                hot: '#dc3545',
                disabled: '#8587a7',
                'sub-text': '#ffffffb3',
                'color-icon': '#b4bdce',
            },
            boxShadowColor: {
                primary: '#bebdcc',
            },
            width: {
                'layout-form': '750px',
                sidebar: '240px',
                search: '500px',
                menu: '245px',
                'menu-box': '300px',
            },
            height: {
                header: '70px',
                search: '41px',
            },
            borderColor: {
                'form-solid': '#e7e7ef',
            },
            fontSize: {
                smally: '13.6px',
            },
        },
    },
    plugins: [],
};
export default config;
