import type { TRole } from "@/types";

const userRoles = {
    [import.meta.env.VITE_ADMIN_ROLE_ID]: "admin",
    [import.meta.env.VITE_TEACHER_ROLE_ID]: "teacher",
    [import.meta.env.VITE_STUDENT_ROLE_ID]: "student",
};

export function getCurrentRole(roles: number[]): TRole | null {
    const currentRoleId =
        roles.length !== 0
            ? Number(
                  Object.keys(userRoles).find((item) =>
                      roles.includes(Number(item))
                  )
              )
            : null;

    const currentRole = currentRoleId ? userRoles[currentRoleId] : null;

    return currentRole as TRole;
}
