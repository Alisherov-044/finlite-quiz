import { useTranslate } from "@/hooks";
import { Flex, Typography } from "antd";
import { Logout, Notifications, SelectLanguage } from "@/components";

export function Header() {
    const { t } = useTranslate();

    return (
        <header className="flex items-center justify-end gap-x-5 p-7">
            <SelectLanguage />
            <Notifications />
            <Flex className="items-center justify-between gap-x-2 p-1.5 rounded-[32px] border border-blue-900">
                <Typography className="font-bold text-blue-700">
                    {t("hallo")}&#44; Javlonbek
                </Typography>
                <div className="w-7 h-7 rounded-full bg-blue-900" />
            </Flex>
            <Logout />
        </header>
    );
}
