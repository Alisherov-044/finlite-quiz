import { Flex, Typography } from "antd";
import { useSelector, useTranslate } from "@/hooks";
import { formatGreeting, getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import { Logout, Notifications, SelectLanguage } from "@/components";

export function Header() {
    const { t } = useTranslate();
    const location = useLocation();
    const { name, roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <header className="flex items-center justify-end gap-x-5 p-7 shadow-sm z-20">
            <SelectLanguage />
            <Notifications />
            <Flex className="items-center justify-between gap-x-2 p-1.5 rounded-[32px] border border-blue-900">
                <Typography className="ml-1 font-bold !text-blue-700">
                    {formatGreeting(currentRole, t, name)}
                </Typography>
                <div className="w-7 h-7 rounded-full bg-blue-900" />
            </Flex>
            <Logout />
        </header>
    );
}
