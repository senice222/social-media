import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePluginFonts({
            google: {
                families: ['Poppins', 'Inter'],
            },
        }),
        nodePolyfills(),
    ],
    define: {
        "global": {},
    }
})
