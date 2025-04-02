import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/posts' }),
    schema: z.object({
        title: z.string().min(1).max(64),
        description: z.string().min(1).max(256),
        published: z.coerce.date(),
        listed: z.boolean().default(true),
    }),
});

export const collections = { posts };
