import { useOpen, useTranslate } from "@/hooks";
import { Confirmation, IconButton, Icons } from "@/components";

export function Logout() {
    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();

    const onConfirm = () => {};

    return (
        <>
            <IconButton onClick={open}>
                <Icons.logout />
            </IconButton>

            <Confirmation
                isOpen={isOpen}
                onCancel={close}
                onConfirm={onConfirm}
                btnText={t("logout")}
                title={t("logout")}
                description={t("do you wanna logout")}
            />
        </>
    );
}
