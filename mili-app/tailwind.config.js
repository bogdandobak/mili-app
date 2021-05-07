module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        primary: '#1a3244',
        hoverP: '#326285'
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
