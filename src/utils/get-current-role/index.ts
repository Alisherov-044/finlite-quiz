import { Role, type TRole } from "@/types";

const userRoles = {
    [Role.admin]: "admin",
    [Role.teacher]: "teacher",
    [Role.student]: "student",
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
