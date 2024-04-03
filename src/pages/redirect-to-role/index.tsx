import { useSelector } from "@/hooks";
import { getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";

const redirection: Record<string, string> = {
    admin: "/teachers",
    teacher: "/exams",
    student: "/materials",
};

export default function RedirectToRolePage() {
    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Navigate
            to={redirection[currentRole]}
            state={{ from: location }}
            replace
        />
    );
}
