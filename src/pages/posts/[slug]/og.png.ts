import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
import { formatDate } from '@/lib/post';

interface Props {
    params: { slug: string };
    props: { post: CollectionEntry<'posts'> };
}

export async function GET({ props }: Props) {
    const { post } = props;

    const avatar = fs.readFileSync(path.resolve('src/assets/avatar.png'));
    const robotoMonoMedium = fs.readFileSync(
        path.resolve('src/assets/fonts/RobotoMono-Medium.ttf')
    );
    const robotoMonoBold = fs.readFileSync(
        path.resolve('src/assets/fonts/RobotoMono-Bold.ttf')
    );

    const html = {
        type: 'div',
        props: {
            style: {
                background: '#FCFCFC',
                fontFamily: 'Roboto Mono',
                width: '100%',
                height: '100%',
                display: 'flex',
                position: 'relative',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            position: 'absolute',
                            top: '100px',
                            left: '50px',
                            width: '1100px',
                            display: 'flex',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: '32px',
                                        fontFamily: 'Roboto Mono',
                                        lineHeight: '1.5',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                        color: '#57534d',
                                    },
                                    children: formatDate(post.data.published),
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            position: 'absolute',
                            top: '150px',
                            left: '50px',
                            width: '1100px',
                            display: 'flex',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: '48px',
                                        fontFamily: 'Roboto Mono',
                                        lineHeight: '1.25',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                    },
                                    children: post.data.title,
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            position: 'absolute',
                            right: '50px',
                            bottom: '50px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        children: [
                            {
                                type: 'img',
                                props: {
                                    src: avatar.buffer,
                                    style: {
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '20%',
                                        marginRight: '16px',
                                        border: '2px solid #e7e5e4',
                                    },
                                },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        color: '#2563eb',
                                        fontSize: '30px',
                                        fontFamily: 'Roboto Mono',
                                    },
                                    children: 'fjsn.io',
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    return new ImageResponse(html, {
        width: 1200,
        height: 600,
        fonts: [
            {
                name: 'Roboto Mono Medium',
                data: Buffer.from(robotoMonoMedium.buffer),
                style: 'normal',
            },
            {
                name: 'Roboto Mono Bold',
                data: Buffer.from(robotoMonoBold.buffer),
                style: 'normal',
            },
        ],
    });
}

export async function getStaticPaths() {
    const blogPosts = await getCollection('posts');
    return blogPosts.map((post) => ({
        params: { slug: post.id },
        props: { post },
    }));
}
