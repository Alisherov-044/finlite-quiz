export function formatPhoneNumber(phoneNumber: string) {
    return `${phoneNumber[0]}(${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
        4,
        6
    )} ${phoneNumber.slice(6, 9)}-${phoneNumber.slice(
        9,
        11
    )}-${phoneNumber.slice(11, 13)}`;
}
