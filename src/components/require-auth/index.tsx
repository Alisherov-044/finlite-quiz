import { useSelector } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export type RequireAuthProps = {
    roles: number[];
};

export function RequireAuth({ roles }: RequireAuthProps) {
    const location = useLocation();
    const { roles: authRoles, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!!roles.find((role) => authRoles.includes(role))) {
        return <Outlet />;
    }

    return <Navigate to="/un-authorized" state={{ from: location }} replace />;
}
