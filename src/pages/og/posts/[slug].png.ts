import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
import { formatDate } from '@/lib/post';

interface Props {
    params: { slug: string };
    props: { post: CollectionEntry<'posts'> };
}

export function GET({ props }: Props) {
    const avatar = fs.readFileSync(path.resolve('src/assets/avatar.png'));
    const robotoMonoRegular = fs.readFileSync(
        path.resolve('src/assets/fonts/RobotoMono-Regular.ttf')
    );
    const robotoMonoMedium = fs.readFileSync(
        path.resolve('src/assets/fonts/RobotoMono-Medium.ttf')
    );

    const html = {
        type: 'div',
        props: {
            style: {
                background: '#FCFCFC',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '50px 50px',
                gap: '24px',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '1100px',
                            marginTop: '100px',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        color: '#57534d',
                                        fontSize: '32px',
                                        fontFamily: 'Roboto Mono Regular',
                                        lineHeight: '1.25',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                    },
                                    children: formatDate(
                                        props.post.data.published
                                    ),
                                },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        color: '#0c0a09',
                                        fontSize: '48px',
                                        fontFamily: 'Roboto Mono Medium',
                                        lineHeight: '1.25',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                    },
                                    children: props.post.data.title,
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            marginTop: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
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
                                        color: '#0268e3',
                                        fontSize: '30px',
                                        fontFamily: 'Roboto Mono Medium',
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
        height: 630,
        fonts: [
            {
                name: 'Roboto Mono Regular',
                data: Buffer.from(robotoMonoRegular.buffer),
                style: 'normal',
            },
            {
                name: 'Roboto Mono Medium',
                data: Buffer.from(robotoMonoMedium.buffer),
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
