import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Puerto del frontend
        proxy: {
            '/api': {
                target: 'http://0.0.0.0:3000', // Proxy al backend
                changeOrigin: true,
            },
        },
    },
});
