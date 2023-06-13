import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import '@testing-library/react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
});
