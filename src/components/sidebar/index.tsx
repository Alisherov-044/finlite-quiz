import { clsx } from "clsx";
import { Logo, Logout, SelectLanguage } from "@/components";
import { sidebarLinks } from "./data";
import { Drawer, Flex, Typography } from "antd";
import { getCurrentRole } from "@/utils";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { Link, Navigate, useLocation } from "react-router-dom";
import { close as closeSidebar } from "@/redux/slices/sidebarSlice";

export function Sidebar() {
    const { t } = useTranslate();
    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const { isOpen } = useSelector((state) => state.sidebar);
    const currentRole = getCurrentRole(roles);
    const dispatch = useDispatch();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const content = (
        <>
            <Logo />
            <Flex className="lg:hidden items-center justify-between my-5">
                <SelectLanguage />
                <Logout />
            </Flex>
            <Flex className="flex-col gap-y-4 mt-4 lg:mt-0">
                <Typography className="font-bold uppercase !text-blue-500">
                    {t("Bo'limlar")}
                </Typography>
                <Flex className="flex-col  gap-y-6 !text-blue-700">
                    {sidebarLinks[currentRole].map(
                        ({ id, link, title, Icon }) => (
                            <Link
                                key={id}
                                to={link}
                                onClick={() => dispatch(closeSidebar())}
                                className={clsx(
                                    "min-w-52 flex items-center gap-x-3 p-1.5 rounded-md",
                                    (location.pathname === link ||
                                        (link === "/exams" &&
                                            location.pathname ===
                                                "/exams/results")) &&
                                        "bg-blue-100"
                                )}
                            >
                                <Icon />
                                <Typography className="font-bold first-letter:capitalize">
                                    {t(title)}
                                </Typography>
                            </Link>
                        )
                    )}
                </Flex>
            </Flex>
        </>
    );

    return (
        <>
            <aside className="hidden sticky top-0 left-0 h-full lg:flex flex-col gap-y-10 w-fit bg-white shadow-main px-5 py-9">
                {content}
            </aside>
            <Drawer
                open={isOpen}
                placement="left"
                className="lg:hidden"
                onClose={() => dispatch(closeSidebar())}
            >
                {content}
            </Drawer>
        </>
    );
}
