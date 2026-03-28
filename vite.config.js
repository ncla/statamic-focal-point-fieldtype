import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import laravel from 'laravel-vite-plugin';
import statamic from '@statamic/cms/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/focalpoint.js',
                'resources/css/focalpoint.css',
            ],
            publicDirectory: 'resources/dist',
        }),
        statamic(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@ui': new URL('./node_modules/@statamic/cms/src/ui.js', import.meta.url).pathname,
            '@statamic-src': fileURLToPath(new URL('./vendor/statamic/cms/resources/js', import.meta.url)),
        },
    },
});
