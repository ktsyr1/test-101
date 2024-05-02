/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "prussian-25": "#EBF5FF",
                "prussian-100": "#C3DDFD",
                "prussian-300": "#76A9FA",
                "prussian-500": "#1C64F2",
                "prussian-600": "#0043CE",
                "prussian-800": "#032DA6",

                "horizon-25": "#BAE6FF",
                "horizon-100": "#82CFFF",
                "horizon-300": "#4589FF",
                "horizon-500": "#0072C3",
                "horizon-600": "#00539A",
                "horizon-700": "#003A6D",

                "futuristic-25": "#D9FBFB",
                "futuristic-100": "#9EF0F0",
                "futuristic-300": "#08BDBA",
                "futuristic-500": "#009D9A",
                "futuristic-600": "#007D79",
                "futuristic-700": "#005D5D",

                "safety-25": "#FEEBDE",
                "safety-100": "#FDCCA9",
                "safety-300": "#FCB581",
                "safety-500": "#FF7E36",
                "safety-700": "#FF5C00",

                "red-25": "#FEEBDE",
                "red-100": "#F5B4A2",
                "red-300": "#FF8766",
                "red-500": "#FF6539",
                "red-700": "#F14600",

                "grays-25": "#F1F1F5",
                "grays-100": "#D1D5DB",
                "grays-300": "#6B7280",
                "grays-500": "#374151",
                "grays-700": "#111928",

                "gray-50": "var(--gray-50)",
                "inactive-elements25": "var(--inactive-elements25)",
                "inspectex-orange-red100": "var(--inspectex-orange-red100)",
                "inspectex-orange-red1000": "var(--inspectex-orange-red1000)",
                "inspectex-orange-red25": "var(--inspectex-orange-red25)",
                "inspectex-orange-red300": "var(--inspectex-orange-red300)",
                "inspectex-orange-red400": "var(--inspectex-orange-red400)",
                "inspectex-orange-red500": "var(--inspectex-orange-red500)",
                "inspectex-orange-red700": "var(--inspectex-orange-red700)",
                "inspectex-orange100": "var(--inspectex-orange100)",
                "inspectex-orange1000": "var(--inspectex-orange1000)",
                "inspectex-orange25": "var(--inspectex-orange25)",
                "inspectex-orange300": "var(--inspectex-orange300)",
                "inspectex-orange500": "var(--inspectex-orange500)",
                "inspectex-orange700": "var(--inspectex-orange700)",
                "inspectex-sky-blue100": "var(--inspectex-sky-blue100)",
                "inspectex-sky-blue25": "var(--inspectex-sky-blue25)",
                "inspectex-sky-blue300": "var(--inspectex-sky-blue300)",
                "inspectex-sky-blue500": "var(--inspectex-sky-blue500)",
                "inspectex-sky-blue800": "var(--inspectex-sky-blue800)",
                "inspectex-sky-blue900": "var(--inspectex-sky-blue900)",
                "inspectex-sky-bluecyan100": "var(--inspectex-sky-bluecyan100)",
                "inspectex-sky-bluecyan25": "var(--inspectex-sky-bluecyan25)",
                "inspectex-sky-bluecyan300": "var(--inspectex-sky-bluecyan300)",
                "inspectex-sky-bluecyan500": "var(--inspectex-sky-bluecyan500)",
                "inspectex-sky-bluecyan600": "var(--inspectex-sky-bluecyan600)",
                "inspectex-sky-bluecyan700": "var(--inspectex-sky-bluecyan700)",
                "inspectex-teal100": "var(--inspectex-teal100)",
                "inspectex-teal1000": "var(--inspectex-teal1000)",
                "inspectex-teal25": "var(--inspectex-teal25)",
                "inspectex-teal300": "var(--inspectex-teal300)",
                "inspectex-teal500": "var(--inspectex-teal500)",
                "inspectex-teal600": "var(--inspectex-teal600)",
                "inspectex-teal700": "var(--inspectex-teal700)",
                "neutral-100": "var(--neutral-100)",
                "neutral-25": "var(--neutral-25)",
                "neutral-300": "var(--neutral-300)",
                "neutral-500": "var(--neutral-500)",
                "neutral-700": "var(--neutral-700)",
                "neutral-950": "var(--neutral-950)",
            },

            screens: {
                'sm': '350px',
                // => @media (min-width: 640px) { ... }

                'tap': '700px',
                // => @media (min-width: 768px) { ... }

                'lap': '1400px'
                // => @media (min-width: 1024px) { ... }

            //     'xl': '1280px',
            //     // => @media (min-width: 1280px) { ... }

            //     '2xl': '1536px',
            //     // => @media (min-width: 1536px) { ... }
            },
            fontFamily: {
                "text-s-medium": "var(--text-s-medium-font-family)",
            },
            boxShadow: {
                "2xl": "var(--2xl)",
                "focued-outline": "var(--focued-outline)",
                hover: "var(--hover)",
                LG: "var(--LG)",
                MD: "var(--MD)",
                "nav-bar-blur-background-blur-nav-bar": "var(--nav-bar-blur-background-blur-nav-bar)",
                "nav-bar-blur-bg-blur": "var(--nav-bar-blur-bg-blur)",
                SM: "var(--SM)",
                soft: "var(--soft)",
                XL: "var(--XL)",
                XSM: "var(--XSM)",
            },
        },
    },
    plugins: [],
};

