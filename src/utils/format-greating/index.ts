import type { TRole } from "@/types";

export function formatGreeting(
    role: TRole,
    translate: (key: string) => string,
    name?: string
): string | null {
    if (role === "admin") return translate("admin");
    if (role === "student" && name) return `${translate("Salom")}, ${name}`;
    if (role === "teacher")
        return `${translate("Salom")}, ${translate("O'qituvchi")}`;

    return null;
}
