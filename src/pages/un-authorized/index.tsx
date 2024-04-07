import { Logo } from "@/components";
import { useTranslate } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Layout, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function UnAuthorizedPage() {
    const { t } = useTranslate();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Layout.Content className="flex w-full h-full items-center justify-center">
            <Logo className="absolute top-12 left-12" />
            <Flex className="items-center gap-x-[100px]">
                <LazyLoadImage
                    loading="lazy"
                    effect="blur"
                    src="/no-access.jpg"
                    width={500}
                    height={500}
                    alt="no access"
                />
                <Flex className="flex-col items-center gap-y-9">
                    <Typography className="text-2xl max-w-[340px] text-center first-letter:capitalize">
                        {t(
                            "Sizning bu sahifaga kirish huquqingiz mavjud emas!"
                        )}
                    </Typography>
                    <Button onClick={goBack}>{t("Orqaga qaytish")}</Button>
                </Flex>
            </Flex>
        </Layout.Content>
    );
}
