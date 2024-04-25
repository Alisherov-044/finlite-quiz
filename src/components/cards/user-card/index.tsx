import { useMemo } from "react";
import { Avatar, Flex, Tooltip, Typography } from "antd";
import { useTranslate } from "@/hooks";
import { IconButton, Icons } from "@/components";
import { formatPhoneNumber, generateAvatarColor } from "@/utils";

export type TUser = {
    id: number;
    first_name: string;
    last_name: string;
    group_id: number;
    phone_number: string;
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
    const { first_name, last_name, group_id, phone_number, role } = user;
    const full_name = useMemo(
        () => `${first_name} ${last_name}`,
        [first_name, last_name]
    );

    return (
        <Flex className="items-center justify-between p-3 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <Avatar className={generateAvatarColor(first_name)}>
                    {first_name[0]}
                    {last_name[0]}
                </Avatar>
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-semibold text-lg">
                            {full_name}
                        </Typography>
                        {role === "student" && (
                            <Typography className="font-semibold">
                                {t("guruh")}: {group_id}
                            </Typography>
                        )}
                    </Flex>
                    <Typography className="font-semibold">
                        {t("Telefon raqam")}: {formatPhoneNumber(phone_number)}
                    </Typography>
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-4">
                <Tooltip title={t("Tahrirlash")}>
                    <IconButton onClick={onEdit}>
                        <Icons.edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t("O'chirish")}>
                    <IconButton onClick={onDelete}>
                        <Icons.delete />
                    </IconButton>
                </Tooltip>
            </Flex>
        </Flex>
    );
}
