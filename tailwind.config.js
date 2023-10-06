/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './frontend/pages/**/*',
        './frontend/js/**/*'
    ],
    theme: {
        colors: {
            'body': 'rgb(var(--bg-body) / <alpha-value>)',
            'component': 'rgb(var(--bg-component) / <alpha-value>)',
            'primary': 'rgb(var(--primary-color) / <alpha-value>)',
            'color-text': 'rgb(var(--text-color) / <alpha-value>)',
            'color-text-secundary': 'rgb(var(--text-secundary-color) / <alpha-value>)',
            'color-red': 'rgb(var(--red) / <alpha-value>)',
            'color-green': 'rgb(var(--green) / <alpha-value>)',
            'color-purple': 'rgb(var(--purple) / <alpha-value>)',
            'color-orange': 'rgb(var(--orange) / <alpha-value>)'
        }
    },
    plugins: [],
}
