function formatDate(date: Date): string {
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);

    return new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        year: 'numeric',
    })
        .format(date)
        .replace(/^/, `${day}${suffix} `);
}

function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th';
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

export { formatDate };
