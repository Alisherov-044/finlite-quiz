import { Link } from "react-router-dom";
import { useTranslate } from "@/hooks";
import { Icons } from "@/components/icons";
import { Collapse, Flex, Typography } from "antd";
import type { TUser } from "@/components/cards/user-card";

export type TGroup = {
    id: number;
    number: number;
    name: string;
    students: TUser[];
};

export type GroupCardProps = {
    group: TGroup;
};

export function GroupCard({ group }: GroupCardProps) {
    const { id, name, number, students } = group;
    const { t } = useTranslate();

    return (
        <Collapse expandIcon={Icons.arrow.down} expandIconPosition="end">
            <Collapse.Panel
                key={id}
                header={
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-bold !text-gray-text">
                            {t("${n}th group", number)} {name}
                        </Typography>
                        <Typography>
                            ( {t("${x} student", students.length)} )
                        </Typography>
                    </Flex>
                }
            >
                <Flex className="flex-col gap-y-3">
                    {students.map(({ id, full_name }) => (
                        <Link to="#" key={id}>
                            <Typography className="transition-all hover:!text-blue-500">
                                {full_name}
                            </Typography>
                        </Link>
                    ))}
                </Flex>
            </Collapse.Panel>
        </Collapse>
    );
}
