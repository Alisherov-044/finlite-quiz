export function parsePhoneNumber(phoneNumber: string) {
    const phone = phoneNumber
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")
        .replaceAll("_", "")
        .replaceAll(" ", "");

    return phone;
}
