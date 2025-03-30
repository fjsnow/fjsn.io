import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const site = 'https://fjsn.io';

const unlisted = [];

function traverse(dir) {
    for (const file of fs.readdirSync(dir)) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            traverse(filePath);
            continue;
        }

        if (!['.md', '.mdx'].includes(path.extname(file))) continue;

        const content = fs.readFileSync(filePath, 'utf8');
        const [_, yamlData] = content.split('---');
        const metadata = yaml.load(yamlData) || {};

        if (metadata.listed === false) {
            const slug = file.replace(/\.(mdx?)/, '');
            unlisted.push(`${site}/posts/${slug}/`);
        }
    }
}

traverse(path.join(process.cwd(), 'public', 'posts'));

export default defineConfig({
    site: site,
    vite: { plugins: [tailwindcss()] },
    markdown: { shikiConfig: { theme: 'houston' } },
    experimental: { svg: true },
    integrations: [
        sitemap({
            filter: (page) => !unlisted.includes(page),
        }),
    ],
});
