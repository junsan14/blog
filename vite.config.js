import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx',
                    'resources/css/style.scss',
                    ],
            refresh: true,
        }),

        ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } ),
        react(),

    ],
    server: {
        /*
        host:true,
        hmr: {
            clientPort: 5173,
           // host: '100.96.1.3',
            host:'192.168.40.25',
        }
        */

    },

    
});
