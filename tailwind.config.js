/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: '#B809C3',
      },
      borderRadius: {
        'avatar': '42% 53% 66% 36% / 36% 52% 43% 50%' ,
      },
      boxShadow: {
        'frame': '0px 4.42184px 107.23px rgba(255, 86, 246, 0.51);' ,
      },
      backgroundImage: {
        site: "url('/assets/site-bg.jpg')",
        about: "url('/assets/working.jpg')",
        services: "url('/assets/services.png')",
      },
    },
  },
  plugins: [],
}