import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import { readingTime } from './plugins/reading-time.mjs';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: [readingTime],
        shikiConfig: {
            theme: 'houston',
        },
    },
    experimental: {
        svg: true,
    },
});
