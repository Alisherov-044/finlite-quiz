import { clsx } from "clsx";
import { Logo } from "@/components";
import { sidebarLinks } from "./data";
import { Flex, Typography } from "antd";
import { getCurrentRole } from "@/utils";
import { useSelector, useTranslate } from "@/hooks";
import { Link, Navigate, useLocation } from "react-router-dom";

export function Sidebar() {
    const { t } = useTranslate();
    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <aside className="sticky top-0 left-0 h-full flex flex-col gap-y-10 w-fit bg-white shadow-main px-5 py-9">
            <Logo />
            <Flex className="flex-col gap-y-4">
                <Typography className="font-bold uppercase !text-blue-500">
                    {t("Bo'limlar")}
                </Typography>
                <Flex className="flex-col  gap-y-6 !text-blue-700">
                    {sidebarLinks[currentRole].map(
                        ({ id, link, title, Icon }) => (
                            <Link
                                key={id}
                                to={link}
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
        </aside>
    );
}
