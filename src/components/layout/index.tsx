import { Flex } from "antd";
import { Content } from "./styles";
import { Header, Sidebar } from "@/components";
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {
    const { pathname } = useLocation();
    const layoutLessPages = [
        "/login",
        "/un-authorized",
        "/not-found",
        "/practice/quiz/",
        "/exams/quiz/",
    ];

    if (
        layoutLessPages.includes(pathname) ||
        layoutLessPages.some((item) => pathname.includes(item))
    ) {
        return <Outlet />;
    }

    return (
        <Flex className="w-full h-screen overflow-hidden">
            <Sidebar />
            <Content className="flex-auto flex-col h-full overflow-scroll">
                <Header />
                <Outlet />
            </Content>
        </Flex>
    );
}
