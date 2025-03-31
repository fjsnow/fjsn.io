import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const BASE_URL = 'https://fjsn.io';

const unlisted: string[] = [];
const postsDir = path.join(process.cwd(), 'public', 'posts');
for (const file of fs.readdirSync(postsDir)) {
    const filePath = path.join(postsDir, file);
    if (!['.md', '.mdx'].includes(path.extname(file))) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const [_, yamlData] = content.split('---');
    const metadata = (yaml.load(yamlData) || {}) as { listed?: boolean };

    if (metadata.listed === false) {
        const slug = file.replace(/\.(mdx?)/, '');
        unlisted.push(`${BASE_URL}/posts/${slug}/`);
    }
}

export default defineConfig({
    site: BASE_URL,
    vite: { plugins: [tailwindcss()] },
    markdown: { shikiConfig: { theme: 'houston' } },
    experimental: { svg: true },
    integrations: [
        sitemap({
            filter: (page) => !unlisted.includes(page),
        }),
    ],
});
