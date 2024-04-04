export function formatDate(date: Date) {
    const day = date.getDay() + 1 < 0 ? date.getDay() : "0" + date.getDay();
    const month =
        date.getMonth() + 1 < 0
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
