import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginFonts } from 'vite-plugin-fonts';

export default defineConfig({
    plugins: [
        react(),
        VitePluginFonts({
            google: {
                families: ['Poppins', 'Inter'],
            },
        }),
    ],
    define: {
        global: {},
    },
});
