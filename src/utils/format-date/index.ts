import { formatNumber } from "../format-number";

export function formatDate(date: Date) {
    const day = date.getDate() > 0 ? date.getDate() : "0" + date.getDate();
    const month =
        date.getMonth() + 1 < 0
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${formatNumber(Number(day))}-${formatNumber(
        Number(month)
    )}-${formatNumber(Number(year))}`;
}
