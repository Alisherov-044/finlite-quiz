import { useTranslate } from "@/hooks";
import { Icons } from "@/components/icons";
import { Collapse, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import type { TUser } from "@/components/cards/user-card";

export type TGroup = {
    id: number;
    name: string;
};

export type GroupCardProps = {
    group: TGroup;
    students: TUser[];
};

export function GroupCard({ group, students }: GroupCardProps) {
    const { id, name } = group;
    const { t } = useTranslate();

    return (
        <Collapse expandIcon={Icons.arrow.down} expandIconPosition="end">
            <Collapse.Panel
                key={id}
                header={
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-bold !text-gray-text">
                            {t(`${id}-guruh`)} {name}
                        </Typography>
                        <Typography>
                            ( {t(`${students.length} o'quvchi`)} )
                        </Typography>
                    </Flex>
                }
            >
                <Flex className="flex-col gap-y-3">
                    {students.map(({ id, first_name, last_name }) => (
                        <Link to="#" key={id}>
                            <Typography className="transition-all hover:!text-blue-500">
                                {`${first_name} ${last_name}`}
                            </Typography>
                        </Link>
                    ))}
                </Flex>
            </Collapse.Panel>
        </Collapse>
    );
}
