import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { readingTime } from './reading-time.mjs';
import remarkGfm from 'remark-gfm';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: [readingTime, remarkGfm],
        shikiConfig: {
            theme: 'material-theme-darker',
        },
    },
    experimental: {
        svg: true,
    },
});
