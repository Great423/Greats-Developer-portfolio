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
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        waveHand: {
          '0%' :{ transform: 'rotate( 0.0deg)' }, 
          '15%' :{ transform: 'rotate(14.0deg)' }, 
          '30%' :{ transform: 'rotate(-8.0deg)' }, 
          '40%' :{ transform: 'rotate(14.0deg)' }, 
          '50%' :{ transform: 'rotate(-4.0deg)' }, 
          '60%' :{ transform: 'rotate(10.0deg)' }, 
          '70%' :{ transform: 'rotate( 0.0deg)' }, 
          '100%' :{ transform: 'rotate( 0.0deg)' },       
        },
      },
      animation: {
        slideIn: 'slideIn 0.2s, slideOut 0.2s 2.8s',
        waveHand: 'waveHand 2.5s infinite',
      },
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