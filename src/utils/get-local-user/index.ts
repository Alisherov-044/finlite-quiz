import type { AuthState } from "@/redux/slices/authSlice";

export function getLocalUser(): AuthState | undefined {
    const localUser = localStorage.getItem("user");

    if (localUser !== null) {
        return JSON.parse(localUser);
    }
}
