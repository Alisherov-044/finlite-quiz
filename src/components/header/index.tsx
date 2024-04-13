import { Avatar, Flex, Typography } from "antd";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { formatGreeting, getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import { IconButton, Icons, Logo, Logout, SelectLanguage } from "@/components";
import { open as openSidebar } from "@/redux/slices/sidebarSlice";

export function Header() {
    const { t } = useTranslate();
    const location = useLocation();
    const { name, roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const dispatch = useDispatch();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <header className="flex items-center justify-between lg:justify-end gap-x-5 p-7 shadow-sm z-20">
            <IconButton
                className="lg:hidden"
                onClick={() => dispatch(openSidebar())}
            >
                <Icons.burger />
            </IconButton>
            <SelectLanguage className="hidden lg:block" />
            <Logo className="lg:hidden" />
            <Flex className="hidden lg:flex items-center justify-between gap-x-2 p-1.5 rounded-[32px] border border-blue-900">
                <Typography className="ml-1 font-bold !text-blue-700">
                    {formatGreeting(currentRole, t, name)}
                </Typography>
                <div className="w-7 h-7 rounded-full bg-blue-900" />
            </Flex>
            <Logout className="hidden lg:flex" />
            <Avatar className="w-10 h-10 flex-shrink-0 bg-orange-900 lg:hidden">
                SA
            </Avatar>
        </header>
    );
}
