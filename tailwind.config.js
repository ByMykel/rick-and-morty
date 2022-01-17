module.exports = {
    purge: {
        mode: "layers",
        content: ["./public/**/*.html", "./src/**/*.vue"],
    },
    darkMode: false,
    theme: {
        extend: {
            zIndex: {
                "-10": "-10",
            },
        },
    },
    variants: {
        extend: {
            borderWidth: ["hover", "focus"],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
