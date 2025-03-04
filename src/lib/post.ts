type MDPost = {
    frontmatter: {
        title: string;
        description: string;
        published: string;
        edited?: string;
        tags: string[];
        listed: boolean;
        readingTime: string;
    };
    url: string;
};

function getOrdinalDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export { getOrdinalDate };
export type { MDPost };
