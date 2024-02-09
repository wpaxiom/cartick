/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            gridTemplateAreas: {
                'layout': [
                    'header header header header header header header header header header header header header',
                    'content content content content content content content content content content content content content'
                ],
            },
        },
    },
    plugins: [
        require('@savvywombat/tailwindcss-grid-areas')
    ]
}