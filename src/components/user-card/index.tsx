import { Flex, Typography } from "antd";
import { useTranslate } from "@/hooks";
import { IconButton, Icons } from "@/components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { TRole } from "@/types";

export type TUser = {
    image: string;
    full_name: string;
    group: number;
    email: string;
    role: TRole;
};

export type UserCardProps = {
    user: TUser;
};

export function UserCard({ user }: UserCardProps) {
    const { t } = useTranslate();
    const { image, full_name, group, email, role } = user;

    return (
        <Flex className="items-center justify-between p-3 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <LazyLoadImage
                    loading="lazy"
                    effect="blur"
                    src={image}
                    width={56}
                    height={56}
                    alt={full_name}
                    className="rounded-full"
                />
                <Flex className="flex-col gap-y-2">
                    <Flex>
                        <Typography>{full_name}</Typography>
                        {role === "student" && (
                            <Typography>
                                {t("group")}: {group}
                            </Typography>
                        )}
                    </Flex>
                    {role === "student" ? (
                        <Typography>
                            {t("email")}: {email}
                        </Typography>
                    ) : (
                        <Typography>{t("${n}th group", group)}</Typography>
                    )}
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-6">
                <IconButton onClick={() => {}}>
                    <Icons.edit />
                </IconButton>
                <IconButton onClick={() => {}}>
                    <Icons.delete />
                </IconButton>
            </Flex>
        </Flex>
    );
}
