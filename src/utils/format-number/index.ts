export function formatNumber(number: number) {
    if (number < 10) {
        return `0${number}`;
    }

    return number;
}
