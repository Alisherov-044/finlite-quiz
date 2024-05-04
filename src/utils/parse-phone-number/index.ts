export function parsePhoneNumber(phoneNumber?: string) {
    if (!phoneNumber) return;
    if (phoneNumber.length < 19) return;
    const phone = phoneNumber
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")
        .replaceAll("_", "")
        .replaceAll(" ", "");

    return phone;
}
