import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
      boxShadow: {
        panel: '0 26px 60px -34px rgba(22, 53, 90, 0.28)',
        soft: '0 10px 26px -18px rgba(18, 42, 71, 0.2)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'var(--font-cn)', 'sans-serif'],
      },
      backgroundImage: {
        'school-glow':
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 40%), radial-gradient(circle at top right, rgba(245, 158, 11, 0.16), transparent 28%), linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(241, 245, 249, 0.96))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
