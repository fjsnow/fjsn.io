import { ImageResponse } from '@vercel/og';
import type { GetStaticPathsResult } from 'astro';
import { getOgAssets, ogTheme } from '@/lib/og';

interface Props {
    params: { id: string };
    props: { title: string; description: string };
}

export function GET({ params, props }: Props) {
    const { avatar, fonts } = getOgAssets();
    const isHome = params.id === 'index';

    const html = {
        key: 'html',
        type: 'div',
        props: {
            style: {
                background: ogTheme.background,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isHome ? 'center' : 'stretch',
                justifyContent: isHome ? 'center' : 'flex-start',
                padding: isHome ? '40px' : '50px 50px',
                gap: '24px',
            },
            children: isHome
                ? [
                      {
                          type: 'div',
                          props: {
                              style: {
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              },
                              children: [
                                  {
                                      type: 'img',
                                      props: {
                                          src: avatar,
                                          style: {
                                              width: '64px',
                                              height: '64px',
                                              borderRadius: '20%',
                                              marginRight: '20px',
                                          },
                                      },
                                  },
                                  {
                                      type: 'div',
                                      props: {
                                          style: {
                                              color: ogTheme.accent,
                                              fontSize: '40px',
                                              fontFamily: 'Roboto Mono Medium',
                                          },
                                          children: 'fjsn.io',
                                      },
                                  },
                              ],
                          },
                      },
                  ]
                : [
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
                                              color: ogTheme.primary,
                                              fontSize: '48px',
                                              fontFamily: 'Roboto Mono Medium',
                                              lineHeight: '1.25',
                                              wordWrap: 'break-word',
                                              maxWidth: '100%',
                                          },
                                          children: props.title,
                                      },
                                  },
                                  {
                                      type: 'div',
                                      props: {
                                          style: {
                                              color: ogTheme.secondary,
                                              fontSize: '32px',
                                              fontFamily: 'Roboto Mono Regular',
                                              lineHeight: '1.25',
                                              wordWrap: 'break-word',
                                              maxWidth: '100%',
                                          },
                                          children: props.description,
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
                                          src: avatar,
                                          style: {
                                              width: '48px',
                                              height: '48px',
                                              borderRadius: '20%',
                                              marginRight: '16px',
                                          },
                                      },
                                  },
                                  {
                                      type: 'div',
                                      props: {
                                          style: {
                                              color: ogTheme.accent,
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
        height: isHome ? 300 : 630,
        fonts,
    });
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    return [
        {
            params: { id: 'index' },
            props: {
                title: 'Freddy Snow',
                description: 'Freddy Snow is a 21 y/o developer from the UK.',
            },
        },
        {
            params: { id: '404' },
            props: {
                title: '404',
                description: "Are you sure you're in the right place?",
            },
        },
        {
            params: { id: 'random/grade-calculator' },
            props: {
                title: 'Grade Calculator',
                description:
                    'Grade calculator for 2nd Years in Computer Science at UoB for the 25/26 academic year.',
            },
        },
    ];
}
