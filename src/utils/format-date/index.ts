export function formatDate(date: Date) {
    const day = date.getDate() > 0 ? date.getDate() : "0" + date.getDate();
    const month =
        date.getMonth() + 1 < 0
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
