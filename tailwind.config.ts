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
                    primary: "rgba(var(--blue-primary))",
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
                    text: "rgba(var(--gray-text))",
                },
                error: {
                    main: "rgba(var(--error-main))",
                },
                success: {
                    main: "rgba(var(--success-main))",
                },
            },
            boxShadow: {
                main: "var(--shadow-main)",
                "main-lg": "var(--shadow-main-lg)",
                login: "var(--shadow-login)",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
