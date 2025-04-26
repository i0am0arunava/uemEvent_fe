/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors:{
            'background': '#fafafa',
            'primary': '#0f1f2b',
            'secondary': '#0f1f2b',
            'primarydark': '#0f1f2b',
            'primarylight':'#cae1fa',
            'cus': 'oklch(86.5% 0.127 207.078)',
         },
         fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },

      },
   },
   plugins: [],
};
