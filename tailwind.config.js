/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './frontend/pages/**/*',
        './frontend/Componentes/**/*'
    ],
    theme: {
        colors: {
            'body': 'rgb(var(--bg-body) / <alpha-value>)',
            'component': 'rgb(var(--bg-component) / <alpha-value>)',
            'primary': 'rgb(var(--primary-color) / <alpha-value>)',
            'color-text': 'rgb(var(--text-color) / <alpha-value>)',
            'color-text-secundary': 'rgb(var(--text-secundary-color) / <alpha-value>)',
        }
    },
    plugins: [],
}
