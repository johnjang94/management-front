/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			ubuntu: [
  				'Ubuntu',
  				'sans-serif'
  			],
  			cabin: [
  				'Cabin',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'primary-dark-brown': 'var(--primary-dark-brown)',
  			'primary-cream': 'var(--primary-cream)',
  			'primary-poppy': 'var(--primary-poppy)',
  			'secondary-saffron': 'var(--secondary-colors-saffron)',
  			'secondary-jasper': 'var(--secondary-colors-jasper)',
  			'secondary-tan': 'var(--secondary-colors-tan)',
  			'secondary-tan-alt': 'var(--secondary-colors-tan-alternate)',
  			'secondary-tan-alt-2': 'var(--secondary-colors-tan-alternate-2)',
  			'secondary-indigo': 'var(--secondary-colors-tropical-indigo)',
  			'secondary-lavender': 'var(--secondary-colors-light-lavender)',
  			'secondary-coral': 'var(--secondary-colors-light-coral)',
  			'secondary-red': 'var(--secondary-colors-native-red)',
  			'secondary-rose': 'var(--secondary-colors-misty-rose)',
  			'secondary-jasmine': 'var(--secondary-colors-jasmine)',
  			'secondary-yellow': 'var(--secondary-colors-peach-yellow)',
  			'secondary-papaya': 'var(--secondary-colors-papaya)',
  			'greys-black': 'var(--greys-night-black)',
  			'greys-jet': 'var(--greys-jet)',
  			'greys-battleship': 'var(--greys-battleship-grey)',
  			'greys-anti-white': 'var(--greys-anti-flash-white)',
  			'greys-white': 'var(--greys-white)',
  			'greys-background': 'var(--greys-background-white)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
