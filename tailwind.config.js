/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
    theme: {
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1440px',
        '2xl': '1536px',
      },
    extend: {
      maxHeight: {
        '100': '100px' // Esto añade la clase max-h-200 para usar en el proyecto
      },
    },
    colors: {
      orange: '#ff4700',
      black: '#020100',
      white: '#ffffff',
      gray: '#6b7280',
      gray100: 'f7fafc',   
      gray300: '#e2e8f0',  
      gray400: '#cbd5e0',   
      gray600: '#718096',   
      gray700: '#4a5568',   
      gray800: '#2d3748',
      gray900: '#1a1a1a',

      // Otros colores
      blue300: '#93c5fd',
      blue500: '#4299e1',   
      blue700: '#2b6cb0',   
      green500: '#48bb78',  
      green700: '#15803d',  
      red500: '#f56565',    
      red700: '#b91c1c',    
      yellow500: '#ecc94b', 
      orange400: '#f6ad55',    
      orange100: '#f9b79d',
      purple500: '#8b5cf6',
      indigo: '#6366f1',
      pink: '#f43f5e',
      amber500: '#f59e0b',
      amber700: '#b45309',
      amber950: '#451a03',
      lime900: '#365314',
      sky400: '#38bdf8',
      indigo300: 'a5b4fc',
      cyan300: '#67e8f9',
      slate300: '#cbd5e1',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      const tham = {
        '.tham': {
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
          '&.tham-active .tham-inner': {
            transform: 'rotate(45deg)',
          },
          '&.tham-active .tham-inner::before': {
            top: 0,
            transform: 'rotate(90deg)',
          },
          '&.tham-active .tham-inner::after': {
            top: 0,
            transform: 'rotate(90deg)',
          },
          '&-box': {
            position: 'relative',
            display: 'inline-block',
            width: '28px',
            height: '28px',
          },
          '&-inner': {
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            width: '24px',
            height: '2px',
            backgroundColor: 'currentColor',
            transform: 'translateY(-50%)',
            transition: 'transform 0.3s ease',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: '-8px',
              left: 0,
              right: 0,
              width: '24px',
              height: '2px',
              backgroundColor: 'currentColor',
              transition: 'top 0.3s ease, transform 0.3s ease',
            },
            '&::after': {
              top: '8px',
            },
          },
        },
      };
      addComponents(tham);
    },
  ],
}
