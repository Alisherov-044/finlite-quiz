import { Flex, Tooltip, Typography } from "antd";
import { useTranslate } from "@/hooks";
import { IconButton, Icons } from "@/components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type TUser = {
    id: number;
    image: string;
    full_name: string;
    group: number;
    email: string;
    role: string;
    password: string;
};

export type UserCardProps = {
    user: TUser;
    onEdit: () => void;
    onDelete: () => void;
};

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
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
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-semibold text-lg">
                            {full_name}
                        </Typography>
                        {role === "student" && (
                            <Typography className="font-semibold">
                                {t("group")}: {group}
                            </Typography>
                        )}
                    </Flex>
                    {role === "student" ? (
                        <Typography className="font-semibold">
                            {t("email")}: {email}
                        </Typography>
                    ) : (
                        <Typography className="font-semibold">
                            {t("${n}th group", group)}
                        </Typography>
                    )}
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-4">
                <Tooltip title={t("edit")}>
                    <IconButton onClick={onEdit}>
                        <Icons.edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t("delete")}>
                    <IconButton onClick={onDelete}>
                        <Icons.delete />
                    </IconButton>
                </Tooltip>
            </Flex>
        </Flex>
    );
}
