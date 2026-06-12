import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [plugin()],

    resolve: {
        dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-toastify']
    },

    server: {
        watch: {
            ignored: ['**/.vs/**', '**/.vscode/**']
        },
        port: 53377,
    }
});