import { Icons } from "@/components";
import { useActive, useTranslate } from "@/hooks";
import { Button, Flex, Modal, Tooltip, Typography } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

export type TestLinkProps = {
    link: string;
    isOpen: boolean;
    onPreview: () => void;
    onClose: () => void;
};

export function TestLink({ link, isOpen, onPreview, onClose }: TestLinkProps) {
    const { t } = useTranslate();
    const { active, setActive } = useActive(false);

    return (
        <Modal closable centered open={isOpen} onCancel={onClose}>
            <Flex className="flex-col gap-y-5 bg-white rounded-3xl p-8">
                <Flex className="items-center justify-between">
                    <Typography className="!text-xl font-semibold !text-blue-900">
                        {t("Test yaratildi")}
                    </Typography>
                    <button onClick={onClose}>
                        <Icons.closeCircle width={35} height={35} />
                    </button>
                </Flex>
                <Flex className="w-full min-w-96 relative items-center p-3 rounded-xl border">
                    <Typography>{link}</Typography>
                    <CopyToClipboard
                        text={link}
                        onCopy={() => {
                            setActive(true);
                            setTimeout(() => {
                                setActive(false);
                            }, 1000);
                        }}
                    >
                        <Tooltip
                            title={t("Nusxalandi")}
                            open={!!active}
                            trigger={["click"]}
                        >
                            <Button className="absolute top-0 right-0 !h-full !p-2.5 !rounded-xl !border-none">
                                <Icons.copy />
                            </Button>
                        </Tooltip>
                    </CopyToClipboard>
                </Flex>
                <Button className="!w-full" onClick={onPreview}>
                    {t("Testni ko'rish")}
                </Button>
            </Flex>
        </Modal>
    );
}
