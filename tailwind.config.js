module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ["Roboto", "Helvetica", "Arial", 'sans-serif']
      },
      colors: {
        primary: '#2EC862',
        dark: '#252D39',
        soft: '#F6F7F8'
      }
    },
  },
  plugins: [],
}
