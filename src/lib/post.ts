type MDPost = {
    frontmatter: {
        title: string;
        description: string;
        published: string;
        tags: string[];
        listed?: boolean;
        edited?: boolean;
        readingTime: string;
    };
    url: string;
};

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export { formatDate };
export type { MDPost };
