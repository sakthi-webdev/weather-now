import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  base: "/weather-now/",
  plugins: [react(), tailwindcss({
    config: './tailwind.config.js',
  })],
});
