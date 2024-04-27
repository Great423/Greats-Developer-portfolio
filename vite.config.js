import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Change this to your desired base URL
  plugins: [react()],
});
