import type { TRole } from "@/types";
import type { TTtranslation } from "@/i18n";

export function formatGreeting(
    role: TRole,
    translate: (key: TTtranslation) => string,
    name?: string
): string | null {
    if (role === "admin") return translate("admin");
    if (role === "student" && name) return `${translate("hallo")}, ${name}`;
    if (role === "teacher")
        return `${translate("hallo")}, ${translate("teacher")}`;

    return null;
}
