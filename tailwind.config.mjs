/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            typography: () => ({
                light: {
                    css: {
                        '--tw-prose-body': 'var(--color-stone-950)',
                        '--tw-prose-headings': 'var(--color-stone-950)',
                        '--tw-prose-lead': 'var(--color-stone-950)',
                        '--tw-prose-links': '#0268e3',
                        '--tw-prose-bold': 'var(--color-stone-950)',
                        '--tw-prose-counters': 'var(--color-stone-500)',
                        '--tw-prose-bullets': 'var(--color-stone-500)',
                        '--tw-prose-hr': 'var(--color-stone-200)',
                        '--tw-prose-quotes': 'var(--color-stone-950)',
                        '--tw-prose-quote-borders': 'var(--color-stone-200)',
                        '--tw-prose-captions': 'var(--color-stone-950)',
                        '--tw-prose-code': 'var(--color-stone-950)',
                        '--tw-prose-pre-code': 'var(--color-stone-50)',
                        '--tw-prose-pre-bg': '#111827',
                        '--tw-prose-th-borders': 'var(--color-stone-200)',
                        '--tw-prose-td-borders': 'var(--color-stone-200)',
                    },
                },
                dark: {
                    css: {
                        '--tw-prose-body': 'var(--color-stone-50)',
                        '--tw-prose-headings': 'var(--color-stone-50)',
                        '--tw-prose-lead': 'var(--color-stone-50)',
                        '--tw-prose-links': '#358ffd',
                        '--tw-prose-bold': 'var(--color-stone-50)',
                        '--tw-prose-counters': 'var(--color-stone-500)',
                        '--tw-prose-bullets': 'var(--color-stone-500)',
                        '--tw-prose-hr': 'var(--color-stone-800)',
                        '--tw-prose-quotes': 'var(--color-stone-50)',
                        '--tw-prose-quote-borders': 'var(--color-stone-800)',
                        '--tw-prose-captions': 'var(--color-stone-50)',
                        '--tw-prose-code': 'var(--color-stone-50)',
                        '--tw-prose-pre-code': 'var(--color-stone-50)',
                        '--tw-prose-pre-bg': '#111827',
                        '--tw-prose-th-borders': 'var(--color-stone-800)',
                        '--tw-prose-td-borders': 'var(--color-stone-800)',
                    },
                },
            }),
        },
    },
};
