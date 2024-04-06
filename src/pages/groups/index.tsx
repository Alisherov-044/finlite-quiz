import { z } from "zod";
import { useQuery } from "react-query";
import { useOpen, useTranslate } from "@/hooks";
import { options } from "@/components/data";
import {
    FormDrawer,
    GroupCard,
    GroupCardSkeleton,
    Icons,
    PageHeaderAction,
} from "@/components";
import { debounce } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
    Button,
    Col,
    Empty,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Typography,
    notification,
} from "antd";
import { FormItem } from "@/components/styles";
import type { TGroup } from "@/components/cards/group-card";

export const GroupFormScheme = z.object({
    name: z.string({ required_error: "this field is required" }),
    number: z.string({ required_error: "this field is require" }),
});

export default function GroupsPage() {
    const { t, currentLng } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const { data: groups, isLoading } = useQuery<TGroup[]>("groups", {
        queryFn: async () => await [],
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof GroupFormScheme>>({
        resolver: zodResolver(GroupFormScheme),
    });
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    });

    const debouncedSearch = useMemo(
        () =>
            debounce(
                ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
                    setSearch(value),
                200
            ),
        []
    );

    console.log(filter);

    function onSubmit(values: z.infer<typeof GroupFormScheme>) {
        console.log(values);
        reset();
        close();
        notification.success({
            message: t("group created"),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
    }

    function onCancel() {
        close();
        reset();
    }

    return (
        <main className="flex flex-col">
            <PageHeaderAction
                title={t("add ${something}", t("group"))}
                btnText={t("create group")}
                onAction={open}
            />
            <Flex className="flex-col gap-y-4 mt-10">
                <Flex className="items-center justify-between">
                    <Typography className="!text-sm font-bold !text-blue-900">
                        {t("groups list")}
                    </Typography>
                    <Select
                        placeholder={t("sort")}
                        suffixIcon={<Icons.arrow.select />}
                        prefixCls="sort-select"
                        placement="bottomRight"
                        options={options.map((option) => ({
                            ...options,
                            label:
                                currentLng === "ru"
                                    ? option.label.ru
                                    : option.label.uz,
                        }))}
                        onChange={(value) => setFilter(value)}
                    />
                </Flex>
                <Input
                    prefix={<Icons.search />}
                    placeholder={t("search")}
                    prefixCls="search-input"
                    onChange={debouncedSearch}
                />
            </Flex>
            <Flex className="flex-auto flex-col gap-y-3 mt-10">
                {isLoading ? (
                    [...Array(3).keys()].map((key) => (
                        <GroupCardSkeleton key={key} />
                    ))
                ) : groups && groups.length ? (
                    groups
                        .filter(
                            (group) =>
                                search.length && [group.name].includes(search)
                        )
                        .map((group) => <GroupCard group={group} />)
                ) : (
                    <Flex className="flex-auto items-center justify-center">
                        <Empty description={false} />
                    </Flex>
                )}
            </Flex>

            <FormDrawer
                open={isOpen}
                width={600}
                onClose={onCancel}
                onCancel={onCancel}
                title={t("add ${something}", t("group"))}
                footer={
                    <Button
                        form="group-form"
                        htmlType="submit"
                        loading={isFormLoading}
                        disabled={isFormLoading}
                        className="!w-full"
                    >
                        {t("create")}
                    </Button>
                }
            >
                <Form id="group-form" onFinish={handleSubmit(onSubmit)}>
                    <Row>
                        <Col span={24}>
                            <FormItem label={t("group name")}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label={t("group number")}>
                                <Controller
                                    name="number"
                                    control={control}
                                    render={({ field }) => (
                                        <Input type="number" {...field} />
                                    )}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </FormDrawer>
        </main>
    );
}
