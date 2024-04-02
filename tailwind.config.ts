/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{ts,tsx,html}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "rgba(var(--primary-100))",
                    300: "rgba(var(--primary-300))",
                    500: "rgba(var(--primary-500))",
                    700: "rgba(var(--primary-700))",
                    900: "rgba(var(--primary-900))",
                },
                blue: {
                    50: "rgba(var(--blue-50))",
                    100: "rgba(var(--blue-100))",
                    300: "rgba(var(--blue-300))",
                    500: "rgba(var(--blue-500))",
                    700: "rgba(var(--blue-700))",
                    900: "rgba(var(--blue-900))",
                },
                accent: {
                    300: "rgba(var(--accent-300))",
                    500: "rgba(var(--accent-500))",
                    700: "rgba(var(--accent-700))",
                    900: "rgba(var(--accent-900))",
                },
                bg: {
                    light: "rgba(var(--bg-light))",
                    gray: "rgba(var(--bg-gray))",
                },
                gray: {
                    main: "rgba(var(--gray-main))",
                },
                error: {
                    main: "rgba(var(--error-main))",
                },
            },
            boxShadow: {
                main: "var(--shadow-main)",
                login: "var(--shadow-login)",
            },
        },
    },
    plugins: [],
};
