import * as antd from "antd";
// import { useState } from "react";
// import { useTranslate } from "@/hooks";
import { Outlet } from "react-router-dom";
// import { Confirmation, Icons } from "@/components";

export function Layout() {
    // const [isOpne, setIsOpne] = useState<boolean>(false);
    // const { t } = useTranslate("ru");
    // const [api, contextHolder] = antd.notification.useNotification();

    // const openNotification = () => {
    //     api.info({
    //         message: t("edited"),
    //         closeIcon: null,
    //         icon: <Icons.checkCircle />,
    //     });
    // };

    return (
        <antd.Layout className="w-full h-full bg-transparent">
            {/* <antd.Select
                placeholder="Bo'lim tanlash"
                dropdownAlign={{ overflow: { adjustY: 2 }, points: ["bc"] }}
                options={[
                    { value: "value", label: "1C Buxgalteriya prinsiplari" },
                    { value: "value1", label: "1C Buxgalteriya prinsiplari" },
                    { value: "value2", label: "1C Buxgalteriya prinsiplari" },
                    { value: "value3", label: "1C Buxgalteriya prinsiplari" },
                    { value: "value4", label: "1C Buxgalteriya prinsiplari" },
                    { value: "value5", label: "1C Buxgalteriya prinsiplari" },
                ]}
                suffixIcon={<Icons.arrow.select />}
            /> */}
            {/* {contextHolder}
            <antd.Button size="large" onClick={() => openNotification()}>
                BOSHLASH
            </antd.Button>
            
            <Confirmation
                isOpen={isOpne}
                title={t("logout")}
                description={t("do you wanna logout")}
                btnText={t("logout")}
                onCancel={() => setIsOpne(false)}
                onConfirm={() => {}}
            />
            <Confirmation
                primaryBtn
                isOpen={isOpne}
                title={t("exam")}
                description={`${t(
                    "there is time limit in this mode"
                )} <br /> ${t("${x} hours are allotted for the exam", "2:30")}`}
                btnText={t("start")}
                onCancel={() => setIsOpne(false)}
                onConfirm={() => {}}
            />
            <Confirmation
                isOpen={isOpne}
                title={t("remove")}
                description={t("do you wanna delete ${something}", t("exam"))}
                btnText={t("delete")}
                onCancel={() => setIsOpne(false)}
                onConfirm={() => {}}
            /> */}
            <Outlet />
        </antd.Layout>
    );
}
