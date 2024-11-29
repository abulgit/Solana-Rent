/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'background': 'var(--background)',
        'primary': 'var(--primary)',
      },
      textColor: {
        'foreground': 'var(--foreground)',
        'primary-foreground': 'var(--primary-foreground)',
      },
      borderColor: {
        'border': 'var(--border)',
      },
    },
  },
  darkMode: 'class',
}