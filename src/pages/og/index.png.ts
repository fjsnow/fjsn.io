import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
import { formatDate } from '@/lib/post';

export function GET() {
    const avatar = fs.readFileSync(path.resolve('src/assets/avatar.png'));
    const robotoMono = fs.readFileSync(
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
                position: 'relative',
            },
            children: [
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
                                        color: '#0c0a09',
                                        fontSize: '48px',
                                        fontFamily: 'Roboto Mono',
                                        lineHeight: '1.25',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                    },
                                    children: "hi, i'm freddy",
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
                            top: '210px',
                            left: '50px',
                            width: '1100px',
                            display: 'flex',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        color: '#57534d',
                                        fontSize: '32px',
                                        fontFamily: 'Roboto Mono',
                                        lineHeight: '1.25',
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',
                                    },
                                    children:
                                        '20 y/o developer and student from the uk',
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
                name: 'Roboto Mono',
                data: Buffer.from(robotoMono.buffer),
                style: 'normal',
            },
        ],
    });
}
