
import lineClamp from '@tailwindcss/line-clamp';
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        open: ['Open+Sans'],
        inter_downloaded: ['inter_native']
      },
      screens: {
        'xs': '480px',      // Custom extra small screen size (e.g., mobile)
        'sm-max': { 'max': '639px' },  // Custom max screen size for small devices
        'md-range': { 'min': '640px', 'max': '1023px' },  // Custom range for medium devices
        'lg-range': { 'min': '1024px', 'max': '1279px' }, // Custom range for large devices
        'xl': '1440px',     // Custom extra-large screen size (e.g., desktops)
      },
    },
  },
  plugins: [
    lineClamp
  ],
}

